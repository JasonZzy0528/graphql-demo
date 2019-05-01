import config from '../config'
import context from './context'
import resolvers from './resolvers'
import schemaDirectives from './directives'
import services from './services'
import typeDefs from './schema'
import { ApolloServer } from 'apollo-server-express'
import { AuthenticationError, ForbiddenError } from 'apollo-server-express'
import { SubscriptionServer } from 'subscriptions-transport-ws'
import { execute, subscribe } from 'graphql'
import { has } from 'lodash'
import { logger } from '../utils'
import { makeExecutableSchema } from 'graphql-tools'
import { verifyJWT, validate } from './utils'

const graphqlRoutePath = '/api'
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
  logger: {
    log: e => logger.error(e)
  },
  schemaDirectives: schemaDirectives
})

export let wrapApolloServer = app => {
  const server = new ApolloServer({
    schema,
    context,
    introspection: config.devMode
  })
  server.applyMiddleware({
    app,
    path: graphqlRoutePath,
    subscriptionsEndpoint: 'ws://localhost:3000/subscriptions'
  })
}

export let wrapSubscriptionServer = app => {
  new SubscriptionServer(
    {
      execute,
      subscribe,
      context,
      schema,
      onConnect: async headers => {
        if (headers.Authorization) {
          const authorization = headers.Authorization
          const jwt = authorization.replace('Bearer ', '')
          const userIdentity = verifyJWT(jwt)
          if (!userIdentity || !has(userIdentity, 'jti')) {
            throw new ForbiddenError('Not authorized!')
          }
          const token = await services.Token.get({
            where: { id: userIdentity.jti }
          })
          validate.token(token)
          const user = await services.User.get({ id: token.user_id })
          if (!user) {
            throw new ForbiddenError('Not authorized!')
          }
          const currentUser = user
          return {
            authorization,
            currentUser
          }
        }
        throw new AuthenticationError(
          'You must supply a JWT for authorization!'
        )
      }
    },
    {
      server: app,
      path: graphqlRoutePath
    }
  )
}
