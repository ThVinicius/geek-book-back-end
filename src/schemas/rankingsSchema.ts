import joi from "joi"

const create = joi.object({
  userCollectionId: joi.number().strict().integer().greater(0).required(),
  position: joi.number().strict().integer().min(1).max(10).required()
})

const remove = joi.object({ id: joi.number().integer().greater(0).required() })

const update = joi.object({
  id: joi.number().strict().integer().greater(0).required(),
  userCollectionId: joi.number().strict().integer().greater(0).required()
})

export default { create, remove, update }
