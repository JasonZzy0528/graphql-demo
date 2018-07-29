import { concat } from 'lodash'

import queries from './queries'
import mutations from './mutations'
import directives from './directives'

const typeDefs = concat([], directives, queries, mutations)
export default typeDefs
