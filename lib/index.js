import { ApolloServer } from 'apollo-server-express'
import { SubscriptionServer } from 'subscriptions-transport-ws'
import { execute, subscribe } from 'graphql'
import { makeExecutableSchema } from 'graphql-tools'

import config from '../config'
import context from './context'
import resolvers from './resolvers'
import schemaDirectives from './directives'
import typeDefs from './schema'
import { logger } from '../utils'

const graphqlRoutePath = '/api'
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
  logger: {
    log: e => logger.error(e)
  },
  schemaDirectives: schemaDirectives
})

export let wrapApolloServer = (app) => {
  const server = new ApolloServer({
    schema,
    context,
    introspection: config.devMode
  })
  server.applyMiddleware({
    app,
    path: graphqlRoutePath,
    subscriptionsEndpoint: 'http://localhost:3000/subscriptions'
  })
}

export let wrapSubscriptionServer = (app) => {
  new SubscriptionServer({
    execute,
    subscribe,
    context,
    schema,
  }, {
    server: app,
    path: graphqlRoutePath,
  })
}
