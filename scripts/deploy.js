const { promisify } = require('util')
const { Octokit } = require('@octokit/rest')
const exec = promisify(require('child_process').exec)

const DEBUG = true
const PROJECTS = {
  api: 'prj_LQmlubkLgUq9jNtGmAiS6Qp0Llyv',
  web: 'prj_1ov6CWEJ2FOEAdMmJAvrk4QQjHWx',
}
const ORG_ID = 's0u8XySVq3EH7yrs1IRNb3Hj'
const TOKEN = 'VpcyGrjb0uOvrXsxGiyhxWIe'
const {
  PROD_RELEASE,
  GIT_BRANCH,
  GITHUB_TOKEN,
  GITHUB_SHA,
  GITHUB_ORG_NAME,
  GITHUB_REPO,
  COMMIT_AUTHOR,
  GIT_COMMIT_MSG,
  COMMIT_AUTHOR_NAME
} = process.env

const isProd = PROD_RELEASE == 1

if (!GITHUB_TOKEN) {
  console.error('Missing environment variable GITHUB_TOKEN')
  process.exit(1)
}

const octokit = new Octokit({
  auth: GITHUB_TOKEN,
  previews: ['ant-man-preview', 'flash-preview'],
})


/**
 * Vercel command to deploy project by `id`
 */
const cmd = project_id => `VERCEL_ORG_ID=${ORG_ID} VERCEL_PROJECT_ID=${project_id} npx vercel --token ${TOKEN} -c -C ${isProd ? '--prod' : ''}`

/**
 * Generate env/build flags for the `vercel` cmd
 */
const withEnv = n => Object.entries(n || {}).map(([k,v]) => `-b ${k}="${v}" -e ${k}="${v}"`).join(' ')

/**
 * Generate meta flags for the `vercel` cmd
 */
const withMeta = n => Object.entries(n || {}).map(([k,v]) => `-m ${k}="${v}"`).join(' ')

/**
 * Log stuff
 */
const log = (...msg) => DEBUG ? console.log(...msg) : null

/**
 * Creates a Github Deployment for the given environment
 */
async function createDeployment(environment) {
  log(`- Creating Github Deployment for ${environment}`)
  try {
    const options = {
      environment,
      owner: GITHUB_ORG_NAME,
      repo: GITHUB_REPO,
      ref: GITHUB_SHA,
      transient_environment: !isProd,
      production_environment: isProd,
      auto_merge: false
    }
    log('with options', options)
    const { data } = await octokit.repos.createDeployment(options)
    // try again?
    if (!data.id && data.message) {
      return createDeployment(environment)
    }
    log(data)
    return data.id
  } catch (err) {
    log(err)
    throw new Error('Error creating Github Deployment:', err)
  }
}

/**
 * Update a Github Deployment status
 */
async function updateDeployment({
  deployment_id,
  state = 'success',
  url
}) {
  if (!deployment_id) {
    throw new Error('Missing deployment_id in updateDeployment')
  }
  log(`- Updating Github Deployment for ${deployment_id}`)
  try {
    const options = {
      owner: GITHUB_ORG_NAME,
      repo: GITHUB_REPO,
      auto_inactive: false,
      deployment_id,
      state,
      environment_url: url,
      target_url: url
    }
    log('with options', options)
    const { data } = await octokit.repos.createDeploymentStatus(options)
    log(data)
  } catch (err) {
    log(err)
    throw new Error('Cannot update deployment:', err)
  }
}

/**
 * Creates an environment specific deployment fn
 */
function serviceDeploy(environment, fn) {
  return async (...args) => {
    let deployment_id;
    try {
      deployment_id = await createDeployment(
        `${environment} - ${isProd ? 'Production' : 'Preview'}`
      )
      const url = await fn(...args)
      await updateDeployment({
        deployment_id,
        state: 'success',
        url
      })
      return url
    } catch (err) {
      log(err)
      if (deployment_id) {
        await updateDeployment({
          deployment_id,
          state: 'failure'
        })
      }
      throw err
    }
  }
}

const vercelDeploy = ({ project_id, env, meta: metaOptions }) => {
  if (!project_id) {
    throw new Error('Missing `project_id` in vercelDeploy')
  }
  const meta = {
    // magic meta keys to simulate the vercel github integration
    githubCommitSha: GITHUB_SHA,
    githubDeployment: 1,
    githubOrg: GITHUB_ORG_NAME,
    githubCommitOrg: GITHUB_ORG_NAME,
    githubRepo: GITHUB_REPO,
    githubCommitRepo: GITHUB_REPO,
    githubCommitRef: GIT_BRANCH,
    githubCommitAuthorLogin: COMMIT_AUTHOR,
    githubCommitMessage: GIT_COMMIT_MSG,
    githubCommitAuthorName: COMMIT_AUTHOR_NAME,
    ...metaOptions
  }
  const command = `${cmd(project_id)} ${withEnv(env)} ${withMeta(meta)}`
  log('- Running vercel deploy:')
  log(command)
  return await exec(command)
}

const deployApi = serviceDeploy('API', async () => {
  const { stdout: res } = await vercelDeploy({
    project_id: PROJECTS.api
  })
  return res.toString().trim()
})

const deployWeb = serviceDeploy('WEB', async (API_URL) => {
  const { stdout: res } = await vercelDeploy({
    project_id: PROJECTS.web,
    env: {
      API_URL
    }
  })
  return res.toString().trim()
})



async function main () {
  try {
    const apiUrl = await deployApi()
    const webUrl = await deployWeb(apiUrl)
    log('- Successfully deployed', {
      api: apiUrl,
      web: webUrl
    })
  } catch (err) {
    log('Deployment failed', err)
    process.exit(1)
  }
}

main()
