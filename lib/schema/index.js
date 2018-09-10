import { concat } from 'lodash'

import directives from './directives'
import inputs from './inputs'
import mutations from './mutations'
import queries from './queries'
import subscription from './subscription'

const typeDefs = concat([], directives, inputs, queries, mutations, subscription)
export default typeDefs
