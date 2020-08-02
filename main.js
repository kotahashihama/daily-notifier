require('dotenv').config()

const GoogleNest = require('./class/GoogleNest')
const googleNest = new GoogleNest(process.env.GOOGLE_NEST_IP)

googleNest.say('こんにちは')
