const ObjectId = require('mongodb').ObjectId

//prettier-ignore
async function joinTable(firstName, lastName, profilePictureUrl, portfolioStage) {
  try {
    const collection = await dbService.getCollection('table')
    const table = await collection.findOne({
      portfolioStage: portfolioStage,
      users: { $size: { $lt: 4 } },
    })
    const user = { firstName, lastName, profilePictureUrl }
    if (!table) {
      const collectionLength = await collection.count()
      const newTable = {
        users: [user],
        portfolioStage,
        tableNumber: collectionLength + 1,
      }

      await collection.insertOne(newTable)

      return newTable
    } else {
      table.users.push(user)
      let tableId = table._id

      await collection.updateOne({ _id: tableId }, { $set: { ...table } })

      return table
    }
  } catch (err) {
    console.error('cannot find table', err)
    throw err
  }
}

async function resetTables() {
  try {
    const collection = await dbService.getCollection('table')
    await collection.remove({})
  } catch (err) {
    console.error('Cannot empty tables', err)
    throw err
  }
}

module.exports = {
  joinTable,
  resetTables,
}
