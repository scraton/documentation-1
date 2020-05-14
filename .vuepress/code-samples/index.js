const path = require('path')
const renderSamples = require('./render')
const fetchSamples = require('./fetch')

module.exports = function() {
  const samples = require('./samples.json')
  return {
    name: 'fetch-sample-files',
    extendCli(cli) {
      cli
        .command(
          'fetch-sample-files',
          "fetches the sample files in MeiliSearch SDK's"
        )
        .action(fetchSamples)
    },
    define() {
      return {
        CODE_SAMPLES: renderSamples(samples),
      }
    },
    enhanceAppFiles: [path.resolve(__dirname, './client.js')],
  }
}
