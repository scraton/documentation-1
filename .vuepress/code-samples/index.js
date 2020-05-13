const path = require('path')
const renderSamples = require('./render')

module.exports = function() {
  const samples = require('./samples.json')
  return {
    define() {
      return {
        CODE_SAMPLES: renderSamples(samples),
      }
    },
    enhanceAppFiles: [path.resolve(__dirname, './client.js')],
  }
}
