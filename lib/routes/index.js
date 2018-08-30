import express from 'express'

let router = express.Router()
router.get('/health-check', (req, res) => {
  res.status(200).json({ status: 'ok' })
})

export default router
