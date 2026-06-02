const USERNAME = 'digivla'
const PASSWORD = 'Digivla2026'
const fs = require('fs')
const path = require('path')

export default function handler(req, res) {
  const authHeader = req.headers['authorization']

  if (authHeader) {
    const base64 = authHeader.split(' ')[1]
    const [user, pass] = Buffer.from(base64, 'base64').toString().split(':')
    if (user === USERNAME && pass === PASSWORD) {
      const html = fs.readFileSync(path.join(process.cwd(), 'index.html'), 'utf8')
      return res.setHeader('Content-Type', 'text/html').send(html)
    }
  }

  res.setHeader('WWW-Authenticate', 'Basic realm="Digivla Dashboard"')
  res.status(401).send('Unauthorized')
}