const env = process.env.VERCEL_ENV
const git = {
  repo: process.env.VERCEL_GIT_REPO_SLUG + '-api',
  branch: process.env.VERCEL_GIT_COMMIT_REF,
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


module.exports = {
  env: {
    apiUrl
  }
}
