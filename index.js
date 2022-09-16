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

// our custom auth middleware
app.use(async (req, res, next) => {
    console.log('hello from a middleware')
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
        // gamesByGenre: []
    })
})



// GET /results/genre --display results in altered homepage
app.get('/results', async (req, res) => {
    // let gameUrl = [];
    const gamesInGenreRawgUrl = `https://api.rawg.io/api/games?key=${process.env.RAWG_Key}&genres=${req.query.search}`
    try {
        const responseRawg = await axios.get(gamesInGenreRawgUrl)
        
        res.render('home', {
            rawgInfo: responseRawg.data.results
            // gamesByGenre: sharkUrlArr
        })
    } catch(err) {
        console.log(err)
    }
})




// Controllers
app.use('/users', require('./controllers/users'))

// listen on a port
app.listen(PORT, () => {
    console.log(`listening on port: ${PORT}`)
})