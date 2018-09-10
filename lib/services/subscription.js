import { PubSub } from 'graphql-subscriptions'
// import { PubSub } from 'apollo-server-express'

export const pubsub = new PubSub()

export const USER_UPDATE = 'USER_UPDATE'
