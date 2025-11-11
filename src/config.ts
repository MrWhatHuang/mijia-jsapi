export const baseAccountURL = 'https://account.xiaomi.com'
export const baseApiURL = 'https://api.io.mi.com'
export const baseDeviceURL = 'https://home.miot-spec.com'

const sid = 'xiaomiio'
const msgURL = `${baseAccountURL}/pass/serviceLogin?sid=${sid}&_json=true`
const loginURL = `${baseAccountURL}/pass/serviceLoginAuth2`
const qrURL = `${baseAccountURL}/longPolling/loginUrl`
const apiURL = `${baseApiURL}/app`
const deviceURL = `${baseDeviceURL}/spec/`
const accountURL = `${baseAccountURL}/pass2/profile/home`
const defaultUA = 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Mobile Safari/537.36 Edg/126.0.0.0'

const config = {
  sid,
  msgURL,
  loginURL,
  qrURL,
  apiURL,
  deviceURL,
  accountURL,
  defaultUA,
}

export default config
