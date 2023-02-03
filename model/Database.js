const mongoose = require('mongoose')


const Database = mongoose.model('Database', {
    date: String,
    open: String,
    max: String,
    min: String,
    close: String,
    priceAjst: String,
    volume: String,
})

module.exports = Database
