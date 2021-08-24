const Sequelize     = require('sequelize');
const products       = require('../models').products;
const getDirName = require('path').dirname; 
const path = require('path');

process.cwd()
process.chdir('../front-app/src/assets/img');

module.exports = {
 create(req, res) {
    
    const base64Data = req.body.image.replace(/^data:image\/jpeg;base64,/, "");
    require("fs").writeFile( `${req.body.name}.jpeg`, base64Data, 'base64', function(err) {
      console.log(err);
    });

    return products
        .create ({  
          name: req.body.name,
          description: req.body.description,
          price: req.body.price,
          picture: req.body.picture,
          cost:  req.body.cost,
          image: req.body.image
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