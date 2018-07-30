/* @flow */
import db from '../models'

type getArgs = {
  id: string
}

let get: Function = async (args: getArgs) => {
  try {
    let response = await db.token.findOne({
      where: args
    })
    return response
  } catch (err) {
    throw new Error(err.errors[0].message)
  }
}

export default {
  get
}
