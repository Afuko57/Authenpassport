const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');


const userModel = require('../Model/userModel');

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Login with user credentials
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             example:
 *               message: Login successful
 *               user:
 *                 type: object
 *                 properties:
 *                   // Define user properties here
 */
router.post('/', passport.authenticate('local'), (req, res) => {
  const secretKey = process.env.SECRET_KEY;
  const token = jwt.sign({ id: req.user.id }, secretKey, { expiresIn: '1h' });

  res.json({ message: 'Login successful', user: req.user, token });
});


module.exports = router;
