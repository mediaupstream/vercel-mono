const env = process.env.VERCEL_ENV
const API_URL = process.env.API_URL
const apiUrl = (() => {
  switch (env) {
    case 'preview':
      return API_URL || `https://vercel-mono-api.vercel.app`
    case 'development':
      return `http://localhost:3001`
    case 'production':
      return `https://vercel-mono-api.vercel.app`
  }
})()

module.exports = {
  env: {
    apiUrl
  }
}
