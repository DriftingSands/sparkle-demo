const fs = require('fs')

export default function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(400).json({message: 'must be POST request'})
  }
  const body = JSON.parse(req.body)

  fs.writeFileSync(`backup/${body.type}.json`, JSON.stringify(body.data, null, 2))

  res.status(200).json({ message: 'done'})
}