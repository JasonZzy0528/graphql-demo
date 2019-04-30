import uuid from 'uuid/v4'
import moment from 'moment'
import { extend, forEach, map, union } from 'lodash'
import {
  AuthenticationError
} from 'apollo-server-express'

import db from '../models'
import Token from './token'
import {
  encodePassword,
  generateJWT,
  verifyPassword
} from '../utils'

let get = async args => {
  try {
    let response = await db.user.findOne({
      where: args
    })
    return response
  } catch (err) {
    throw new Error(err.message)
  }
}

let include = async args => {
  const includeOption = map(args, arg => {
    arg.model = db[arg.model]
    return arg
  })
  try {
    let response = await db.user.findOne({
      include: includeOption
    })
    return response
  } catch (err) {
    throw new Error(err.message)
  }
}

let getAll = async args => {
  let users
  users = await db.user.findAll(args)
  return users
}


let create = async args => {
  try {
    args.id = uuid()
    const password = args.password
    const hashedPassword = await encodePassword(password)
    args.password = hashedPassword
    const user = db.user.build(args)
    await user.save()
    return user
  } catch (err) {
    throw new Error(err.message)
  }
}


let login = async args => {
  const { username, password } = args
  const user = await get({ username })
  if (!user) {
    throw new AuthenticationError('Incorrect username or password!')
  }
  const match = verifyPassword(password, user.password)
  if (!match) {
    throw new AuthenticationError('Incorrect username or password!')
  }
  const expiresAt = moment.utc().add({ hours: 1}).format('YYYY-MM-DD HH:mm:ss.SSS Z')
  const token = await Token.create({
    expiresAt,
    userId: user.id
  })

  return {
    access_token: generateJWT(token)
  }
}

let update = async args => {
  let changed = {}
  const { username } = args
  let user = await get({ username })
  const previous = Object.assign({}, user.dataValues)
  if (!user) {
    throw new Error('User not found!')
  }
  delete args.username
  if (args.password && !verifyPassword(args.password, previous.password)) {
    const password = await encodePassword(args.password)
    args.password = password
    changed.password = true
  } else {
    delete args.password
  }
  await user.update(args)
  forEach(union(Object.keys(args), user._changed), field => {
    if(field !== 'password' && previous[field] !== user.getDataValue(field)) {
      changed[field] = true
    }
  })
  user._previousDataValues = previous
  user._changed = extend(changed, { updated_at: true })
  return user
}

export default {
  create,
  get,
  getAll,
  include,
  login,
  update
}
