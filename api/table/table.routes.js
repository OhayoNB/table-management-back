const express = require('express')
const {
  joinTable,
  deleteTables,
  updateTable,
  getTableById,
  getTables,
  deleteTable,
} = require('./table.controller')

const router = express.Router()

router.post('/join-table', joinTable)
router.put('/:id', updateTable)
router.get('/:id', getTableById)
router.get('/', getTables)
router.delete('/delete-tables', deleteTables)
router.delete('/:id', deleteTable)

module.exports = router
