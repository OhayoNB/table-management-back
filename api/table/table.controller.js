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
    const { username, password, fullname, imgUrl } = req.body
    const account = await authService.signup(
      username,
      password,
      fullname,
      imgUrl
    )
    logger.debug(`auth.route - new account created: ` + JSON.stringify(account))
    const user = await authService.login(username, password)
    const loginToken = authService.getLoginToken(user)

    logger.info('User login: ', user)
    res.cookie('loginToken', loginToken)
    res.json(user)
  } catch (err) {
    logger.error('Failed to signup ' + err)
    res.status(500).send({ err: 'Failed to signup' })
  }
}

module.exports = {
  joinTable,
  resetTables,
}
