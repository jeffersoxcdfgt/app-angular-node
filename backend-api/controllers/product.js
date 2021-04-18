const Sequelize     = require('sequelize');
const products       = require('../models').products;
module.exports = {
 create(req, res) {
    return products
        .create ({  
          name: req.body.name,
          description: req.body.description,
          price: req.body.price,
          picture: req.body.picture,
          cost:  req.body.cost
        })
        .then(products => res.status(200).send(products))
        .catch(error => res.status(400).send(error))
 },
 update(req, res) {
    return products
        .update (            
         {
           name: req.body.name,
           description: req.body.description,
           price:req.body.price,
           picture:req.body.picture,
           cost:req.body.cost
         },         
         {
           where: {id: req.params.id},
           plain: true
         }
        )
        .then(products => res.status(200).send(products))
        .catch(error => res.status(400).send(error))
 },

 delete(req, res) {
    return products
        .destroy (                     
         {
           where: {id: req.params.id},
           plain: true
         }
        )
        .then(products => res.status(200).res.sendStatus(products))
        .catch(error => res.status(400).send(error))
 },

 list(_, res) {
     return products.findAll({})
        .then(products => res.status(200).send(products))
        .catch(error => res.status(400).send(error))
 },
 find (req, res) {

     return products.findAll({
         where: {
            name: req.params.name,
         }
     })
     .then(products => res.status(200).send(products))
     .catch(error => res.status(400).send(error))
  },
};