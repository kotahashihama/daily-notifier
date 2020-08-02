require('dotenv').config()

const fs = require('fs')

const express = require('express')
const app = express()
const port = process.env.SERVER_PORT

startSever()

function startSever() {
  const fileName = 'voice_text.wav'
  const server = app.listen(port, console.log('port: ' + port))

  // ルーティング
  app.get(`/${fileName}`, (req, res) => {
    fs.readFile(`./.temp/${fileName}`, (err, data) => {
      if (err) res.status(400).send(err.toString())
      else {
        res.setHeader('Content-Length', data.length)
        res.write(data)
        res.end()
      }
    })
  })

  return server
}
