const dbService = require('../../services/db.service')
const { ObjectId } = require('mongodb')

//prettier-ignore
async function joinTable(firstName, lastName, imgUrl, portfolioStage) {
  try {
    const collection = await dbService.getCollection('table')
    const table = await collection.findOne({
      portfolioStage: portfolioStage,
      'users.3': { $exists: false },
    })
    const user = { firstName, lastName, imgUrl }
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

async function deleteTables() {
  try {
    const collection = await dbService.getCollection('table')
    await collection.deleteMany({})
  } catch (err) {
    console.error('Cannot empty tables', err)
    throw err
  }
}

async function update(table) {
  try {
    const tableId = table._id
    const objectTableId = ObjectId(tableId)
    delete table._id
    const collection = await dbService.getCollection('table')
    await collection.updateOne({ _id:  objectTableId}, { $set: { ...table } })
    table._id = tableId
    return table
  } catch (err) {
    console.error(err)
    throw err
  }
}

async function getById(id) {
  try {
    const collection = await dbService.getCollection('table')
    const table = collection.findOne({ _id: ObjectId(id) })
    return table
  } catch (err) {
    throw err
  }
}

module.exports = {
  joinTable,
  deleteTables,
  update,
  getById
}
