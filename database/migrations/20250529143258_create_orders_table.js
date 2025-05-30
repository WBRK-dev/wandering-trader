/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
    return knex.schema.createTable('orders', (table) => {
        table.increments('id').primary();
        table.string('product').notNullable();
        table.integer('amount').notNullable();
        table.integer('price').notNullable();
        table.tinyint('active').defaultTo(1);
        table.timestamp('created_at').defaultTo(knex.fn.now());
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
    return knex.schema.dropTableIfExists('orders');
};
