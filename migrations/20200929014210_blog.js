exports.up = function (knex) {
  return knex.schema
    .createTable('posts', table => {
      table.increments('id');
      table.text('title').notNullable();
      table.text('content').notNullable();
      table.timestamp('published_on').defaultTo(knex.fn.now());
      table.integer('user_id').notNullable();
    })
    .createTable('users', table => {
      table.increments('user_id');
      table.string('user_name').notNullable();
      table.text('img_url');
      table.text('bio');
    });
};

exports.down = function (knex) {
  return knex.schema.dropTable('posts').dropTable('users');
};
