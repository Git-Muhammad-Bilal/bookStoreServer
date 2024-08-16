const Purchases = require("../modals/purchases");
const Users = require("../modals/user");
const moment = require('moment')





exports.createPurchases = async (req, res) => {
    let user = req.user;
    let books = req.body.books

    books.map(async (book) => {

        let exisitingPur = await Purchases.findOne({ book: book.bookId, userId: user._id })
        if (!exisitingPur) {

            let y = await Purchases.create({
                title: book.title,
                book: book.bookId,
                userId: user._id,
                quantity: book.quanity,
                price: book.price,
                image: book.imageUrl,
                time: moment().format('h:mm:ss a'),
                date: moment().format('MMMM Do YYYY')

            })
            await Users.updateOne({ _id: user._id }, { $addToSet: { purhcases: y._id } })
        }

        await Purchases.findOneAndUpdate({ book: book.bookId, userId: user._id }, { $set: { title: book.title, quantity: book.quanity, price: book.price } }, { upsert: true })


    })
    res.send('purchased successfully')
}


exports.getPurhchases = async (req, res) => {
    const user = req.user
    try {
        const purchases = await Purchases.find({ userId: user._id })
        res.send(purchases)
    } catch (error) {
        console.log('purhcases', error.message);

        res.send(error.message)
    }
    
}

exports.removePurhcaseHistory = async (req, res) => {
    const user = req.user
    const purhcaseId = req.params.purhcaseId
    try {
        await Purchases.findOneAndDelete({ userId: user._id, _id:purhcaseId })
        const updatedPurchases = await Purchases.find({ userId: user._id})
        
        res.send(updatedPurchases)
    } catch (error) {
        console.log('purhcases', error.message);
    
        res.send(error.message)
    }
    
    

}