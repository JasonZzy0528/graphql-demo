/* @flow */
import uuid from 'uuid/v4'
import moment from 'moment'
import { map, extend } from 'lodash'
import {
  AuthenticationError
} from 'apollo-server-express'

import db from '../models'
import Token from './token'
import {
  encodePassword,
  generateJWT,
  // makeSelfClearingDataloader,
  verifyPassword
} from '../utils'

type getArgs = {
  id: string,
  username: string,
  email: string
}

let get: Function = async (args: getArgs) => {
  try {
    let response = await db.user.findOne({
      where: args
    })
    return response
  } catch (err) {
    throw new Error(err.errors[0].message)
  }
}

type includeArgs = Array<{ model: string, where: Object }>

let include: Function = async (args: includeArgs) => {
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
    throw new Error(err.errors[0].message)
  }
}

type getAllArgsType = {
  limit: ?number,
  offset: ?number
}

let getAll: Function = async (args: getAllArgsType, fields: Array<string>)=> {
  let users
  if (fields.includes('last_login_timestamp')) {
    // 'offset' without 'limit' does not work
    args = extend(args, {
      include: [
        {
          model: db.token,
          as: 'tokens',
          order: [['created_at', 'DESC']],
          attributes: ['id', 'created_at']
        }
      ]
    })
    users = await db.user.findAll(args)
    users = map(users, user => {
      const { dataValues } = user
      const hasToken = !!dataValues.tokens
      dataValues.last_login_timestamp = hasToken ? dataValues.tokens[0].getDataValue('created_at') : null
      delete dataValues.tokens
      return dataValues
    })
    // users = await Token.extendLastLoginTimestamp(users)
  } else {
    users = await db.user.findAll(args)
  }
  // users = await db.user.findAll(args)
  return users
}

type createArgs = {
  id: string,
  username: string,
  password: string,
  email: string
}

let create: Function = async (args: createArgs) => {
  try {
    args.id = uuid()
    const password = args.password
    const hashedPassword = await encodePassword(password)
    args.password = hashedPassword
    const user = db.user.build(args)
    await user.save()
    return user
  } catch (err) {
    throw new Error(err.errors[0].message)
  }
}

type loginArgs = {
  username: string,
  password: string
}

let login: Function = async (args: loginArgs) => {
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

type updateArgs = {
  username: String,
  email: String,
  password: String
}

let update: Function = async (args: updateArgs) => {
  const { username } = args
  const user = await get({ username })
  if (!user) {
    throw new Error('User not found!')
  }
  delete args.username
  if (args.password) {
    const password = await encodePassword(args.password)
    args.password = password
  }
  return await user.update(args)
}

export default {
  create,
  get,
  getAll,
  include,
  login,
  update
}
