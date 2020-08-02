require('dotenv').config()

const fs = require('fs')
const VoiceText = require('voicetext')

module.exports = class VoiceTextWriter {
  convertToVoice(text) {
    const voice = new VoiceText(process.env.VOICETEXT_API_KEY)
    const OUT_PATH = './.temp/voice_text.wav'

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
            fs.writeFileSync(OUT_PATH, buffer, 'binary')
            resolve()
          }
        })
    })
  }
}
