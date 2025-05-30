/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
    return knex.schema.createTable('return_orders', (table) => {
        table.increments('id').primary();
        table.bigInteger('order_id').notNullable().references('id').inTable('orders').onDelete('CASCADE');
        table.integer('price').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
    return knex.schema.dropTableIfExists('return_orders');
};
