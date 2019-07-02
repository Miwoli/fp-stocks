const moment = require('moment');

exports.up = function(knex) {
    return Promise.all([
        knex.schema.raw('INSERT INTO stock (id, name, code, unit, price, amount, created_at, updated_at) VALUES (\'1\', \'Future Processing\', \'FP\', \'1\', NULL, \'2077\', \''+ moment().format('YYYY-MM-DD HH:MM:SS').toString() +'\', NULL)'),
        knex.schema.raw('INSERT INTO stock (id, name, code, unit, price, amount, created_at, updated_at) VALUES (\'2\', \'FP Lab\', \'FPL\', \'100\', NULL, \'600\', \''+ moment().format('YYYY-MM-DD HH:MM:SS').toString() +'\', NULL)'),
        knex.schema.raw('INSERT INTO stock (id, name, code, unit, price, amount, created_at, updated_at) VALUES (\'3\', \'FP Coin\', \'FPC\', \'50\', NULL, \'850\', \''+ moment().format('YYYY-MM-DD HH:MM:SS').toString() +'\', NULL)'),
        knex.schema.raw('INSERT INTO stock (id, name, code, unit, price, amount, created_at, updated_at) VALUES (\'4\', \'FP Adventure\', \'FPA\', \'50\', NULL, \'700\', \''+ moment().format('YYYY-MM-DD HH:MM:SS').toString() +'\', NULL)'),
        knex.schema.raw('INSERT INTO stock (id, name, code, unit, price, amount, created_at, updated_at) VALUES (\'5\', \'Deadline 24\', \'DL24\', \'100\', NULL, \'2000\', \''+ moment().format('YYYY-MM-DD HH:MM:SS').toString() +'\', NULL)'),
        knex.schema.raw('INSERT INTO stock (id, name, code, unit, price, amount, created_at, updated_at) VALUES (\'6\', \'Progress Bar\', \'PGB\', \'1\', NULL, \'2022\', \''+ moment().format('YYYY-MM-DD HH:MM:SS').toString() +'\', NULL)'),
    ])
};

exports.down = function(knex) {
    
};
