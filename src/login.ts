import config from './config'
import { get } from './request'
import { getQuery } from './utils'

const { accountURL, defaultUA, loginURL, msgURL, qrURL } = config
interface IndexData {
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

export default class Login {
  indexData?: IndexData
  ready: Promise<void>

  constructor() {
    this.indexData = undefined
    this.ready = this.getIndex()
  }

  // 获取索引页数据
  private async getIndex() {
    this.indexData = await get<IndexData>(msgURL)
  }

  login() {

  }

  async qrLogin() {
    const location = this.indexData?.location
    const serviceParam = JSON.parse(getQuery(location || '')?.serviceParam || '{}')
    const params = {
      _qrsize: 240,
      qs: this.indexData?.qs,
      bizDeviceType: '',
      callback: this.indexData?.callback,
      _json: 'true',
      theme: '',
      sid: 'xiaomiio',
      needTheme: 'false',
      showActiveX: 'false',
      serviceParam: serviceParam?.[0],
      _local: 'zh_CN',
      _sign: this.indexData?._sign,
      _dc: new Date().getTime(),
    }
    const res = await get(qrURL, params)
    console.log(res)
  }
}
