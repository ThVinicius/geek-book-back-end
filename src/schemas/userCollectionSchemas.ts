import joi from 'joi'

const create = joi.object({
  categoryId: joi.number().strict().integer().greater(0).required(),
  name: joi.string().trim().required(),
  synopsis: joi.string().allow(null).required(),
  poster: joi.string().uri().allow(null).required(),
  lastSeen: joi.number().strict().greater(-1).required(),
  statusId: joi.number().integer().strict().greater(0).required(),
  publicValue: joi.boolean().strict().required()
})

const updateLastSeen = joi
  .object({
    collectionId: joi.number().strict().greater(0).required(),
    lastSeen: joi.number().strict().greater(-1),
    increment: joi
      .number()
      .strict()
      .valid(...[-1, 1])
  })
  .xor('lastSeen', 'increment')

const updateStatus = joi.object({
  id: joi.number().integer().strict().greater(0).required(),
  statusId: joi.number().strict().greater(0).required()
})

const remove = joi.object({
  id: joi.number().greater(0).required()
})

export default { create, updateLastSeen, updateStatus, remove }
