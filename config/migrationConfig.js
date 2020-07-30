const config = require('./index')

const cfg = {}
cfg[config.environment] = config.sequelize;

module.exports = cfg