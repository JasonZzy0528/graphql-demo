import { GraphQLScalarType } from 'graphql'
import { Kind } from 'graphql/language'

import services from './../services'
import { getRequiredFields } from '../utils'

const { pubsub, USER_UPDATE } = services.subscription

const resolvers = {
  Query: {
    Users: (root: Object, args: Object, context, info) => {
      const fields = getRequiredFields(info)
      return services.User.getAll(args, fields)
    },
    Login: (root: Object, args: Object) => {
      return services.User.login(args)
    }
  },
  Mutation: {
    CreateUser: (root: Object, args: Object) => {
      return services.User.create(args)
    },
    UpdateUser: async (root: Object, args: Object) => {
      const user = await services.User.update(args)
      const payload = {
        mutation: 'UPDATED',
        node: user.dataValues,
        previous: user._previousDataValues,
        updatedField: Object.keys(user._changed)
      }
      pubsub.publish(USER_UPDATE, payload)
      return user
    }
  },
  Subscription: {
    UserUpdated: {
      resolve: (payload: Object) => {
        return payload
      },
      subscribe: () => pubsub.asyncIterator(USER_UPDATE)
    }
  },
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue(value): Date {
      return new Date(value)
    },
    serialize(value) {
      return value.getTime()
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return new Date(ast.value) // ast value is always in string format
      }
      return null
    },
  }),
  Item: {
    __resolveType(obj: Object) {
      return 'User'
    }
  },
  User: {
    last_login_timestamp: (root: Object) => services.Token.dataloaders.getLastLoginTimestamp.load(root.id)
  }
}

export default resolvers
