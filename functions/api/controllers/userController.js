//'use strict'
var path = require('path');
var mongoose = require('mongoose'),
jwt = require('jsonwebtoken'),
bcrypt = require('bcrypt'),
User = mongoose.model('User')
mongoose.set('useCreateIndex', true);


const admin = require('firebase-admin');
const db = admin.firestore();


exports.test = async function(req, res) {
  return res.status(200).send('Hello World!');
};

exports.ind = function(req, res) {
  return res.sendFile(path.join(__dirname+'../../../front/build/index.html'));
};

exports.fav = function(req, res) {
  return res.sendFile(path.join(__dirname+'../../../front/build/favicon.png'));
};

exports.chunk1 = async function(req, res) {
  return res.sendFile(path.join(__dirname+'../../../front/build/static/js/2.5ac4591a.chunk.js'));
};

exports.chunk2 = async function(req, res) {
  return res.sendFile(path.join(__dirname+'../../../front/build/static/js/main.8915414c.chunk.js'));
};

exports.man = async function(req, res) {
  return res.sendFile(path.join(__dirname+'../../../front/build/manifest.json'));
};


exports.create = async function(req, res) {
  console.log('11111111111111')
  try {
    await db.collection('items').doc('/' + req.body.id + '/')
        .create({item: req.body.item});
    return res.status(200).send();
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
}

    exports.register = async function(req, res) {
      // var newUser = new User(req.body);
      // newUser.hash_password = bcrypt.hashSync(req.body.password, 10);
      // newUser.save(function(err, user) {
      //   if (err) {
      //     return res.status(400).send({
      //       message: err
      //     });
      //   } else {
      //     user.hash_password = undefined;
      //     return res.json(user);
      //   }
      // });
      const h_pass = bcrypt.hashSync(req.body.password, 10)
      try {
        await db.collection('users').doc('/' + req.body.name + '/')
            .create({hash_password: h_pass, state: 'test state'});
        return res.status(200).send({name: req.body.name});
      } catch (error) {
        console.log(error);
        return res.status(500).send(error);
      }
      
    };
    
    exports.sign_in = async function(req, res) {
      // User.findOne({
      //   name: req.body.name
      // }, function(err, user) {
      //   if (err) throw err;
      //   if (!user) {
      //     res.status(401).json({ message: 'Authentication failed. User not found.' });
      //   } else if (user) {
      //     if (!user.comparePassword(req.body.password)) {
      //       res.status(401).json({ message: 'Authentication failed. Wrong password.' });
      //     } else {
      //       return res.json({token: jwt.sign({ name: user.name, _id: user._id}, 'RESTFULAPIs')});
      //     }
      //   }
      // });

      function passChecker(password, hash_password) {
        return bcrypt.compareSync(password, hash_password);
      }
        try {
            const document = db.collection('users').doc('/' + req.body.name + '/');
            let item = await document.get();
            let response = item.data();
            if(passChecker(req.body.password, response.hash_password)){
              return res.json({token: jwt.sign({ name: response }, 'RESTFULAPIs')});
            }
            res.status(401).json({ message: 'Authentication failed. Wrong password.' }); 
            //return res.status(200).send(response);
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    
    };
    
    exports.loginRequired = async function(req, res, next) {
      if (req.user) {
        next();
      } else {
        return res.status(401).json({ message: 'Unauthorized user!' });
      }
    };
    
    exports.get_my_links = async function(req, res) {
      // User.findById(req.user._id, function(err, user) {
      //   if (err)
      //     res.send(err);
      //   res.json(user);
      // });

      try {
        const document = db.collection('users').doc('/' + req.query.name + '/');
        let item = await document.get();
        let response = item.data();
        return res.status(200).send(response);
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }

    };
    
    exports.update_state = async function(req, res) {
      // User.findById(req.user._id, function(err, user) {
      //   if (err)
      //     res.send(err); 
      //   user.state = req.body.state
      //   user.save(function(err, user) {
      //     if (err) {
      //       return res.status(400).send({
      //         message: err
      //       });
      //     } else {
      //       user.state = req.body.state;
      //       return res.json(user);
      //     }
      //   });
      // });

      try {
        const document = db.collection('users').doc('/' + req.body.name + '/');
        await document.update({
            state: req.body.state
        });
        return res.status(200).send();
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
    };