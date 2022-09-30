import joi from 'joi'

const category = ['manga', 'anime', 'manhua', 'donghua', 'novel', 'serie']

const create = joi.object({
  userId: joi.number().greater(0).required(),
  category: joi
    .string()
    .valid(...category)
    .required(),
  name: joi.string().trim().required(),
  synopsis: joi.string().required(),
  poster: joi.string().uri().allow('').required(),
  lastSeen: joi.number().greater(-1).required()
})

export default { create }
