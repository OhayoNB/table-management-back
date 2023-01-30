const express = require('express')
const { joinTable, resetTables } = require('./auth.controller')

const router = express.Router()

router.post('/join-table', joinTable)
router.get('/reset-tables', resetTables)

module.exports = router