const { promisify } = require('util')
const exec = promisify(require('child_process').exec)

const ORG_ID = 's0u8XySVq3EH7yrs1IRNb3Hj'
const TOKEN = 'VpcyGrjb0uOvrXsxGiyhxWIe'

const projects = {
  api: 'prj_LQmlubkLgUq9jNtGmAiS6Qp0Llyv',
  web: 'prj_1ov6CWEJ2FOEAdMmJAvrk4QQjHWx',
}

const cmd = id => `VERCEL_TOKEN=${TOKEN} VERCEL_ORG_ID=${ORG_ID} VERCEL_PROJECT_ID=${id} npx vercel -c -C`
const withEnv = n => Object.entries(n).map(([k,v]) => `-b ${k}="${v}" -e ${k}="${v}"`).join(' ')

// -- DEPLOY STUFF

async function deployApi() {
  console.log('[ Deploying API ]')
  const { stdout: res } = await exec(cmd(projects.api))
  const url = res.toString().trim()
  console.log('preview:', url, '\n')
  return url
}

async function deployWeb(apiUrl) {
  console.log('[ Deploying WEB ]')
  const env = {
    API_URL: apiUrl
  }
  const { stdout: res } = await exec(`${cmd(projects.web)} ${withEnv(env)}`)
  const url = res.toString().trim()
  console.log('preview:', url, '\n')
  return url
}

async function deploy() {
  try {
    const apiUrl = await deployApi()
    await deployWeb(apiUrl)
  } catch (err) {
    console.log('[ FAIL ]', err)
  }
}

deploy()
