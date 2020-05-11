const vuepressmd = require('@vuepress/markdown')()

function codeBlockWrapper(sample, language) {
  return `\`\`\` ${language}
   ${sample}
   \`\`\`
  `
}

function renderCodeSample(sample, language) {
  const wrappedSample = codeBlockWrapper(sample, language)
  const htmlRender = vuepressmd.render(wrappedSample)
  return htmlRender.html
}

module.exports = function(fetchedSamples) {
  /**  This reduce creates an object containing all samples-id with a list of the samples in the different languages
    ex: codeSamples = {
      create_index_1 : [
        { languages: "bash", code: "`$ curl -X GET 'http://localhost:7700/indexes", label: "curl" },
        { languages: "javascript", code: "client.createIndex('movie')", label: "javascript" }
      ]
    }
  **/
  return Object.keys(fetchedSamples).reduce((acc, language) => {
    for (const sampleId in fetchedSamples[language]) {
      const previousSamples = acc[sampleId] ? acc[sampleId] : []
      acc[sampleId] = [
        ...previousSamples,
        {
          language, // markdown code block language highlight ex: ```javascript ````
          label: fetchedSamples[language].label, // name of the tab ex: curl
          code: renderCodeSample(fetchedSamples[language][sampleId], language), // code rendered in HTML
        },
      ]
    }
    return acc
  }, {})
}
