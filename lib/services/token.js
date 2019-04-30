import { extend, forEach } from 'lodash'
import uuid from 'uuid/v4'

import db from '../models'
import { makeSelfClearingDataloader } from '../utils'


let create = async (args) => {
  const { expiresAt, userId } = args
  const token = db.token.build({
    id: uuid(),
    user_id: userId,
    expires_at: expiresAt
  })
  await token.save()
  return token
}

let get = async (args) => {
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

let getAll = async (args) => {
  try {
    let response = await db.token.findAll({
      where: args.where,
      order: args.order,
      attributes: args.attributes,
      group: args.group
    })
    return response
  } catch (err) {
    throw new Error(err.errors[0].message)
  }
}

let extendLastLoginTimestamp = async (args) => {
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

let getLatestLoginTimestamp = async (userId) => {
  const options = {
    order: [['created_at', 'DESC']],
    where: {
      'user_id': userId
    },
    attributes: ['created_at']
  }
  const token = await get(options)
  return token ? token.get('created_at') : null
}

let getLastLoginTimestampAll = async userIds => {
  const options = {
    where: {
      'user_id': {
        $in: userIds
      }
    },
    attributes: ['user_id', [db.sequelize.fn('max', db.sequelize.col('created_at')), 'last_login_timestamp']],
    group: ['user_id']
  }
  const tokens = await getAll(options)
  let plainTokens = {}
  let response = []
  forEach(tokens, token => {
    token = token.get({ plain: true })
    plainTokens[token.user_id] = token.last_login_timestamp
  })
  forEach(userIds, id => {
    response.push(plainTokens[id])
  })
  return response
}

let dataloaders = {
  getLastLoginTimestamp: makeSelfClearingDataloader(ids => {
    return getLastLoginTimestampAll(ids)
  })
}

export default {
  create,
  dataloaders,
  extendLastLoginTimestamp,
  get,
  getLatestLoginTimestamp
}
