const request = require('request')

module.exports = class WeatherApi {
  constructor(appId) {
    this._appId = appId
  }

  request(latitude, longitude, callback) {
    const url = this._buildUrl(latitude, longitude, this._appId)
    const options = {
      url: url,
      method: 'GET',
    }

    console.log('URL: ' + url)

    request(options, function (err, res, body) {
      if (!err && res.statusCode == 200) {
        const json = JSON.parse(body)

        callback(err, json.Feature[0].Property.WeatherList.Weather)
      } else {
        callback(err, null)
      }
    })
  }

  _buildUrl(latitude, longitude, appId) {
    return (
      'https://map.yahooapis.jp/weather/V1/place?' +
      'output=json' +
      '&coordinates=' +
      longitude +
      ',' +
      latitude +
      '&appid=' +
      appId
    )
  }
}
