const express = require('express')
const layout = require('express-ejs-layouts')
const methodOverride = require('method-override')
const cookieParser = require('cookie-parser')
const db = require('./models')
const { default: axios } = require('axios')
require('dotenv').config()
const crypto = require('crypto-js')
const { response } = require('express')

const app = express()
const PORT = process.env.PORT || 3002
app.set('view engine', 'ejs')
app.use(layout)
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride("_method"))
app.use(cookieParser())
app.use(express.static(__dirname + '/public/'))


// our custom auth middleware
app.use(async (req, res, next) => {
    res.locals.myData = 'hello, fellow route'
    // if there is a cookie on the incoming request
    if (req.cookies.userId) {
        // decrypt the user id before we look up the user in the db
        const decryptedId = crypto.AES.decrypt(req.cookies.userId.toString(), process.env.ENC_SECRET) 
        const decryptedIdString = decryptedId.toString(crypto.enc.Utf8)
        // look up the user in the db
        const user = await db.user.findByPk(decryptedIdString)
        // mount the user on the res.locals
        res.locals.user = user
    } else {
        // if there is no cookie -- set the user to be null in the res.locals
        res.locals.user = null
    }
    // move on to the next route or middleware in the chain
    next()
})


// route definitions
app.get('/', (req, res) => {
    console.log('the currently logged in user is:', res.locals.user)
    res.render('home', {
        rawgInfo: []
    })
})


// Controllers
app.use('/users', require('./controllers/users'))
app.use('/results', require('./controllers/results'))
app.use('/comments', require('./controllers/comments'))

// listen on a port
app.listen(PORT, () => {
    console.log(`listening on port: ${PORT}`)
})