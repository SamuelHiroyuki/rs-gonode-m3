const Ad = require('../models/Ad')

class AdController {
  async get (req, res) {
    const { page, perPage, minPrice, maxPrice, title } = req.query

    const filters = {
      purchasedBy: null
    }

    if (minPrice || maxPrice) {
      filters.price = {}

      if (minPrice) {
        filters.price.$gte = minPrice
      }

      if (maxPrice) {
        filters.price.$lte = maxPrice
      }
    }

    if (title) {
      filters.title = new RegExp(title, 'i')
    }

    const ads = await Ad.paginate(filters, {
      page: page || 1,
      limit: parseInt(perPage) || 10,
      // -createdAt (o menos indica que é DESC)
      sort: '-createdAt',
      populate: ['author']
    })

    return res.json(ads)
  }

  async getById (req, res) {
    const { id } = req.params
    const ad = await Ad.findById(id)

    return res.json(ad)
  }

  async create (req, res) {
    console.log(req.userId)
    const ad = await Ad.create({ ...req.body, author: req.userId })

    return res.json(ad)
  }

  async update (req, res) {
    const { id } = req.params
    const ad = await Ad.findByIdAndUpdate(id, req.body, { new: true })

    return res.json(ad)
  }

  async delete (req, res) {
    const { id } = req.params
    await Ad.findByIdAndRemove(id)

    return res.json()
  }
}

module.exports = new AdController()
