const API_URL = process.env.API_URL

module.exports = {
  env: {
    apiUrl: API_URL || 'http://localhost:3001'
  }
}
