import { ApolloServer } from 'apollo-server-express'

import resolvers from './resolvers'
import schemaDirectives from './directives'
import typeDefs from './schema'
import context from './context'

const graphqlRoutePath = '/api'

let serverWrapper = (app) => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context,
    schemaDirectives: schemaDirectives
  })
  server.applyMiddleware({
    app,
    path: graphqlRoutePath
  })
}

export default serverWrapper
