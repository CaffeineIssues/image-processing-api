import express from 'express'
const router = express.Router()

router.get('/thumbs', (req, res) => {
    res.send('thumbs router')
})

export default router
