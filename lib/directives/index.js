import {
  AuthenticationError,
  ForbiddenError,
  UserInputError
} from 'apollo-server-express'
import { SchemaDirectiveVisitor } from 'graphql-tools'
import { defaultFieldResolver } from 'graphql'
import {
  forEach,
  has
} from 'lodash'

import { isNaturalNumber, verifyJWT, validate } from '../utils'
import services from '../services'

class IsAuthenticatedDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field
    field.resolve = async (root, args, context, info) => {
      const { authorization } = context.headers
      if (!authorization) {
        throw new AuthenticationError('You must supply a JWT for authorization!')
      }
      const jwt = authorization.replace('Bearer ', '')
      const userIdentity = verifyJWT(jwt)
      if (!userIdentity || !has(userIdentity, 'jti')) {
        throw new ForbiddenError('Not authorized!')
      }
      const token = await services.Token.get({ where: { id: userIdentity.jti } })
      validate.token(token)
      const user = await token.getUser()
      if (!user) {
        throw new ForbiddenError('Not authorized!')
      }
      context.currentUser = user.dataValues
      const result = await resolve.apply(this, [root, args, context, info])
      return result
    }
  }
}

class isOwnerDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field
    field.resolve = async (root, args, context, info) => {
      const { authorization } = context.headers
      if (!authorization) {
        throw new AuthenticationError('You must supply a JWT for authorization!')
      }
      const jwt = authorization.replace('Bearer ', '')
      const userIdentity = verifyJWT(jwt)
      if (!userIdentity || !has(userIdentity, 'jti')) {
        throw new ForbiddenError('Not authorized!')
      }
      const token = await services.Token.get({ where: { id: userIdentity.jti } })
      validate.token(token)
      const user = await services.User.get({ id: token.user_id })
      if (!user) {
        throw new ForbiddenError('Not authorized!')
      }
      const { username, user_id } = args
      if (username != user.username && user_id != user.id) {
        throw new ForbiddenError('Not authorized!')
      }
      context.currentUser = user
      const result = await resolve.apply(this, [root, args, context, info])
      return result
    }
  }
}

class isUsersInputValid extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field
    field.resolve = async (root, args, context, info) => {
      const expectedArgs = {
        limit: isNaturalNumber,
        offset: isNaturalNumber
      }
      forEach(Object.keys(args), key => {
        const isValid = expectedArgs[key](args[key])
        if (!isValid.value) {
          throw new UserInputError(isValid.message(key, info.fieldName))
        }
      })
      const result = await resolve.apply(this, [root, args, context, info])
      return result
    }
  }
}

class isAdminDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field
    field.resolve = async (root, args, context, info) => {
      if (context.currentUser) {
        if (context.currentUser.username !== 'admin'){
          throw new ForbiddenError('Not authorized!')
        }
      } else {
        const { authorization } = context.headers
        if (!authorization) {
          throw new AuthenticationError('You must supply a JWT for authorization!')
        }
        const jwt = authorization.replace('Bearer ', '')
        const userIdentity = verifyJWT(jwt)
        if (!userIdentity || !has(userIdentity, 'jti')) {
          throw new ForbiddenError('Not authorized!')
        }
        const token = await services.Token.get({ where: { id: userIdentity.jti } })
        validate.token(token)
        const user = await services.User.get({ id: token.user_id })
        if (!user) {
          throw new ForbiddenError('Not authorized!')
        }
        context.currentUser = user
      }
      const result = await resolve.apply(this, [root, args, context, info])
      return result
    }
  }
}

export default {
  isAdmin: isAdminDirective,
  isAuthenticated: IsAuthenticatedDirective,
  isOwner: isOwnerDirective,
  isUsersInputValid
}
