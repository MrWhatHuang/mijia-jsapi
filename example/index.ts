import { Login } from '../src'

const out = document.getElementById('output')!

function render() {
  const login = new Login()
  login.ready.then(() => {
    login.qrLogin()
  })
  const data = login

  out.textContent = JSON.stringify(data, null, 2)
  // use warn to avoid ESLint console rule
  console.warn('mijia-jsapi example data:', data)
}

render()

// expose for console debugging
;(window as any).mijiaExample = { Login }
