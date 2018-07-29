import { AuthenticationError, SchemaDirectiveVisitor } from 'apollo-server-express'
import { defaultFieldResolver } from 'graphql'

import { verifyJWT } from '../utils'

class IsAuthenticatedDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field: GraphQLField<any, any>) {
    const { resolve = defaultFieldResolver } = field
    field.resolve = async (root, args, context, info) => {
      const jwt = context.headers.authorization.replace('Bearer ', '')
      const userIdentity = verifyJWT(jwt)
      if (!userIdentity) {
        throw new AuthenticationError('Not authorized!')
      }
      console.error(userIdentity)
      const result = await resolve.apply(this, [root, args, context, info])
      return result
    }
  }
}

export default {
  isAuthenticated: IsAuthenticatedDirective
}
