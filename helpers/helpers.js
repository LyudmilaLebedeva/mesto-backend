const fs = require('fs');
const path = require('path');

const dataFileName = (fileName) => path.join(__dirname, `../data/${fileName}`);

const fileErrorHanding = (err, res) => {
  if (err) {
    res.status(500).send(err);
    // eslint-disable-next-line no-useless-return
    return;
  }
};

const prosesDataFromFile = (res, fileName, func, req) => {
  fs.readFile(dataFileName(fileName), { encoding: 'utf8' }, (err, data) => {
    fileErrorHanding(err, res);
    func(res, data, req);
  });
};

const resSendData = (res, data) => {
  res.send(data);
};

const resSendUser = (res, data, req) => {
  // eslint-disable-next-line no-underscore-dangle
  const user = JSON.parse(data).find((item) => item._id === req.params.id);
  if (!user) {
    res.status(404).send('{ "message": "Нет пользователя с таким id" }');
    return;
  }
  res.send(JSON.stringify(user));
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
