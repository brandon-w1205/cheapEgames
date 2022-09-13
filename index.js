const express = require('express')
const layout = require('express-ejs-layouts')
const methodOverride = require('method-override')

const app = express()
const PORT = 8000
app.set('view engine', 'ejs')
app.use(layout)

app.use(express.urlencoded({ extended: false }))
app.use(methodOverride("_method"))

app.get('/', (req, res) => {
    res.render('home')
})

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`)
})