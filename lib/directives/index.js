/* @flow */
import { AuthenticationError, ForbiddenError } from 'apollo-server-express'
import { SchemaDirectiveVisitor } from 'graphql-tools'
import { defaultFieldResolver } from 'graphql'
import { has } from 'lodash'

import { verifyJWT } from '../utils'
import services from '../services'

class IsAuthenticatedDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field: GraphQLField<any, any>) {
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
      const token = await services.Token.get({ id: userIdentity.jti})
      if (!token) {
        throw new ForbiddenError('Not authorized!')
      }
      const user = await services.User.get({ id: token.user_id })
      if (!user) {
        throw new ForbiddenError('Not authorized!')
      }
      context.currentUser = user
      const result = await resolve.apply(this, [root, args, context, info])
      return result
    }
  }
}

class isOwnerDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field: GraphQLField<any, any>) {
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
      const token = await services.Token.get({ id: userIdentity.jti})
      if (!token) {
        throw new ForbiddenError('Not authorized!')
      }
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

export default {
  isAuthenticated: IsAuthenticatedDirective,
  isOwner: isOwnerDirective
}
