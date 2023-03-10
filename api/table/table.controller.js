const tableService = require('./table.service')

async function joinTable(req, res) {
  const { firstName, lastName, imgUrl, portfolioStage, id } = req.body
  const user = { firstName, lastName, imgUrl, id }
  try {
    // TODO: Push request table message to queue.
    // publish to queue message: UUID, firstname, lastname, stage
    const table = await tableService.joinTable(user, portfolioStage)
    res.json(table)
  } catch (err) {
    res.status(401).send({ err: 'Failed to join table' })
  }
}
// Publisher (enqueue) -> [] <- Consumer (dequeue)
async function deleteTables(req, res) {
  try {
    await tableService.deleteTables()
    res.json()
  } catch (err) {
    res.status(500).send({ err: 'Failed to reset tables' })
  }
}

async function updateTable(req, res) {
  const table = req.body

  try {
    const updatedTable = await tableService.update(table)
    res.json(updatedTable)
  } catch (err) {
    console.error(err)
    res.status(500).send({ err: 'Failed to reset tables' })
  }
}

async function getTableById(req, res) {
  try {
    const { id } = req.params
    const table = await tableService.getById(id)
    res.json(table)
  } catch (err) {
    res.status(500).send({ err: 'Failed to get table' })
  }
}

async function deleteTable(req, res) {
  try {
    const tableId = req.params.id
    const removedId = await tableService.deleteTable(tableId)
    res.send(removedId)
  } catch (err) {
    res.status(500).send({ err: 'Failed to remove table' })
  }
}

// GET LIST
async function getTables(req, res) {
  try {
    const tables = await tableService.query()
    res.json(tables)
  } catch (err) {
    res.status(500).send({ err: 'Failed to get tables' })
  }
}

module.exports = {
  joinTable,
  deleteTables,
  updateTable,
  getTableById,
  getTables,
  deleteTable
}
