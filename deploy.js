const { promisify } = require('util')
const { Octokit } = require('@octokit/rest')
const exec = promisify(require('child_process').exec)

const DEBUG = false
const ORG_ID = 's0u8XySVq3EH7yrs1IRNb3Hj'
const TOKEN = 'VpcyGrjb0uOvrXsxGiyhxWIe'
const isProd = process.env.PROD_RELEASE == 1
const GITHUB_TOKEN = process.env.GITHUB_TOKEN

if (!GITHUB_TOKEN) {
  console.error('Missing environment variable GITHUB_TOKEN')
  process.exit(1)
}

const octokit = new Octokit({
  auth: GITHUB_TOKEN,
  previews: ['ant-man-preview', 'flash-preview'],
})

const projects = {
  api: 'prj_LQmlubkLgUq9jNtGmAiS6Qp0Llyv',
  web: 'prj_1ov6CWEJ2FOEAdMmJAvrk4QQjHWx',
}

const cmd = id => `VERCEL_ORG_ID=${ORG_ID} VERCEL_PROJECT_ID=${id} npx vercel --token ${TOKEN} -c -C ${isProd ? '--prod' : ''}`
const withEnv = n => Object.entries(n).map(([k,v]) => `-b ${k}="${v}" -e ${k}="${v}"`).join(' ')

const log = (...msg) => DEBUG ? console.log(...msg) : null


async function createDeployment(description, options = {}) {
  try {
    const defaults = {
      owner: process.env.GH_OWNER_NAME || '',
      repo: process.env.GH_REPO_NAME || '',
      environment: process.env.DEPLOYMENT_ENV || (isProd ? 'production' : 'preview'),
      ref: process.env.GITHUB_SHA,
      transient_environment: !isProd,
      production_environment: isProd,
      auto_merge: true
    }
    const { data } = await octokit.repos.createDeployment({
      ...defaults,
      description,
      ...options
    })
    // try again?
    if (!data.id && data.message) {
      return createDeployment(description, options)
    }
    console.log(data)
    return data.id
  } catch (err) {
    throw new Error('Cannot create deployment:', err)
  }
}

// state: error, failure, pending, in_progress, queued, success
async function updateDeployment(deployment_id, state = 'in_progress', environment_url) {
  try {
    const options = {
      owner: process.env.GH_OWNER_NAME || '',
      repo: process.env.GH_REPO_NAME || '',
      auto_inactive: false,
      deployment_id,
      state,
      environment_url
    }
    await octokit.repos.createDeploymentStatus(options)
  } catch (err) {
    throw new Error('Cannot update deployment:', err)
  }
}

function serviceDeploy(service, fn) {
  return async (...args) => {
    try {
      log('+ - - - - - - - - - - - - - - - - ')
      log(`+ Creating ${service} deployment`)
      const deploymentId = await createDeployment(`Create ${service} deployment`)

      log('> Updating deployment status: in_progress')
      await updateDeployment(deploymentId)

      log(`> Deploying ${service}`)
      const url = await fn(...args)

      log('> Deployment URL:', url)

      log('> Updating deployment status: success')
      await updateDeployment(deploymentId, 'success', url)

      return url
    } catch (err) {
      await updateDeployment(deploymentId, 'error')
      throw err
    }
  }
}

const deployApi = serviceDeploy('API', async () => {
  const { stdout: res } = await exec(cmd(projects.api))
  return res.toString().trim()
})

const deployWeb = serviceDeploy('WEB', async (API_URL) => {
  const { stdout: res } = await exec(`${cmd(projects.web)} ${withEnv({ API_URL })}`)
  return res.toString().trim()
})


async function main () {
  try {
    const apiUrl = await deployApi()
    const webUrl = await deployWeb(apiUrl)
  } catch (err) {
    console.log('Deployment failed', err)
    process.exit(1)
  }
}

main()
