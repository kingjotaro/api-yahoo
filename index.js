// config inicial
const express = require('express')
const app = express()
const mongoose = require('mongoose')


// leitura do json
app.use( 
    express.urlencoded({
        extended: true,
    }),
)
app.use(express.json())

// rotas da api
const dataBaseRoute = require('./routes/dataBaseRoute')

app.use('/database', dataBaseRoute)

// rota inical = endpoint
app.get('/', (req, res) => {
    //req
    res.json({msg: 'Funfou!!!'})
})
// porta e conexão com db
const user = 'alenda'
const password = 'a1b1c1d1'


mongoose.connect(`mongodb+srv://${user}:${password}@cluster0.qrw4pbb.mongodb.net/database?retryWrites=true&w=majority`)
    
    .then(() => {
        console.log('conected mongodb')
        app.listen(3000)
    })
    .catch((err) => console.log(err))



