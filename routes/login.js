const express = require('express');
const router = express.Router();
const passport = require('passport');


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
  res.json({ message: 'Login successful', user: req.user });
});

module.exports = router;
