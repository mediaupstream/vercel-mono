const { promisify } = require('util')
const { Octokit } = require('@octokit/rest')
const exec = promisify(require('child_process').exec)

const DEBUG = false
const ORG_ID = 's0u8XySVq3EH7yrs1IRNb3Hj'
const TOKEN = 'VpcyGrjb0uOvrXsxGiyhxWIe'
const isProd = process.env.PROD_RELEASE == 1
const GITHUB_TOKEN = process.env.GITHUB_TOKEN

console.log(process.env)
process.exit(1)

if (!GITHUB_TOKEN) {
  console.error('Missing environment variable GITHUB_TOKEN')
  process.exit(1)
}

const octokit = new Octokit({
  auth: GITHUB_TOKEN,
  previews: ['ant-man-preview', 'flash-preview'],
})

const github = {
  owner: process.env.GITHUB_OWNER || '',
  repo: process.env.GITHUB_REPO || '',
  environment: isProd ? 'production' : 'qa'
}

const projects = {
  api: 'prj_LQmlubkLgUq9jNtGmAiS6Qp0Llyv',
  web: 'prj_1ov6CWEJ2FOEAdMmJAvrk4QQjHWx',
}

const cmd = id => `VERCEL_ORG_ID=${ORG_ID} VERCEL_PROJECT_ID=${id} npx vercel --token ${TOKEN} -c -C ${isProd ? '--prod' : ''}`
const withEnv = n => Object.entries(n).map(([k,v]) => `-b ${k}="${v}" -e ${k}="${v}"`).join(' ')

const log = (...msg) => DEBUG ? console.log(...msg) : null

async function createDeployment() {
  // const out = await octokit.repos.createDeployment({
  //   owner:
  // })
}

async function deployApi() {
  log('[ Deploying API ]')
  const { stdout: res } = await exec(cmd(projects.api))
  const url = res.toString().trim()
  log('preview:', url, '\n')
  return url
}

async function deployWeb(apiUrl) {
  log('[ Deploying WEB ]')
  const env = {
    API_URL: apiUrl
  }
  const { stdout: res } = await exec(`${cmd(projects.web)} ${withEnv(env)}`)
  const url = res.toString().trim()
  log('preview:', url, '\n')
  return url
}

async function deploy() {
  try {
    const apiUrl = await deployApi()
    const webUrl = await deployWeb(apiUrl)
    const msg = [
      ':tada: **Previews Deployed** :tada:',
      '<ul>',
      `<li>**API** - ${apiUrl}</li>`,
      `<li>**WEB** - ${webUrl}</li>`,
      '</ul>'
    ]
    console.log(msg.join(''))
  } catch (err) {
    console.log('[ FAIL ]', err)
    process.exit(1)
  }
}

deploy()
