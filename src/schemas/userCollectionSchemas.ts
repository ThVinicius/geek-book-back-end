import joi from 'joi'

const category = ['manga', 'anime', 'manhua', 'donghua', 'novel', 'serie']

const create = joi.object({
  category: joi
    .string()
    .valid(...category)
    .required(),
  name: joi.string().trim().required(),
  synopsis: joi.string().allow(null).required(),
  poster: joi.string().uri().allow(null).required(),
  lastSeen: joi.number().greater(-1).required()
})

export default { create }
