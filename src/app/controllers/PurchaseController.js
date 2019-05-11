const Ad = require('../models/Ad')
const User = require('../models/User')
const Mail = require('../services/Mail')

class PurchaseController {
  async create (req, res) {
    const { ad, content } = req.body

    const purchaseAd = await Ad.findById(ad).populate('author')
    const user = await User.findById(req.userId)

    await Mail.sendMail({
      from: '"Samuel Hiroyuki" <samduasvezesmortal@gmail.com>',
      to: `${purchaseAd.author.name} <${purchaseAd.author.email}>`,
      subject: `Solicitação de compra: ${purchaseAd.title}`,
      html: `<p>${content}</p>`
    })

    return res.send()
  }
}

module.exports = new PurchaseController()
