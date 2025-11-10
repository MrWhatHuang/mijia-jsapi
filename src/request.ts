import { createAlova } from 'alova'
import adapterFetch from 'alova/fetch'

const alovaInstance = createAlova({
  requestAdapter: adapterFetch(),
  responded: {
    // 响应拦截器
    onSuccess: async (response) => {
      const text = await response.text()
      // 去掉前缀 &&&START&&&
      const clean = text.replace(/^&&&START&&&/, '')
      try {
        return JSON.parse(clean)
      }
      catch (err) {
        console.error('解析失败:', clean)
        throw err
      }
    },
  },
})

export function get<T>(url: string, params?: Record<string, any>, headers?: Record<string, any>) {
  return alovaInstance.Request<T>({
    url,
    method: 'GET',
    params,
    headers,
  })
}

export default alovaInstance
