import joi from 'joi'

const signUp = joi.object({
  email: joi.string().email().required(),
  nickname: joi.string().trim().max(16).required(),
  avatar: joi.string().uri().required(),
  password: joi.string().min(3).required(),
  confirmPassword: joi.valid(joi.ref('password')).required()
})

const signIn = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(3).required()
})

export default { signUp, signIn }
