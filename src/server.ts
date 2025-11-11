import chalk from 'chalk'
import express from 'express'
import { Login } from './index.js'

const app = express()

app.use(express.json())

const login = new Login()

app.get('/getQRCode', async (req, res) => {
  const qrData = await login.getQRCode()
  const { qr } = qrData
  res.send({
    qr,
  })
  await login.waitLP()
})

const PORT = 3000
app.listen(PORT, () => {
  console.log(chalk.green(` 🚀 服务启动成功 http://localhost:${PORT}`))
})
