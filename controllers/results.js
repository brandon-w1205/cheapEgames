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
        console.log(req.query.name)
    const gameUrl = `https://www.cheapshark.com/api/1.0/games?title=${req.body.name}&limit=1`
    const response = await axios.get(gameUrl)
        console.log(response.data)
        res.render('results/game', {gameData: response.data})
    } catch(err) {
        console.log(err)
        res.render('404')
    }
    // if(response.data === []) {
        
    // } else {
        
    // }
})

module.exports = router