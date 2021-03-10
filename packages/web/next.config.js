const env = process.env.VERCEL_ENV
const git = {
  owner: process.env.VERCEL_GIT_REPO_OWNER,
  branch: process.env.VERCEL_GIT_COMMIT_REF,
  repo: process.env.VERCEL_GIT_REPO_SLUG
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
