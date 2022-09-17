const express = require('express')
const router = express.Router()
const db = require('../models')
const crypto = require('crypto-js')
const bcrypt = require('bcrypt')

// GET /users/new -- render a form to create a new user
router.get('/new', (req, res) => {
    res.render('users/new.ejs')
})

// POST /users -- create a new user in the db
router.post('/', async (req, res) => {
    try {
        // has the password from the req.body
        const hashedPassword = bcrypt.hashSync(req.body.password, 16)
        // create a new User
        const [newUser, created] = await db.user.findOrCreate({
            where: {
                name: req.body.name,
                email: req.body.email
            },
            defaults: {
                password: hashedPassword
            }
        })
        if (!created) {
            console.log('user exists already')
            res.redirect('/users/login?message=Please log into your account to continue')
        } else {
            // store that new users' id as a cookie in the browser
            const encryptedUserId = crypto.AES.encrypt(newUser.id.toString(), process.env.ENC_SECRET)
            const encryptedUserIdString = encryptedUserId.toString()
            // res.cookie('key', value)
            res.cookie('userId', encryptedUserIdString)
            // redirect to the profile page
            res.redirect("/users/profile")
        }
    } catch(err) {
        console.log(err)
        res.send("check duh logs brudda")
    }
})

// GET /users/login -- show a login form to the user
router.get('/login', (req, res) => {
    console.log(req.query)
    res.render('users/login', {
        // if the req.query.message exists, pass it in as the message, otherwise pass in null
        message: req.query.message ? req.query.message : null
    })
})

// POST /users/login -- accept a payload of form data and use it to log a user in
router.post('/login', async (req, res) => {
    try {
        // look up the user in the db using the supplied email
        const user = await db.user.findOne({
            where: {
                email: req.body.email
            }
        })
        const noLoginMessage = 'Incorrect username and/or password';
        // if the user is not found -- send the user back to the login form
        if (!user) {
            console.log('user not found')
            res.redirect('/users/login?message=' + noLoginMessage)
        // if the user is found but has given the wrong password -- send them back to the login form
        } else if (!bcrypt.compareSync(req.body.password, user.password)){
            console.log('wrong password')
            res.redirect('/users/login?message=' + noLoginMessage)
        // if the user is found and the supplied matches what is in the database -- log them in
        } else {
            const encryptedUserId = crypto.AES.encrypt(user.id.toString(), process.env.ENC_SECRET)
            const encryptedUserIdString = encryptedUserId.toString()
            console.log('user login successful')
            res.cookie('userId', encryptedUserIdString)
            res.redirect('/users/profile')
        }
    } catch(err) {
        console.log(err)
        res.send('check duh logs brudda')
    }
    res.send('log the user in')
})

// GET /users/logout -- log out a user by clearing the stored cookie
router.get('/logout', (req, res) => {
    // clear the cookie
    res.clearCookie('userId')
    // redirect to the homepage
    res.redirect('/')
})

router.get('/profile', async (req, res) => {
    // if the user is not logged ... we need to redirect to the login form
    if (!res.locals.user) {
        res.redirect('/users/login?message=You must authenticate before you are authorized to view this resource.')
    } else {
        // otherwise, show them their profile

        const user = await db.user.findOne({
            include: [db.game],
            where: {
                id: res.locals.user.id
            }
        })

        res.render('users/profile', {
            user: user
            // user: res.locals.user
            // game: games
        })
    }
})


module.exports = router