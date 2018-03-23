#!/usr/bin/env node

const { exec } = require('child_process')
const fs = require('fs')

const FILE_NAME = 'package.json'

exec('git fetch --all', (err, stdout) => {
  if (err) {
    console.log(`Couldn't execute command git fetch --all: ${JSON.stringify(err)}`)
    process.exit(1)
  }
  exec('git tag --sort=-taggerdate', (err, stdout) => {
    if (err) {
      console.log(`Couldn't execute command git tag: ${JSON.stringify(err)}`)
      process.exit(1)
    }
  
      if (stdout.length == 0) {
        return
      }
      const tags = stdout.trim().split("\n");
  
     fs.readFile(FILE_NAME, 'utf8', (fsErr, data) => {
      if (fsErr) {
        console.log(`Couldn't find ${FILE_NAME}`)
        process.exit(1)
      }
  
      const result = JSON.parse(data)
      const baseVersion = result.version
  
      if (tags.length==0) {
        return
      }
      const lastTag = tags[0];
      if (lastTag == baseVersion) {
        console.log(`Tag ${baseVersion} already exists`)
        process.exit(1)
      }
    })
  })
})
