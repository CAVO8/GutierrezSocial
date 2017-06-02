'use strict'

var mongoose = require('require');
var Schema = mongoose.Schema

var UserShema = new Schema({
	nambre: String
	password: String
})
 module.exports = mongoose.model('user', UserShema)