#!/usr/bin/env babel-node
require('./helper')
const fs = require('fs').promise
const path = require('path')
const { dir } = require('yargs')
              .default('dir', __dirname)
              .argv

async function ls(nextPath, indent = '') {
  const filenames = await fs.readdir(nextPath)
  const arr = []
  const appliedIndent = indent + ' '
  for (const filename of filenames) {
    const pathchild = path.join(nextPath, filename)
    const stat = await fs.stat(pathchild)
    if (stat.isFile()) {
      arr.push(appliedIndent + filename)
    } else {
      arr.push(appliedIndent + filename)
      arr.push(ls(pathchild, appliedIndent + ' '))
      // const dirs = await ls(pathchild, indent + 1)
      // arr.push(...dirs)
    }
  }
  return await Promise.all(arr)
  // Your implementation here
}
function flatten(arr) {
  // return arr
  const result = []
  for (const i of arr) {
    if (Object.prototype.toString.call(i) === '[object Array]') {
      // result.push.apply(result, flatten(i))
      result.push(...flatten(i))
    } else {
      result.push(i)
    }
  }
  return result
}

async function main() {
  (flatten(await ls(dir))).forEach((item) => {
    console.log(item)
  })
}

main()