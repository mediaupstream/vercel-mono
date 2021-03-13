const { promisify } = require('util')
const exec = promisify(require('child_process').exec)

const DEBUG = false
const ORG_ID = 's0u8XySVq3EH7yrs1IRNb3Hj'
const TOKEN = 'VpcyGrjb0uOvrXsxGiyhxWIe'

const projects = {
  api: 'prj_LQmlubkLgUq9jNtGmAiS6Qp0Llyv',
  web: 'prj_1ov6CWEJ2FOEAdMmJAvrk4QQjHWx',
}

const cmd = id => `VERCEL_ORG_ID=${ORG_ID} VERCEL_PROJECT_ID=${id} npx vercel --token ${TOKEN} -c -C`
const withEnv = n => Object.entries(n).map(([k,v]) => `-b ${k}="${v}" -e ${k}="${v}"`).join(' ')

const log = (...msg) => DEBUG ? console.log(...msg) : null

// -- DEPLOY STUFF

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
