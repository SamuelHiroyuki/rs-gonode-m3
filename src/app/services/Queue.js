const kue = require('kue')
const Jobs = require('../jobs')
const Sentry = require('@sentry/node')
const redisConfig = require('../../config/redis')

const Queue = kue.createQueue({ redis: redisConfig })

Queue.process(Jobs.PurchaseMail.key, Jobs.PurchaseMail.handle)

Queue.on('error', Sentry.captureException)

module.exports = Queue
