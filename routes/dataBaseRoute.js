const router = require('express').Router()
const { restart } = require('nodemon')
const Database = require('../model/Database')


router.post('/', async (req, res) => {
    
    //req.body
    const {date, open, max, min, close, priceAjst, volume} = req.body

    if (!date) { 
        res.status(422).json({ error: 'error, no data'})
        return
    }
    
    const database = {date, open, max, min, close, priceAjst, volume} 

    
    try {
        //criar dados no mongoose 
        await Database.create(database)

        res.status(201).json({msg: 'Data added'})
    } catch (error) {
        res.status(500).json({error: error})
    }
})
// leitura de dados
router.get('/', async(req, res) => {
    console.log('get rodando')
    try {
        const data =  await Database.find()

        res.status(200).json(data)
        
    } catch (error) {
        res.status(500).json({error: error})
        
    }
})

router.get('/:date', async(req, res) => {
    const date = req.params.date;

    try {
        const data = await Database.findOne({ "date": date });
        if (!data) {
            res.status(404).json({ msg: 'Data not found' });
            return;
        }

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});






// update - put e patch
router.patch('/:id', async (req, res) => {
    const id = req.params.id
  
    const {date, open, max, min, close, priceAjst, volume} = req.body
    const database = {date, open, max, min, close, priceAjst, volume} 
  
    try {
      const updatedDatabase = await Database.updateMany({ _id: id }, database)
        
      if (updatedDatabase.matchedCount === 0) {
        res.status(422).json({ message: 'Id not found!' })
        return
      }
  
      res.status(200).json(database)
    } catch (error) {
      res.status(500).json({ erro: 'error' })
    }
  })

// delete 
router.delete('/:id', async (req, res) => {
    const id = req.params.id
  
    const database = await Database.findOne({ _id: id })
    if(!database) { 
        res.status(422).json({msg: 'Id not found!'})
        return
    }
    try {
        await Database.deleteOne({ _id: id })
        res.status(200).json({ message: 'Data removed' })
    } catch (error) {
        res.status(500).json({ erro: error })
        
    }
})




module.exports = router
