/* @flow */
import { extend, forEach } from 'lodash'
import uuid from 'uuid/v4'

import db from '../models'

type createArgs = {
  userId: string,
  expiresAt: Date
}

let create: Function = async (args: createArgs) => {
  const { expiresAt, userId } = args
  const token = db.token.build({
    id: uuid(),
    user_id: userId,
    expires_at: expiresAt
  })
  await token.save()
  return token
}

type getArgs = {
  order: Array<Object | Array<?string>>,
  where: {
    id: string
  },
  attributes: Array<string>
}

let get: Function = async (args: getArgs) => {
  try {
    let response = await db.token.findOne({
      where: args.where,
      order: args.order,
      attributes: args.attributes
    })
    return response
  } catch (err) {
    throw new Error(err.errors[0].message)
  }
}

let getAll: Function = async (args) => {
  try {
    let response = await db.token.findAll({
      where: args.where,
      order: args.order,
      attributes: args.attributes
    })
    return response
  } catch (err) {
    throw new Error(err.errors[0].message)
  }
}

let extendLastLoginTimestamp: Function = async (args) => {
  let users = []
  let promises = []
  forEach(args, user => {
    promises.push(getAll({
      order: [['created_at', 'DESC']],
      where: {
        user_id: user.id
      },
      attributes: ['created_at']
    }))
  })
  const response = await Promise.all(promises)
  forEach(response, (tokens, index) => {
    const user = extend(args[index].dataValues, { last_login_timestamp:  tokens[0].getDataValue('created_at') })
    users.push(user)
  })
  return users
}

export default {
  create,
  extendLastLoginTimestamp,
  get
}
