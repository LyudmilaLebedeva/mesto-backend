const fs = require('fs').promises;
const path = require('path');

const dataFileName = (fileName) => path.join(__dirname, `../data/${fileName}`);

const prosesDataFromFile = (res, fileName, func, req) => {
  fs.readFile(dataFileName(fileName), 'utf8')
    .then((data) => {
      func(res, data, req);
    })
    .catch(() => {
      res.status(500).send({ message: 'Ошибка чтения файла' });
    });
};

const resSendData = (res, data) => {
  res.send(JSON.parse(data));
};

const resSendUser = (res, data, req) => {
  const user = JSON.parse(data).find((item) => item._id === req.params.id);
  if (!user) {
    res.status(404).send({ message: 'Нет пользователя с таким id' });
    return;
  }
  res.send(user);
};

// Экспортируемые функции для роутинга

const getCards = (req, res) => {
  prosesDataFromFile(res, 'cards.json', resSendData);
};

const getUsers = (req, res) => {
  prosesDataFromFile(res, 'users.json', resSendData);
};

const getUser = (req, res) => {
  prosesDataFromFile(res, 'users.json', resSendUser, req);
};

module.exports = {
  getCards,
  getUsers,
  getUser,
};
