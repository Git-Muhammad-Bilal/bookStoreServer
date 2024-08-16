const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const FavoritesSchema = new Schema({

    users: [{
        
        type: Schema.Types.ObjectId,
        ref: 'Users',
    }],

    book: {
        type: String,
    }

})

module.exports = mongoose.model('Favorites', FavoritesSchema);

