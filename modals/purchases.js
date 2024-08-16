const { count } = require('console');
const mongoose = require('mongoose');
const { type } = require('os');

const Schema = mongoose.Schema;


const PurchasesScehma = new Schema({
    title: {
        type: String,
        required: true

    },
    book: {
        type: String,
        required: true

    },
    quantity: {
        type: Number,
        required: true
    },

    price:{
        type:Number,
        required:true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
    },
    
    image:{
        type:String,
        
    },
    time:{
        type:String,
        required:true
    },
    date:{
     type:String,
     required:true
    }
})

module.exports = mongoose.model('Purchases', PurchasesScehma)


