const sdks = require('./sdks.json')
const yaml = require('js-yaml')
const bent = require('bent')
const fs = require('fs')
const chalk = require('chalk')

const log = (msg, color = 'FFB4E1', label = 'CODE-SAMPLE-FETCHER') =>
  console.log(`\n${chalk.reset.inverse.bold.hex(color)(` ${label} `)} ${msg}`)

/*
 * Convert YAML string to Js object
 * Throw a precise error on parsing fail.
 */
function sampleYamlToJs(body, sdk) {
  try {
    return yaml.safeLoad(body)
  } catch (e) {
    throw new Error(`The sample file of ${sdk.label} SDK cannot be converted to JSON
    SDK: ${sdk.label},
    url: ${sdk.url}

    ${e.stack}`)
  }
}

/**
 * Fetches all yaml file based on a list of url's
 */
async function fetchSamples() {
  const fetchPromises = sdks.map(async (sdk) => {
    const body = await bent(sdk.url, 'GET', 'string')()
    return {
      samples: sampleYamlToJs(body, sdk),
      language: sdk.language,
      label: sdk.label,
    }
  })
  return await Promise.all(fetchPromises)
}

/*
 * Writes file in JSON format
 */
function samplesToFiles(samples) {
  fs.writeFileSync(
    `${__dirname}/samples.json`,
    JSON.stringify(samples, null, 2)
  )
}

module.exports = () => {
  return {
    name: 'fetch-sample-files',
    extendCli(cli) {
      cli
        .command(
          'fetch-sample-files',
          "fetches the sample files in MeiliSearch SDK's"
        )
        .action(async () => {
          // since we can set our CLI function to be async, fetching is possible synchronously
          log('Fetching sample files...')
          const samples = await fetchSamples()
          log('Sample files fetched.')
          await samplesToFiles(samples)
          log('Json sample file created.')
        })
    },
  }
}
