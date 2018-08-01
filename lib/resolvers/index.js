/* @flow */
import { GraphQLScalarType } from 'graphql'
import { UserInputError } from 'apollo-server-express'
import { Kind } from 'graphql/language'

import services from './../services'

const resolvers = {
  Query: {
    Users: (root, args) => {
      if (args.first !== undefined && args.last != undefined) {
        throw new UserInputError('Passing both `first` and `last` to paginate the `search` connection is not supported.')
      } else if (args.first === undefined && args.last == undefined) {
        throw new UserInputError('You must provide a `first` or `last` value to properly paginate the `search` connection.')
      }
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
  Item: {
    __resolveType(obj) {
      if(obj.name === 'User'){
        return 'Author'
      }

      return null
    }
  },
  // NaturalNumber: new GraphQLScalarType({
  //   name: 'NaturalNumber',
  //   description: 'NaturalNumber custom scalar type',
  //   parseValue(value) {
  //     // if (value !== parseInt(value, 10)) {
  //     //   throw UserInputError()
  //     // }
  //     return value
  //   },
  //   serialize(value) {
  //     return value
  //   },
  //   parseLiteral(ast) {
  //     console.error(ast)
  //     return ast.value
  //     // if (ast.kind === Kind.INT) {
  //     //   return new Date(ast.value) // ast value is always in string format
  //     // }
  //     // return null
  //   },
  // }),
}

export default resolvers
