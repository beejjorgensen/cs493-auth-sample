/*
 * Auth stuff.
 */

const jwt = require('jsonwebtoken');

const secretKey = 'SuperSecret!';

exports.generateAuthToken = function (userId) {
  const payload = {
    sub: userId
  };
  const token = jwt.sign(payload, secretKey, { expiresIn: '24h' });
  return token;
};
