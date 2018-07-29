import resolvers from './resolvers'
import typeDefs from './schema'
import { ApolloServer } from 'apollo-server-express'

const graphqlRoutePath = '/api'

let serverWrapper = (app) => {
  const server = new ApolloServer({
    typeDefs,
    resolvers
  })
  server.applyMiddleware({
    app,
    path: graphqlRoutePath
  })
}

export default serverWrapper
