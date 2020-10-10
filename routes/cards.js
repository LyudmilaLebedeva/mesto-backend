const cards = require('express').Router();
const { getCards } = require('../helpers/helpers');

cards.get('/cards', getCards);

module.exports = cards;
