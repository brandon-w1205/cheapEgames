const express = require('express')
const layout = require('express-ejs-layouts')

const app = express()
const PORT = 8000
app.set('view engine', 'ejs')
app.use(layout)

app.get('/', (req, res) => {
    res.render('home')
})

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`)
})