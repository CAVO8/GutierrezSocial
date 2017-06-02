'use strict';
 
var routesIndex = function(app, controllers){
 
  //Index
  app.get("/", controllers.index.main);
}
 
module.exports = routesIndex;