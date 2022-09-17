const express = require('express')
const router = express.Router()
const db = require('../models')
const { default: axios } = require('axios')

// Creates a new comment
router.post('/:id', async (req, res) => {
    try {
        await db.comment.create({
            description: req.body.description,
            gameId: req.body.gameId,
            userId: req.body.userId
        })
        res.redirect(`/results/${req.params.id}?id=${req.body.queryId}`)
    } catch(err) {
        console.log(err)
        res.render('404')
    }  
})


module.exports = router