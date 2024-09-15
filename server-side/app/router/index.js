const express = require('express')
const { postUser } = require('./POST/user')
const { getAllUser, getUserById } = require('./GET/user')
const { updateUser } = require('./PUT')
const { deleteUser } = require('./DELETE/user')
const router = express.Router()

router.get('/user', getAllUser)
router.get('/user/:id', getUserById)
router.post('/user', postUser)
router.put('/user/:id', updateUser)
router.delete('/user/:id', deleteUser)

module.exports = router