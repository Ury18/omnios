const mongoose = require('mongoose')
const { Schema, ObjectId } = mongoose

const File = new Schema({

    title: {
        type: String,
        required: true
    },

    owner: {
        type: ObjectId,
        ref: 'User',
        required: true
    },

    author: {
        type: String,
    },

    topics: {
        type: String,
    }

})

module.exports = mongoose.model("File", File)
