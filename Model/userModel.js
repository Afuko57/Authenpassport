const connection = require('../config/db');
const bcrypt = require('bcrypt');

const userModel = {
  getUserByUsername: async (username) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM users WHERE username = ?',
        [username],
        (err, results) => {
          if (err) {
            reject(err);
          } else {
            if (results.length > 0) {
              resolve(results[0]);
            } else {
              resolve(null);
            }
          }
        }
      );
    });
  },
  

  createUser: async (username, email, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);

    return new Promise((resolve, reject) => {
      connection.query(
        'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
        [username, email, hashedPassword],
        (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        }
      );
    });
  },

  getUserByEmail: async (email) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM users WHERE email = ?',
        [email],
        (err, results) => {
          if (err) {
            reject(err);
          } else {
            if (results.length > 0) {
              resolve(results[0]);
            } else {
              resolve(null);
            }
          }
        }
      );
    });
  },

  getUserById: async (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM users WHERE id = ?',
        [id],
        (err, results) => {
          if (err) {
            reject(err);
          } else {
            if (results.length > 0) {
              resolve(results[0]);
            } else {
              resolve(null);
            }
          }
        }
      );
    });
  },

  getUserByEmailOrUsername: async (emailOrUsername) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM users WHERE email = ? OR username = ?',
        [emailOrUsername, emailOrUsername],
        (err, results) => {
          if (err) {
            reject(err);
          } else {
            if (results.length > 0) {
              resolve(results[0]);
            } else {
              resolve(null);
            }
          }
        }
      );
    });
  },
  

};

module.exports = userModel;
