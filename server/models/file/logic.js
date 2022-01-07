const File = require('./index')
const User = require('../user')

logic = {
    createFile(data) {
        let file = new File(data)

        return file.save()
            .then(file => {
                return User.findById(file.owner)
                    .then(user => {
                        user.files.push(file._id)
                        return user.save()
                        .then(() => {
                            return File.findById(file._id).select("-__v").lean()
                                .then((file) =>{
                                    file.id = file._id
                                    delete file.owner
                                    return file
                                })
                        })
                    })
            })

    },

    getFilesByUserId(userId) {
        return User.findById(userId).populate("files").select("-__v").lean()
            .then((user) => {
                const files = user.files
                files.forEach(file => {
                    file.id = file._id
                    delete file._id
                    delete file.__v
                    delete file.owner
                });
                return files
            })
    }

}

module.exports = logic
