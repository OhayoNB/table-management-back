const express = require('express')
const { joinTable, deleteTables, updateTable } = require('./table.controller')

const router = express.Router()

router.post('/join-table', joinTable)
router.put('/:id', updateTable)
router.delete('/delete-tables', deleteTables)

module.exports = router