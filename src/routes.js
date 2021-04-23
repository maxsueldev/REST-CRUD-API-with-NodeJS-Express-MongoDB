const express = require('express');
const routes = express.Router();

const UserController = require('./controllers/UserController');

routes.get('/users/listen', UserController.show);
routes.post('/users/create', UserController.store);
routes.put('/users/:user_id/update',UserController.update);
routes.delete('/users/:user_id/delete',UserController.delete);

module.exports = routes;