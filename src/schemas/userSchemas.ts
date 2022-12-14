import joi from 'joi'

const signUp = joi.object({
  email: joi.string().email().required(),
  nickname: joi.string().trim().max(16).required(),
  avatar: joi.string().uri().allow(null).required(),
  password: joi.string().min(3).required(),
  confirmPassword: joi.valid(joi.ref('password')).required()
})

const signIn = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(3).required()
})

const githubOauth = joi.object({ code: joi.string().required() })

const signUpOauth = joi.object({
  nickname: joi.string().trim().max(16).required()
})

export default { signUp, signIn, githubOauth, signUpOauth }
