import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { forEach } from 'lodash'
import DataLoader from 'dataloader'

import modelValidate from './validate'
const SALT_ROUNDS = 10
const secret = 'secret'

export const validate = modelValidate
export const encodePassword = async password => {
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)
  return hashedPassword
}

export const verifyPassword = (password, hashedPassword) => {
  return bcrypt.compareSync(password, hashedPassword)
}

export const generateJWT = token => {
  const tokenInfo = token.get({ plain: true })
  const json = {
    user_id: tokenInfo.user_id,
    iat: tokenInfo.created_at,
    exp: tokenInfo.expires_at
  }
  const options = {
    jwtid: tokenInfo.id
  }
  return jwt.sign(
    json,
    secret,
    options
  )
}

export const verifyJWT = token => {
  return jwt.verify(token, secret)
}

const bota = input => {
  return new Buffer(input.toString(), 'binary').toString('base64')
}

const atob = input => {
  return new Buffer(input, 'base64').toString('binary')
}

export const convertNodeToCursor = node => {
  return bota(node.id.toString())
}


export const convertCursorToNodeId = cursor => {
  return parseInt(atob(cursor))
}

export const isNaturalNumber = data  => {
  const type = 'number'
  if (typeof data === type && data === parseInt(data, 10) && data >= 0) {
    return {
      value: true
    }
  }
  return {
    value: false,
    message: (key, field) => `\`${key}\` on the \`${field}\` cannot be less than zero.`
  }
}

export const getRequiredFields = resolverInfo => {
  const { selections } = resolverInfo.fieldNodes[0].selectionSet
  const { fragments } = resolverInfo
  let fields = []
  forEach(selections, selection => {
    const { kind, name } = selection
    if (kind === 'FragmentSpread') {
      if (fragments[name.value]) {
        const fragmentsFields = fragments[name.value].selectionSet.selections
        forEach(fragmentsFields, field => {
          if (field.kind === 'Field') {
            fields.push(field.name.value)
          }
        })
      }
    } else if (kind === 'Field'){
      fields.push(name.value)
    }
  })
  return fields
}

export const makeSelfClearingDataloader = resolveBatchFunction => {
  const dataloader = new DataLoader(ids => {
    dataloader.clearAll()
    return resolveBatchFunction(ids)
  })
  return dataloader
}
