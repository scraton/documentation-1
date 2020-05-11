const path = require('path')
const renderSamples = require('./render')
const fetchedSamples = require('./fetch')

module.exports = function() {
  return {
    define() {
      return {
        CODE_SAMPLES: renderSamples(fetchedSamples),
      }
    },
    enhanceAppFiles: [path.resolve(__dirname, './client.js')],
  }
}
