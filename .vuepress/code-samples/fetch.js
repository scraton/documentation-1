// TEMPORARY
// Until real fetching is done
const javascript = {
  label: 'javascript',
  get_index_1: `client.getIndex('movie').show()`,
  create_index_1: `client.createIndex({ uid: 'movie'})`,
}

const python = {
  label: 'python',
  get_index_1: `client.get_index('movie').info()`,
  create_index_1: `client.create_index({ uid: 'movie'})`,
}

const bash = {
  label: 'curl',
  get_index_1: `$ curl \\
    -X GET 'http://localhost:7700/indexes'`,
  create_index_1: `$ curl \\
    -X POST 'http://localhost:7700/indexes' \\
    --data '{
      "uid": "movies",
      "primaryKey": "movie_id"
    }'`,
}

module.exports = { bash, javascript, python }
