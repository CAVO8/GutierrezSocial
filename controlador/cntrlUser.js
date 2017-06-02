var crypto = require('crypto');
var modelDB;

function setDB(db) {
  modelDB = db;
};
//Iniciar sesión
function login(username, password, cb) {
  var usernameval = username.toLowerCase();
  var encPass = crypto.createHash('sha256').update(password).digest('hex');
  modelDB.users.findOne({ usernameval : usernameval, password : encPass }, function(err, user) {
    if (err) {
      throw err;
    } else {
      cb(err, user)
    }
  })
};

//
function signup(username, password, email, cb) {
  var usernameval = username.toLowerCase();
  var encPass = crypto.createHash('sha256').update(password).digest('hex');
  modelDB.users.findOne({ email : email }, function(err, user) {
    if (err) {
      console.log(err);
      cb(err)
    } else {
      if (user) {
        console.log("ya hay user con ese mail");
        err = "ya hay user con ese mail";
        cb(err)
      } else {
        modelDB.users.insert({ username : username, usernameval : usernameval, password : encPass, email : email}, function(err){
          cb(err);
        });
      }
    }
  });
};

module.exports = {login, signup, setDB}