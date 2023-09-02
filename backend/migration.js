const { Pool } = require('pg');

const connectionString = 'postgresql://your-db-user:your-db-password@postgres:5432/your-db-name';

const pool = new Pool({
  connectionString,
});

pool.connect((err, client, release) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    process.exit(1);
  }

  // Check if the 'users' table exists
  client.query(
    'SELECT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = $1)',
    ['users'],
    (err, result) => {
      if (err) {
        console.error('Error checking table existence:', err);
        release();
        process.exit(1);
      }

      const tableExists = result.rows[0].exists;

      if (!tableExists) {
        // Create the 'users' table
        client.query(
          `CREATE TABLE users (
            id serial PRIMARY KEY,
            username VARCHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL
          )`,
          (err) => {
            if (err) {
              console.error('Error creating table:', err);
            } else {
              console.log('Table "users" created successfully.');
            }

            release();
            process.exit(0);
          }
        );
      } else {
        console.log('Table "users" already exists.');
        release();
        process.exit(0);
      }
    }
  );
});
