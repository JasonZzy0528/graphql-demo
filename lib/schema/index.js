import { concat } from 'lodash'

import directives from './directives'
import inputs from './inputs'
import mutations from './mutations'
import queries from './queries'

const typeDefs = concat([], directives, inputs, queries, mutations)
export default typeDefs
