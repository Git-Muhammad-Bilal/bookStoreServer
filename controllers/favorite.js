const Favorites = require('../modals/favorite')
const Users = require('../modals/user')



exports.savefavoriteBook = async (req, res) => {
    const user = req.user;
    const { bookId } = req.body
   
    try {

        let foundFavBook = await Favorites.findOne({ book: bookId })


        if (foundFavBook) {

            const pullResult = await Favorites?.updateOne({ book: bookId }, { $pull: { users: user._id } });
            const pullUsersResult = await Users?.updateOne({ _id: user._id }, { $pull: { favorites: foundFavBook._id } });
            
            
            if (pullResult?.modifiedCount === 0) {
                await Favorites.updateOne({ book: bookId }, { $addToSet: { users: user._id } });
            }

            if (pullUsersResult?.modifiedCount === 0) {
                await Users.updateOne({ _id: user._id }, { $addToSet: { favorites: foundFavBook._id } })
            }
            
            const favBooks =await handleFavoritesBooks(user)
            
            res.send(favBooks)
            
        } else {
            
           let newFav = await Favorites.create({ book: bookId, users: [user._id] })
           
           await Users.updateOne({ _id: user._id }, { $addToSet: { favorites: newFav._id } })

            const favBooks =await handleFavoritesBooks(user)
            res.send(favBooks)
        }


    } catch (error) {
        console.log(error.message);
        res.send(error.message)
    }
}

async function handleFavoritesBooks(user) {

    let favorites = await Favorites.find({ users: { $in: [user._id] } }).select('-_id book');
    let favBooks = favorites?.map((fav) => fav.book)
    return favBooks;
}


exports.getFavorites = async (req, res) => {
    const user = req.user
    try {

        let favBooks = await handleFavoritesBooks(user)
        res.send(favBooks)

    } catch (error) {
        console.log(error.message);
        res.send(error.message)
    }

}
exports.getFavoriteBooks = async (req, res) => {
    const user = req.user
    const bookId = req.params
    try {

        let favBooks = await handleFavoritesBooks(user)
        res.send(favBooks)

    } catch (error) {
        console.log(error.message);
        res.send(error.message)
    }

}

