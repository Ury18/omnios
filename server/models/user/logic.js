const User = require('./index')
const bcrypt = require('bcrypt')

logic = {
    createUser(userData) {
        let user = new User(userData)

        return bcrypt.hash(user.password, 10)
            .then((hash) => {
                user.password = hash
                return user.save()
                    .then(user => {
                        return User.findById(user._id).select('-__v').lean()
                            .then(user => {
                                user.id = user._id
                                delete user._id
                                delete user.password
                                return user
                            })
                    })
            })

    },

    authenticateUser(data) {
        const {email, password } = data

        return User.findOne({ email }).select('-__v').lean()
            .then((user) => {
                return bcrypt.compare(password, user.password)
                    .then((match) => {
                        if (match) {
                            user.id = user._id
                            delete user._id
                            delete user.password
                            return user
                        }
                        else {
                            throw Error("Contraseña incorrecta")
                        }
                    })
                    .catch(({ message }) => {
                        throw Error(message)
                    })
            })
            .catch(({ message }) => {
                if (message == "Cannot read property 'password' of null") throw Error("No se ha podido encontrar ningun usuario con el email indicado")
                throw Error(message)
            })
    }

}

module.exports = logic
