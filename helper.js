require('trycatch').configure({'long-stack-traces': true})
require('songbird')

process.on('uncaughtException', logError)

process.on('uncaughtApplicationException', logError)

process.on('unhandledRejection', logError)

function logError(err) {
  console.log(err.stack)
}
