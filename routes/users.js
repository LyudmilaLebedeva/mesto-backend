const users = require('express').Router();
const { getUsers, getUser } = require('../helpers/helpers');

users.get('/users', getUsers);

users.get('/users/:id', getUser);

module.exports = users;
