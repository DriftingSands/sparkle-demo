const fs = require('fs')

export default function handler(req, res) {
  if (req.method !== 'GET') {
    res.status(400).json({message: 'must be GET request'})
  }
  let body;
  if (req.body) {
    body = JSON.parse(req.body)
  }

  const jsonContent = fs.readFileSync(`backup/${body?.variation || 'desktop'}.json`, {encoding:'utf8', flag:'r'})

  res.status(200).json({ jsonContent, })
}