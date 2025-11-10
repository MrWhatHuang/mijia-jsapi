import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    port: 8760,
    proxy: {
      '/pass': {
        target: 'https://account.xiaomi.com', // 目标接口
        changeOrigin: true, // 修改请求源为目标地址
      },
      '/pass2': {
        target: 'https://account.xiaomi.com', // 目标接口
        changeOrigin: true, // 修改请求源为目标地址
      },
      '/longPolling': {
        target: 'https://account.xiaomi.com', // 目标接口
        changeOrigin: true, // 修改请求源为目标地址
      },
      '/app': {
        target: 'https://api.io.mi.com', // 目标接口
        changeOrigin: true, // 修改请求源为目标地址
      },
      '/spec': {
        target: 'https://home.miot-spec.com', // 目标接口
        changeOrigin: true, // 修改请求源为目标地址
      },
    },
  },
})
