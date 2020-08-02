require('dotenv').config()

const VoiceTextWriter = require('./VoiceTextWriter')
const { Client, DefaultMediaReceiver } = require('castv2-client')

module.exports = class GoogleNest {
  constructor(ip) {
    this.ip = ip
  }

  say(phrase) {
    // 音楽ファイルの作成
    const voiceTextWriter = new VoiceTextWriter()
    voiceTextWriter.convertToVoice(phrase)

    this._sendVoiceData()
  }

  _sendVoiceData() {
    // 音楽ファイルを Google Nest に送信
    const client = new Client()
    client.connect(this.ip, () => {
      client.launch(DefaultMediaReceiver, (err, player) => {
        const media = {
          contentId:
            `http://${process.env.SERVER_IP}:${process.env.SERVER_PORT}/voice_text.wav`,
          contentType: 'audio/wav',
          streamType: 'BUFFERED',
        }

        player.load(media, { autoplay: true }, (err, status) => {
          console.log(err, status)
          client.close()
        })
      })
    })
  }
}
