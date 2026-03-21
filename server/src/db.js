require('dotenv').config();
const { Pool } = require('pg');

const isProduction = process.env.NODE_ENV === 'production';

// Railway internal urls won't use SSL on internal instances, but external connections usually do.
// We'll safely apply SSL if it's not a local or internal URL just in case, but rely on generic settings.
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.DATABASE_URL?.includes('internal') ? false : { rejectUnauthorized: false }
});

module.exports = {
    query: (text, params) => pool.query(text, params),
};
