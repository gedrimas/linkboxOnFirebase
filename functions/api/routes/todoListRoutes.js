'use strict';
module.exports = function(app) {

  var userHandlers = require('../controllers/userController.js');


  app.route('/api/create').post(userHandlers.create)


  app.route('/hello-world')
    .get(userHandlers.test);

  app.route('/')
    .get(userHandlers.ind);

    app.route('/favicon.png')
    .get(userHandlers.fav);

    app.route('/2.5ac4591a.chunk.js')
    .get(userHandlers.chunk1);

    app.route('/main.8915414c.chunk.js')
    .get(userHandlers.chunk2);

    app.route('/manifest.json')
    .get(userHandlers.man);

  app.route('/register')
    .post(userHandlers.register);
    
  app.route('/sign_in')
    .post(userHandlers.sign_in)

  app.route('/mylinks')
    .post(userHandlers.loginRequired, userHandlers.update_state)
    .get(userHandlers.loginRequired, userHandlers.get_my_links)
    
    //app.route('/mylinks/:name')
};


