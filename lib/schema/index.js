import { concat } from 'lodash'

import queries from './queries'
import mutations from './mutations'

const typeDefs = concat([], queries, mutations)

export default typeDefs
