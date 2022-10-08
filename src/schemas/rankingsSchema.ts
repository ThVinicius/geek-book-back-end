import joi from "joi"

const create = joi.object({
  userCollectionId: joi.number().strict().integer().greater(0).required(),
  position: joi.number().strict().integer().min(1).max(10).required()
})

export default { create }
