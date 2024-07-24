const bcrypt = require('bcryptjs');
const pool = require('./db');

const createTestUser = async () => {
  const username = 'admin';
  const email = 'admin@example.com';
  const password = bcrypt.hashSync('password123', 10); // Known password for testing
  const role = 'admin';
  const skill_level = 0;

  try {
    const newUser = await pool.query(
      'INSERT INTO users (username, email, password, role, skill_level) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [username, email, password, role, skill_level]
    );
    console.log('Test user created:', newUser.rows[0]);
  } catch (err) {
    console.error('Error creating test user:', err.message);
  }
};

createTestUser();
