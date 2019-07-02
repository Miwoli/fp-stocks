
exports.up = function(knex) {
    return Promise.all([
        knex.schema.createTable('user_stock', (table) => {
            table.increments();
            table.integer('user_id').unsigned().references('id').inTable('user');
            table.integer('stock_id').unsigned().references('id').inTable('stock');
            table.integer('amount');
        })
    ])
};

exports.down = function(knex) {
    return Promise.all([
        knex.schema.dropTable('user_stock')
    ])
};
