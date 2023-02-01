const tableService = require('./table.service')

async function joinTable(req, res) {
  const { firstName, lastName, imgUrl, portfolioStage } = req.body
  try {
    const table = await tableService.joinTable(
      firstName,
      lastName,
      imgUrl,
      portfolioStage
    )
    res.json(table)
  } catch (err) {
    res.status(401).send({ err: 'Failed to join table' })
  }
}

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
    logger.error('Failed to get table', err)
    res.status(500).send({ err: 'Failed to get table' })
  }
}

module.exports = {
  joinTable,
  deleteTables,
  updateTable,
  getTableById
}
