/* Controllers */
const userController = require('../controllers/user');
const productsController = require('../controllers/product');

module.exports = (app) => {

   app.get('/api', (req, res) => res.status(200).send ({
        message: 'Example project did not give you access to the api web services',
   }));

   app.get('/api/user/list', userController.list);
   app.get('/api/user/find/email/:email', userController.find);
   app.post('/api/user/uservalidate', userController.uservalidate);

   app.post('/api/products/create', productsController.create);
   app.put('/api/products/update/id/:id', productsController.update);
   app.delete('/api/products/delete/id/:id', productsController.delete);   
   app.get('/api/products/list', productsController.list);
   app.get('/api/products/find/name/:name', productsController.find);

};