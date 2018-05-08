const express = require('express');
const path = require('path');

const router = express.Router();
const publicDir = path.join(__dirname, '../../public/');

router.route('/')
  .get((req, res) => {
    res.redirect('/login');
  });

router.route('/login')
  .get((req, res) => {
    res.sendFile(`${publicDir}login.html`);
  });

module.exports = router;
