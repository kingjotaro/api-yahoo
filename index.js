// config inicial
const express = require('express')
const app = express()
const mongoose = require('mongoose')

require('dotenv').config()
mongoose.set('strictQuery', true);


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
const user = process.env.user  
const password = process.env.password


mongoose.connect(`mongodb+srv://${user}:${password}@cluster0.qrw4pbb.mongodb.net/database?retryWrites=true&w=majority`)
    
    .then(() => {
        console.log('conected mongodb')
        const port = process.env.PORT || 3000;
        console.log("Listening on port: ", port);
        app.listen(port);

    })
    .catch((err) => console.log(err))



