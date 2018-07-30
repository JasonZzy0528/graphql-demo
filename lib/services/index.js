import User from './user'
import Token from './token'

export default {
  User,
  Token
}

// // dynamic import
// import path from 'path'
// import fs from 'fs'
//
// import { asyncForEach } from '../utils'
//
// let module = {}
// const basename = path.basename(__filename)
//
// const files = fs
//   .readdirSync(__dirname)
//   .filter(file => {
//     return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js')
//   })
//
// export default new Promise(async $export => {
//   await asyncForEach(files, async file => {
//     let importedModule = await import(`./${file}`)
//     module[file.replace(/^\w/, c => c.toUpperCase()).replace('.js', '')] = importedModule.default
//   })
//   console.error(module)
//   return $export(module)
// })
