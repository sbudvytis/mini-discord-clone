const { generateRandomId } = require('./utils.cjs')

module.exports = {
  buildMessage: (session, message) => {
    const timestamp = new Date().toISOString()
    return {
      id: generateRandomId(),
      userId: session.userId,
      username: session.username,
      message,
      timestamp,
    }
  },
}
