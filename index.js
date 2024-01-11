import express from 'express'
import mongoose, { Schema } from "mongoose";
import cors from "cors"

const app = express()
const port = 3000

app.use(express.json())
app.use(cors())

const flowerSchema = new Schema({
    image: String, 
    name: String,
    price: Number,
    
  });

  const flowerModel = mongoose.model('Flower', flowerSchema);

app.get('/', async(req, res) => {
  const flower = await flowerModel.find({})
  res.send(flower)
})

app.get('/:id', async(req, res) => {
    const {id} = req.params
    const flower = await flowerModel.findById(id)
    res.send(flower)
  })
  
  app.post('/', async(req, res) => {
    const {image,name,price} = req.body
    const newFlowers = new flowerModel({image,name,price})
    await newFlowers.save()
    res.send('Ugurla yuklendi')
  })
  
  app.put('/:id', async(req, res) => {
    const {id} = req.params
    const {image,name,price} = req.body
const flower = await flowerModel.findByIdAndUpdate(id,{image,name,price})
    res.send(flower)
  })
  
  app.delete('/:id', async(req, res) => {
    const {id} = req.params
const flower = await flowerModel.findByIdAndDelete(id)
    res.send(flower)
  })

  mongoose.connect('mongodb+srv://mahammad:mahammad@cluster0.errjuf4.mongodb.net/')
  .then(() => console.log('Connected!'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})