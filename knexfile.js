const envPath = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env';
require('dotenv').config({ path: envPath });

module.exports = {
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    port : 5432,
    user : 'sukhdev',
    password : 'root',
    database : 'knowledge_house_backup'
  }
};
