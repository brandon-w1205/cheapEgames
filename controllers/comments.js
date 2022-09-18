const express = require('express')
const router = express.Router()
const db = require('../models')
const { default: axios } = require('axios')

// View all comments
router.get('/', async (req, res) => {
    try {
        const userComments = await db.comment.findAll({
            include: [db.game, db.user],
            where: {
                userId: res.locals.user.id
            }
        })

        res.render('comments/show', {
            comments: userComments,
        })
    } catch(err) {
        console.log(err)
        res.render('404')
    }  
})

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
            rawgId: req.query.rawgId,
            rawgGame: req.query.rawgGame
        })
    } catch(err) {
        console.log(err)
        res.render('404')
    }
})

// Updates comment
router.put('/:id', async (req, res) => {
    try {
        await db.comment.update({
            description: req.body.description
            }, {
            where: {
                id: req.params.id
            }
        })

        res.redirect(`/results/${req.body.rawgGame}?id=${req.body.rawgId}`)
    } catch(err) {
        console.log(err)
        res.render('404')
    }  
})

// Deletes Comment
router.delete('/:id', async (req, res) => {
    try {
        await db.comment.destroy({
            where: {
                id: req.params.id
            }
        })

        res.redirect(`/results/${req.body.rawgGame}?id=${req.body.rawgId}`)
    } catch(err) {
        console.log(err)
        res.render('404')
    }  
})


module.exports = router