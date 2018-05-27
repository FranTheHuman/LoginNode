module.exports = (app, passport) => {
    
    app.get('/', (req, res) => {
        res.render('index', {
            title: "Home"
        })
    })

    app.get('/login', (req, res) => {
        res.render('login', {
            message: req.flash('loginMessage'),
            title: "Login"
        })
    })

    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/profile',
        failureRedirect: '/login',
        failureFlash: true
    }))

    app.get('/signup', (req, res) => {
        res.render('signup', {
            message: req.flash('signupMessage'),
            title: "SignUp"
        })
    })

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/profile',
        failureRedirect: '/signup',
        failureFlash: true
    }))

    app.get('/profile', isloggedIn, (req, res) => {
        res.render('profile', {
            user: req.user,
            title: "User"
        })
    })

    app.get('/logout', (req,res) => {
        req.logout()
        res.redirect('/')
    })

    function isloggedIn(req, res, next) {
        if (req.isAuthenticated()) {
            return next()
        }
        return res.redirect('/')
    }


}