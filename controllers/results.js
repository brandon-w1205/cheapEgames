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

router.get(`/:id`, async (req, res) => {
    try {
        console.log(req.params.id)
        console.log(req.query.id)
        const gameUrl = `https://www.cheapshark.com/api/1.0/games?title=${req.params.id}&limit=1`
        const response = await axios.get(gameUrl)
        const gameRawgUrl = `https://api.rawg.io/api/games/${req.query.id}?key=${process.env.RAWG_Key}`
        const responseRawg = await axios.get(gameRawgUrl)


        res.render('results/game', {
            gameDeal: response.data,
            gameInfo: responseRawg.data
        })
            // console.log(response.data)
            // if(response.data.length === 0) {
            //     res.render('404')
            // } else {
            //     res.render('results/game', {gameData: response.data})
            // }
    } catch(err) {
        console.log(err)
        res.render('404')
    }
})

module.exports = router