const withPlugins = require('next-compose-plugins')
const withTM = require('next-transpile-modules')([
  'shared',
])

module.exports = withPlugins([
  // withTM,
])
