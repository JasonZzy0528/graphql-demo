// import DataLoader from 'dataloader'

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
  return {
    headers: req.headers
  }
}

export default context
