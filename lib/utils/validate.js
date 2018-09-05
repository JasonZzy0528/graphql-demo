import {
  ForbiddenError
} from 'apollo-server-express'

let token = instance => {
  if (!instance) {
    throw new ForbiddenError('Not authorized!')
  }
  if (instance.get('expires_at') < Date.now()) {
    throw new ForbiddenError('Access token expired!')
  }
  return true
}

export default {
  token
}
