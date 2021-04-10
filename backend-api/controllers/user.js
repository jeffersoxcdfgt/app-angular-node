const Sequelize     = require('sequelize');
const user       = require('../models').user;
module.exports = {
 list(_, res) {
     return user.findAll({})
        .then(user => res.status(200).send(user))
        .catch(error => res.status(400).send(error))
 },
 find (req, res) {
     return user.findAll({
         where: {
             email: req.params.email,
         }
     })
     .then(user => res.status(200).send(user))
     .catch(error => res.status(400).send(error))
  },
};