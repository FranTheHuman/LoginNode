const express  = require('express')
const app = express()
const path = require('path')
const morgan = require('morgan')
const bodyParser = require('body-parser')

const mongoose = require('mongoose')
const passport = require('passport') // modulo que permite autenticar los modulos dentro de mi servidor. puede autenticar a traves de twitter, face, etc.
const flash = require('connect-flash') // modulo, manera de mandar mensajes que se almacenan en el navegador y se lanzan cuando el usuario haya coetido un error al loguearse o al regstrarse
const cookieParser = require('cookie-parser') // modulo, permite administrar las cookcies del navegador, una manera de guardar datos dentro del mismo navegador, sirve aca para administrar las sesiones
const session = require('express-session') // modulo, manera de manejar las sesiones a traves de las coockies 

const { url } = require('./config/database')
mongoose.connect(url, {
})



// settings
app.set('port', process.env.PORT || 3000)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))


// midlewares
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(cookieParser()) // para interpretar las cookies
app.use(session({
    secret: 'thefluxporter123',
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

// routes
const routes = require('./app/routes')(app, passport)
//app.use(routes)

const pass = require('./config/passport')(passport)

// static files 
app.use(express.static(path.join(__dirname, 'public')))

// server
app.listen(app.get('port'), () => {
    console.log('Server on port ', app.get('port'))
})