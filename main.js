require('dotenv').config()

const cron = require('node-cron')
const WeatherChecker = require('./class/WeatherChecker')

cron.schedule('00 00,10,20,30,40,50 08-22 * * *', () => {
  const weatherChecker = new WeatherChecker()

  weatherChecker.check()
})
