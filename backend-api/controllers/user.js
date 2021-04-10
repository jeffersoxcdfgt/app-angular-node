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
  
  uservalidate (req, res) {
    return user.findAll({
        where: {
            email: req.body.user.email,
            password:req.body.user.password
        }
    })
    .then( (user) => {
        if(user.length === 0){ 
            throw "No Allowed user" 
        }        
        res.status(200).send({
            status: 'success',
             token: '1234567'
       })
   })
    .catch(error =>  {
        res.status(400).json({
            status: 'error',
            messageError: error
        });
    }) 
 },

};