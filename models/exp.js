const mongoose = require("mongoose")
const pointsSchema = mongoose.Schema({
    userID: String,
    serverID: String,
    exp: Number
})

module.exports = mongoose.model("EXP", pointsSchema)