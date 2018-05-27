const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs')

const userSchema = new mongoose.Schema({
    local: {
        email: String,
        password: String
    },
    facebook: {
        email: String,
        password: String,
        id: String,
        token: String
    },
    google: {
        email: String,
        password: String,
        id: String,
        token: String
    }
})

userSchema.methods.generateHash = function(password) { // cifra la contraseña antes de guardarla en la bd
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null) //hasSync , toma la contraseña y le aplica un algoritmo que lo transforma en una serie de texto que no tiene sentido para una persona normal
}

userSchema.methods.validatePassword = function(password) { // comparamos la contraseña q nos da el usuario con la que esta almacenada
    return bcrypt.compareSync(password, this.local.password)
}

module.exports = mongoose.model('User', userSchema)