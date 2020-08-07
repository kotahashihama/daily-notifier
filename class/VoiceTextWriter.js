require('dotenv').config()

const fs = require('fs')
const VoiceText = require('voicetext')

module.exports = class VoiceTextWriter {
  convertToVoice(text) {
    const voice = new VoiceText(process.env.VOICETEXT_API_KEY)
    const dirPath = './.temp/'
    const fileName = 'voice_text.wav'

    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath);
    }

    return new Promise((resolve, reject) => {
      voice
        .speaker(voice.SPEAKER.HIKARI)
        .emotion(voice.EMOTION.SADNESS)
        .emotion_level(voice.EMOTION_LEVEL.NORMAL)
        .volume(150)
        .speak(text, (err, buffer) => {
          if (err) {
            console.err(err)
            reject()
          } else {
            fs.writeFileSync(dirPath + fileName, buffer, 'binary')
            resolve()
          }
        })
    })
  }
}
