// import DataLoader from 'dataloader'
//
import service from '../services'
//
// let makeSelfClearingDataloader = resolveBatchFunction => {
//   const dataloader = new DataLoader((ids) => {
//     dataloader.clearAll()
//     return resolveBatchFunction(ids)
//   })
//   return dataloader
// }
//
// export default {
//   dataloaders: {
//     getUsersByChunkIds: makeSelfClearingDataloader((chunkIds) => {
//       return service.user.getUsersByChunkIds(chunkIds)
//     })
//   }
// }
let context = ({ req }) => {
  const token = req.headers.authorization || ''
  
}

export default context
