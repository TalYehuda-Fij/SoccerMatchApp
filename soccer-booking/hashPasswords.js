const bcrypt = require('bcryptjs');
const pool = require('./db');

const hashPasswords = async () => {
  try {
    const users = await pool.query('SELECT * FROM users');

    for (let user of users.rows) {
      // Check if the password is already hashed
      const isHashed = bcrypt.getRounds(user.password) > 0;
      if (!isHashed) {
        const hashedPassword = bcrypt.hashSync(user.password, 10);
        await pool.query(
          'UPDATE users SET password = $1 WHERE id = $2',
          [hashedPassword, user.id]
        );
        console.log(`User ${user.id} password hashed`);
      } else {
        console.log(`User ${user.id} password is already hashed`);
      }
    }

    console.log('Password hashing completed.');
  } catch (err) {
    console.error('Error hashing passwords:', err.message);
  }
};

hashPasswords();
