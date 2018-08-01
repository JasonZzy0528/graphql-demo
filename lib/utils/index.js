/* @flow */
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const SALT_ROUNDS: number = 10
const secret: string = 'secret'

export const encodePassword: Function = async (password: string): Promise<string> => {
  const hashedPassword: string = await bcrypt.hash(password, SALT_ROUNDS)
  return hashedPassword
}

export const verifyPassword: Function = (password: string, hashedPassword: string): boolean => {
  return bcrypt.compareSync(password, hashedPassword)
}

type generateJWTType = {
  get: Function
}

export const generateJWT: Function = (token: generateJWTType): string => {
  type tokenInfoType = {
    created_at: number,
    expires_at: number,
    id: string,
    updated_at: number,
    user_id: string
  }
  const tokenInfo: tokenInfoType = token.get({ plain: true })
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

export const verifyJWT: Function = (token: string) => {
  return jwt.verify(token, secret)
}

export const asyncForEach = async (array, callback) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}

const bota = (input: string): string => {
  return new Buffer(input.toString(), 'binary').toString('base64')
}

const atob = (input: string): string => {
  return new Buffer(input, 'base64').toString('binary')
}

export const convertNodeToCursor = (node: { id: number }): string => {
  return bota(node.id.toString())
}


export const convertCursorToNodeId = (cursor: string): number => {
  return parseInt(atob(cursor))
}
