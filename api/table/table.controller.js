const tableService = require('./table.service')

async function joinTable(req, res) {
  const { firstName, lastName, profilePictureUrl, portfolioStage } = req.body
  try {
    const table = await tableService.joinTable(
      firstName,
      lastName,
      profilePictureUrl,
      portfolioStage
    )
    res.json(table)
  } catch (err) {
    res.status(401).send({ err: 'Failed to join table' })
  }
}

async function resetTables(req, res) {
  try {
    await tableService.resetTables()
    res.json()
  } catch (err) {
    res.status(500).send({ err: 'Failed to reset tables' })
  }
}

module.exports = {
  joinTable,
  resetTables,
}
