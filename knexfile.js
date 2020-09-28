const envPath = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env';
require('dotenv').config({ path: envPath });

module.exports = {
  client: 'pg',
  connection: process.env.DATABASE_URL,
};
