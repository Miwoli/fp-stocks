
exports.up = function(knex) {
    return Promise.all([
        knex.schema.createTable('user', (table) => {
            table.increments();
            table.string('first_name');
            table.string('last_name');
            table.string('login').unique();
            table.string('password');
            table.double('money');
            table.timestamps();
        }),
        knex.schema.createTable('stock', (table) => {
            table.increments();
            table.string('name');
            table.string('code').unique();
            table.integer('unit');
            table.double('price');
            table.integer('amount');
            table.timestamps();
        })
    ])
};

exports.down = function(knex) {
    return Promise.all([
        knex.schema.dropTable('user'),
        knex.schema.dropTable('stock')
    ])
};
