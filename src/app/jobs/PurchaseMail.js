const Mail = require('../services/Mail')

class PurchaseMail {
  get key () {
    return 'PurchaseMail'
  }

  async handle (job, done) {
    const { ad, user, content } = job.data

    await Mail.sendMail({
      from: '"Samuel Hiroyuki" <samduasvezesmortal@gmail.com>',
      to: `${ad.author.name} <${ad.author.email}>`,
      subject: `Solicitação de compra: ${ad.title}`,
      template: 'purchase',
      context: { user, ad, content }
    })

    return done()
  }
}

module.exports = new PurchaseMail()
