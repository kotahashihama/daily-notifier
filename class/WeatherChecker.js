require('dotenv').config()

const GoogleNest = require('./GoogleNest')
const WeatherApi = require('./WeatherApi')

module.exports = class WeatherChecker {
  check() {
    const googleNest = new GoogleNest(process.env.GOOGLE_NEST_IP)
    const weatherApi = new WeatherApi(process.env.YAHOO_APP_ID)

    weatherApi.request(
      process.env.LATITUDE,
      process.env.LONGITUDE,
      (err, weathers) => {
        if (!err) {
          console.log('Successfully responsed from API.')

          const current = weathers[0]
          const next = weathers[1]

          if (current.Rainfall === 0 && next.Rainfall === 0) {
            googleNest.say('雨が降りそうですよ')
          }
        } else {
          console.log(err)
        }
      }
    )
  }
}
