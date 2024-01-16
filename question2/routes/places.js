// rendre persistent donnée + créer fichier json
const express = require('express');
const { v4: uuidv4 } = require('uuid');
const path = require('node:path');
const { serialize, parse } = require('../utils/json');

const router = express.Router();
const jsonDbPath = path.join(__dirname, '/../data/places.json');
const jsonUsersPath = path.join(__dirname, '/../data/users.json');
const jsonFavoritesPath = path.join(__dirname, '/../data/favorites.json');

/* GET users listing. */
router.post('/addPlace', (req, res) => {
  const name = req?.body?.name;
  const description = req?.body?.description;

  if (!name || !description) {
    return res.sendStatus(400); // Bad request
  }

  const places = parse(jsonDbPath, []);

  const newId = uuidv4();

  const newPlace = {
    id: newId,
    name,
    description,
  };

  places.push(newPlace);

  serialize(jsonDbPath, places);

  return res.json(newPlace);
});

router.post('/addUser', (req, res) => {
  const name = req?.body?.name;
  const email = req?.body?.email;

  if (!name || !email) {
    return res.sendStatus(400); // Bad request
  }

  const users = parse(jsonUsersPath, []);

  const newId = uuidv4();

  const newUser = {
    id: newId,
    name,
    email,
  };

  users.push(newUser);

  serialize(jsonUsersPath, users);

  return res.json(newUser);
});

router.post('/favorite', (req, res) => {
  const id = req?.body?.id;
  const favoritePlace = req?.body?.favorite;

  if (id || favoritePlace) {
    return res.sendStatus(400); // Bad request
  }

  const users = parse(jsonUsersPath, []);

  const userToUpdate = users.find((user) => user.id === id);
  if (!userToUpdate) {
    console.log('User with the given id does not exist');
    return res.sendStatus(404); // Not Found
  }

  const favorite = parse(jsonFavoritesPath, []);

  const newFavorite = {
    id,
    favoritePlace,
  };

  favorite.push(newFavorite);

  serialize(jsonFavoritesPath, favorite);

  return res.json(newFavorite);
});

module.exports = router;
