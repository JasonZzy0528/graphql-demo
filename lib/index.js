import { ApolloServer } from 'apollo-server-express'
import { SubscriptionServer } from 'subscriptions-transport-ws'
import { execute, subscribe } from 'graphql'
import { makeExecutableSchema } from 'graphql-tools'

import resolvers from './resolvers'
import schemaDirectives from './directives'
import typeDefs from './schema'
import context from './context'

const graphqlRoutePath = '/api'
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
  context,
  schemaDirectives: schemaDirectives
})

export let wrapApolloServer = (app) => {
  const server = new ApolloServer({
    schema,
    // typeDefs,
    // resolvers,
    context
    // schemaDirectives: schemaDirectives
  })
  server.applyMiddleware({
    app,
    path: graphqlRoutePath,
    // subscriptionsEndpoint: 'http://localhost:3000/subscriptions'
  })
}

export let wrapSubscriptionServer = (app) => {
  new SubscriptionServer({
    execute,
    subscribe,
    schema: schema,
  }, {
    server: app,
    path: graphqlRoutePath,
  })
}
