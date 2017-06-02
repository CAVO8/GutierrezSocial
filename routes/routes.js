'use strict'
 
const path = require('path');
const glob = require('glob');
 
//Mi instancia app del servidor
const app = require(path.join(process.cwd(), 'app'));
 
//Cargo en un array todos los controlador y hago require
let controllers = {};
let files = glob.sync(path.join(process.cwd(), 'app', 'controllers', '**', '*.js'));
files.forEach(function(file) {
  let temp = controllers;
  let parts = path.relative(path.join(process.cwd(), 'app', 'controllers'), file).slice(0, -3).split(path.sep);
 
  while (parts.length) {
    if (parts.length === 1) {
      temp[parts[0]] = require(file);
    } else {
      temp[parts[0]] = temp[parts[0]] || {};
    }
    temp = temp[parts.shift()];
  }
});
 
// Rutas de la aplicación
module.exports = function(){
  //Rutas index
  require('./routes/index')(app, controllers);
}