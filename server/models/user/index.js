const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const { Schema, ObjectId } = mongoose

const User = new Schema({

    email: {
        type: String,
        required: true,
        unique: true,
        index: true,
        validate: {
            validator: email => {
                return /^\w+([\.-]?\w+)+@\w+([\.:]?\w+)+(\.[a-zA-Z0-9]{2,3})+$/.test(email);
            },
            message: props => `${props.value} is not a valid email`
        }
    },

    password: {
        type: String,
        required: true
    },

    files: [{
        type: ObjectId,
        ref: "File"
    }],

})

User.plugin(uniqueValidator, { message: 'is already in use' })

module.exports = mongoose.model("User", User)
