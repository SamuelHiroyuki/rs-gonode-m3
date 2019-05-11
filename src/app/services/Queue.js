const kue = require('kue')
const redisConfig = require('../../config/redis')
const Jobs = require('../jobs')

const Queue = kue.createQueue({ redis: redisConfig })

Queue.process(Jobs.PurchaseMail.key, Jobs.PurchaseMail.handle)

module.exports = Queue
