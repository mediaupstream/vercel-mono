/*
const slug = s => s.toLowerCase()
.replace(/\//g, '-')
.replace(/\\/g, '-')
.replace(/[^\w\s-]/g, '')
.replace(/[\s_-]+/g, '-')
.replace(/^-+|-+$/g, '')

const env = process.env.VERCEL_ENV
const git = {
  repo: process.env.VERCEL_GIT_REPO_SLUG + '-api',
  branch: slug(process.env.VERCEL_GIT_COMMIT_REF),
  owner: process.env.VERCEL_GIT_REPO_OWNER,
}

const apiUrl = (() => {
  switch (env) {
    case 'preview':
      return `https://${git.repo}-git-${git.branch}-${git.owner}.vercel.app/api`
    case 'development':
      return `http://localhost:3001/api`
    case 'production':
      return `https://${git.repo}-${git.owner}.vercel.app/api`
  }
})()

console.log(process.env)
console.log({ env, git, apiUrl })
*/

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
