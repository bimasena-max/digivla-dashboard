const fs = require('fs')
const path = require('path')

const USERNAME = 'digivla'
const PASSWORD = 'Digivla2026'

module.exports = function handler(req, res) {
  const authHeader = req.headers['authorization']

  if (authHeader) {
    const base64 = authHeader.split(' ')[1]
    const decoded = Buffer.from(base64, 'base64').toString()
    const [user, pass] = decoded.split(':')

    if (user === USERNAME && pass === PASSWORD) {
      const html = fs.readFileSync(path.join(process.cwd(), 'dashboard.html'), 'utf8')
      res.setHeader('Content-Type', 'text/html')
      return res.send(html)
    }
  }

  res.setHeader('WWW-Authenticate', 'Basic realm="Digivla Dashboard"')
  res.status(401).send('Unauthorized')
}