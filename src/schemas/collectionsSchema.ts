import joi from 'joi'

const get = joi.object({
  categoryId: joi.number().greater(0).required()
})

export default { get }
