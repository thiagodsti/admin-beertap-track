const fs = require('fs')
const child_process = require('child_process')
const CONFIG = {
  env: process.argv[process.argv.length-1]
}

// Validate environment
switch(CONFIG.env) {
  case "DEV":
    CONFIG.scope = "@uppoints-snapshots/"
    break
  case "PROD":
    CONFIG.scope = "@uppoints/"
    break
  default:
    console.error(`Invalid environemnt: "${CONFIG.env}". Environment must be "PROD" or "DEV"`)
    process.exit(1)
}

console.log(`> validated environment "${CONFIG.env}"`)

const packageJsonFile = __dirname + '/../package.json'
const packageConfig = require(packageJsonFile)

// Validate version
const pkgJsonVersion = packageConfig.version.trim()

console.log(`> version "${pkgJsonVersion}"`)

// Set package scope
packageConfig.name = CONFIG.scope + packageConfig.name
require('fs').writeFileSync(packageJsonFile, JSON.stringify(packageConfig, null, 2))

console.log(`> updated scope "${CONFIG.scope}"`)

// Set target registry 
child_process.exec('npm config set registry http://nexus-npm.uppoints.com/repository/npm-internal/', 
    (err, stdout, stderr) => {
  if (err) {
    console.error(`Something went wrong: ${stderr}`)
  } else {
    console.log('Success!')
  }
})
