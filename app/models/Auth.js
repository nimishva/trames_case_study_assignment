const mongoose = require('mongoose'); // Includig Mongoose Package
const timeLib  = require('../libs/timeLib');

Schema = mongoose.Schema;

let authSchema = new Schema({

    id         : {
        type   : String,
        unique : true,
    },

    email      : {
        type   : String
    },

    secretKey  : {
        type   : String,
    },
    emailVerified :{
        type         :Boolean,
        default      : false
    },

    createdOn  : {
        type:Date,
        default:timeLib.now()
      }

})

mongoose.model('Auth',authSchema);