const express = require('express')
const router = express.Router()
const db = require('../models')
const { default: axios } = require('axios')

// GET /results/genre --display results in altered homepage
router.get('/', async (req, res) => {
    // let gameUrl = [];
    const gamesInGenreRawgUrl = `https://api.rawg.io/api/games?key=${process.env.RAWG_Key}&genres=${req.query.search}`
    try {
        const responseRawg = await axios.get(gamesInGenreRawgUrl)

        res.render('home', {
            rawgInfo: responseRawg.data.results
        })
    } catch(err) {
        console.log(err)
    }
})

// GET /results/gameName --displays specific game
router.get(`/:id`, async (req, res) => {
    try {
        const gameUrl = `https://www.cheapshark.com/api/1.0/games?title=${req.params.id}&limit=1`
        const response = await axios.get(gameUrl)
        const gameRawgUrl = `https://api.rawg.io/api/games/${req.query.id}?key=${process.env.RAWG_Key}`
        const responseRawg = await axios.get(gameRawgUrl)

        if(response.data[0] != undefined) {
            const [game, gameCreated] = await db.game.findOrCreate({
                where: {
                    name: responseRawg.data.name
                },
                defaults: {
                    image: responseRawg.data.background_image,
                    rawg_id: responseRawg.data.id,
                    price: response.data[0].cheapest,
                    deal: response.data[0].cheapestDealID
                }
            })
        }
        
        const gameDB = await db.game.findOne({
            include: [db.comment],
            where: {
                name: responseRawg.data.name
            }
        })

        const userDB = await db.user.findAll()

        res.render('results/game', {
            gameDeal: response.data,
            gameInfo: responseRawg.data,
            user: res.locals.user,
            commentor: userDB,
            game: gameDB
        })
    } catch(err) {
        console.log(err)
        res.render('404')
    }
})

// POST /results/gameName --adds game to database to put on user profile
router.post('/:id', async (req, res) => {
    try {
        const [game, gameCreated] = await db.game.findOrCreate({
            where: {
                name: req.body.name
            },
            defaults: {
                image: req.body.image,
                price: req.body.price,
                deal: req.body.deal
            }
        })
        
        const user = await db.user.findOne({
            where: {
                id: res.locals.user.id
            }
        })

        await user.addGame(game)
        res.redirect(`/users/profile`)
    } catch(err) {
        console.log(err)
        res.render('404')
    }
})



module.exports = router