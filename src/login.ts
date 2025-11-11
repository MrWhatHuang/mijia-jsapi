import chalk from 'chalk'
import config from './config.js'
import { get } from './request.js'
import { getQuery, parsedCookies } from './utils.js'

const { accountURL, defaultUA, loginURL, msgURL, qrURL } = config
interface IndexRes {
  serviceParam: string
  qs: string
  code: number
  description: string
  securityStatus: number
  _sign: string
  sid: string
  result: string
  miDemo: number
  captchaUrl: string | null
  callback: string
  location: string
  pwd: number
  child: number
  desc: string
}

interface QRRes {
  loginUrl: string
  qr: string
  qrTips: string
  lp: string
  sl: string
  timeout: number
  timeInterval: number
  code: number
  result: string
  desc: string
  description: string
}

interface AuthRes {
  psecurity: string
  nonce: number
  ssecurity: string
  passToken: string
  userId: number
  cUserId: string
  securityStatus: number
  notificationUrl: string
  pwd: number
  child: number
  miDemo: number
  code: number
  result: string
  desc: string
  description: string
  location: string
}

/**
 * 'userId': ret_data['userId'],
            'ssecurity': ret_data['ssecurity'],
            'deviceId': data['deviceId'],
            'serviceToken': cookies['serviceToken'],
            'cUserId': cookies['cUserId'],
            'expireTime': self._extract_latest_gmt_datetime(cookies).strftime('%Y-%m-%d %H:%M:%S'),
            'account_info': self._get_account_info(ret_data['userId'])
 */
interface AuthData {
  userId: number
  ssecurity: string
  deviceId: string
  serviceToken: string
  cUserId: string
  expireTime: string
  account_info: any
}

export default class Login {
  indexRes?: IndexRes
  qrRes?: QRRes
  authRes?: AuthRes
  authData?: AuthData
  ready: Promise<void>

  constructor() {
    this.indexRes = undefined
    this.qrRes = undefined
    this.authRes = undefined
    this.authData = undefined
    this.ready = this.getIndex()
  }

  // 获取索引页数据
  private async getIndex() {
    this.indexRes = await get<IndexRes>(msgURL)
    console.log(chalk.green('✅ 1.获取索引页数据成功'))
  }

  login() {

  }

  async getQRCode() {
    const location = this.indexRes?.location
    const serviceParam = JSON.parse(getQuery(location || '')?.serviceParam || '{}')
    const params = {
      _qrsize: 240,
      qs: this.indexRes?.qs,
      bizDeviceType: '',
      callback: this.indexRes?.callback,
      _json: 'true',
      theme: '',
      sid: 'xiaomiio',
      needTheme: 'false',
      showActiveX: 'false',
      serviceParam: serviceParam?.[0],
      _local: 'zh_CN',
      _sign: this.indexRes?._sign,
      _dc: new Date().getTime(),
    }
    const res = await get<QRRes>(qrURL, params)
    console.log(chalk.green(' ⌛️ 2.返回二维码，等待扫码', JSON.stringify(res)))
    this.qrRes = res
    return res
  }

  // 等待扫码成功
  async waitLP() {
    let result
    if (this.qrRes) {
      const { lp } = this.qrRes
      result = await get<AuthRes>(lp)
      console.log(chalk.green(' ✅ 3.扫码成功', JSON.stringify(result)))
      const qrCookie = parsedCookies(result.headers.get('set-cookie') || '')
      this.authRes = result
      const { location } = this.authRes
      const locRes = await fetch(location)
      console.log(chalk.green(' ✅ 4.获取location成功', JSON.stringify(locRes)))
      const locCookie = parsedCookies(locRes.headers.get('set-cookie') || '')
      this.authData = {
        userId: this.authRes.userId,
        ssecurity: this.authRes.ssecurity,
        deviceId: qrCookie?.deviceId?.value,
        serviceToken: locCookie?.serviceToken?.value,
        cUserId: this.authRes.cUserId,
        expireTime: '',
        account_info: await this.getAccountInfo(this.authRes.userId),
      }
      console.log(chalk.green(' ✅ 6.创建权限信息成功', JSON.stringify(this.authData)))
    }
    return result
  }

  async getAccountInfo(userId: number) {
    const res = await get<any>(accountURL, { userId })
    console.log(chalk.green(' ✅ 5.获取账户信息成功', JSON.stringify(res)))
    return res
  }
}
