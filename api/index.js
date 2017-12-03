const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())

const fs = require('fs')
const PORT = fs.readFileSync('./.env', { encoding: 'utf8' })

const SearchModel = require('./models/SearchModel')
const ItemModel = require('./models/ItemModel')

app.get('/', (req, res) => res.send('<h1>OK</h1>'))

app.get('/api/items', (req, res) => {

    SearchModel.fetch(req.query.q)
        .then(results => res.send(results))
        .catch(error => res.status(500).send('500 Internal Error: ' + error))
})

app.get('/api/items/:id', (req, res) => {

    ItemModel.get(req.params.id)
        .then(item => res.send(item))
        .catch(error => res.status(500).send('500 Internal Error'))
})

app.listen(+PORT)
console.log('Mercado Libre API - listening on port ' + PORT)