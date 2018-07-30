import { GraphQLScalarType } from 'graphql'
import { Kind } from 'graphql/language'

import services from './../services'

const resolvers = {
  Query: {
    Users: (root, args) => {
      return services.User.getAll(args)
    },
    Login: (root, args) => {
      return services.User.login(args)
    }
  },
  Mutation: {
    CreateUser: (root, args) => {
      return services.User.create(args)
    },
    UpdateUser: (root, args) => {
      return services.User.update(args)
    }
  },
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue(value) {
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
}

export default resolvers
