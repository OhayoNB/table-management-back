const dbService = require('../../services/db.service')
const { ObjectId } = require('mongodb')

//prettier-ignore
async function joinTable(user, portfolioStage) {
  try {
    const collection = await dbService.getCollection('table')
    const table = await collection.findOne({
      portfolioStage: portfolioStage,
      'users.3': { $exists: false },
    })
    if (!table) {
      const tables = await collection.find().sort({ "tableNumber": 1 }).toArray()
      // let tableNumber = tables?.length > 0 ? tables[tables.length - 1]?.tableNumber + 1 : 1;

      for (let index = 0; index < tables.length; index++) {
        const table = tables[index]
        if (table.tableNumber === tableNumber) tableNumber++
        else break
      }

      const newTable = {
        users: [user],
        portfolioStage,
        tableNumber,
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


async function deleteTable(tableId) {
  try {
    const collection = await dbService.getCollection('table')
    await collection.deleteOne({ _id: ObjectId(tableId) })
    return tableId
  } catch (err) {
    throw err
  }
}

async function update(table) {
  try {
    const tableId = table._id
    const objectTableId = ObjectId(tableId)
    delete table._id
    const collection = await dbService.getCollection('table')
    await collection.updateOne({ _id: objectTableId }, { $set: { ...table } })
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
    const table = await collection.findOne({ _id: ObjectId(id) })
    return table
  } catch (err) {
    throw err
  }
}

async function query() {
  try {
    const collection = await dbService.getCollection('table')
    const tables = await collection.find().sort({ "tableNumber": 1 }).toArray()
    return tables
  } catch (err) {
    throw err
  }
}
// TODO create consumer fucntion
export function initConsumer(){
  // TODO: listen to queue and join table one by one
}

initConsumer();
module.exports = {
  joinTable,
  deleteTables,
  update,
  getById,
  query,
  deleteTable
}
