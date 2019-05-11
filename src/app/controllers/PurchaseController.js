const Ad = require('../models/Ad')
const User = require('../models/User')
const Purchase = require('../models/Purchase')
const Queue = require('../services/Queue')
const { PurchaseMail } = require('../jobs')

class PurchaseController {
  async create (req, res) {
    const { ad, content } = req.body

    const purchaseAd = await Ad.findById(ad).populate('author')
    const user = await User.findById(req.userId)

    const purchase = await Purchase.create({
      content,
      ad,
      user: user._id
    })

    Queue.create(PurchaseMail.key, {
      ad: purchaseAd,
      user,
      content
    }).save()

    return res.send(purchase)
  }

  async update (req, res) {
    const { id } = req.params

    const { ad } = await Purchase.findById(id).populate({
      path: 'ad',
      populate: {
        path: 'author'
      }
    })

    if (!ad.author._id.equals(req.userId)) {
      return res.status(401).json({ error: "You're not the ad author" })
    }

    if (ad.purchasedBy) {
      return res
        .status(400)
        .json({ error: 'This ad had already been purchased' })
    }

    ad.purchasedBy = id

    await ad.save()

    return res.json(ad)
  }
}

module.exports = new PurchaseController()
