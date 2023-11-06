const initOptions = {
  // Database connection settings
  connectionString:
    'postgres://nextjs_final_project:nextjs_final_project@localhost:3000/nextjs_final_project',
};

const pgp = require('pg-promise')(initOptions);

// Create a database instance
const db = pgp();

module.exports = db;
