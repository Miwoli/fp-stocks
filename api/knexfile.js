const config = require('./config.json');

module.exports = {
    client: 'mysql2',
    connection: config.database,
    useNullAsDefault: true,
}