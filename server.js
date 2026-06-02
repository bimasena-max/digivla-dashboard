const http = require('http')
const fs = require('fs')
const path = require('path')

const USERNAME = 'digivla'
const PASSWORD = 'Digivla2026'

const server = http.createServer((req, res) => {
  const authHeader = req.headers['authorization']

  if (authHeader) {
    const base64 = authHeader.split(' ')[1]
    const decoded = Buffer.from(base64, 'base64').toString()
    const [user, pass] = decoded.split(':')

    if (user === USERNAME && pass === PASSWORD) {
      const html = fs.readFileSync(path.join(__dirname, 'dashboard.html'), 'utf8')
      res.writeHead(200, { 'Content-Type': 'text/html' })
      return res.end(html)
    }
  }

  res.writeHead(401, { 'WWW-Authenticate': 'Basic realm="Digivla Dashboard"' })
  res.end('Unauthorized')
})

const PORT = process.env.PORT || 3000
server.listen(PORT, () => console.log(`Running on port ${PORT}`))