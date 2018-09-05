import { GraphQLScalarType } from 'graphql'
import { Kind } from 'graphql/language'

import services from './../services'
import { getRequiredFields } from '../utils'

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
    UpdateUser: (root: Object, args: Object) => {
      return services.User.update(args)
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
      if(obj.name === 'User'){
        return 'Author'
      }
      return null
    }
  }
}

export default resolvers
