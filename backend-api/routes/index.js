/* Controllers */
const userController = require('../controllers/user');
module.exports = (app) => {

   app.get('/api', (req, res) => res.status(200).send ({
        message: 'Example project did not give you access to the api web services',
   }));

   app.get('/api/user/list', userController.list);
   app.get('/api/user/find/email/:email', userController.find);
   app.post('/api/user/uservalidate', userController.uservalidate);
};