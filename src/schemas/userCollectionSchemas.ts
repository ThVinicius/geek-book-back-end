import joi from 'joi'

const create = joi.object({
  categoryId: joi.number().strict().greater(0).required(),
  name: joi.string().trim().required(),
  synopsis: joi.string().allow(null).required(),
  poster: joi.string().uri().allow(null).required(),
  lastSeen: joi.number().strict().greater(-1).required()
})

const update = joi.object({
  collectionId: joi.number().strict().greater(0).required(),
  lastSeen: joi.number().strict().greater(-1).required()
})

const remove = joi.object({
  collectionId: joi.number().greater(0).required()
})

export default { create, update, remove }
