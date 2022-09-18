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

router.get('/edit/:id', async (req, res) => {
    try {
        const comment = await db.comment.findOne({
            where: {
                id: req.params.id
            }
        })

        res.render('comments/edit.ejs', {
            comment: comment,
            rawgId: req.body.rawgId
        })
    } catch(err) {
        console.log(err)
        res.render('404')
    }
})

router.put('/:id', async (req, res) => {
    try {
        const oneComment = await db.comment.findOne({
            include: [db.user], 
            where: {
                id: req.params.id
            }
        })

        oneComment.description = req.body.description

        

        res.redirect(`/results/${oneComment.gameId}?id=${req.body.rawgId}`)
    } catch(err) {
        console.log(err)
        res.render('404')
    }  
})


module.exports = router