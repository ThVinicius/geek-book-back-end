import joi from "joi"

const get = joi.object({
  shortUrl: joi.string().trim().length(9).required()
})

export default { get }
