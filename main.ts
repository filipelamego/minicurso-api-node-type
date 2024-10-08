import express, { Request, Response } from 'express'
import mongoose from 'mongoose'

mongoose.connect('mongodb+srv://playground:playground@cluster-node-teste.m87tj.mongodb.net/?retryWrites=true&w=majority&appName=cluster-node-teste', {})
.then(() => console.log('MongoDB connected!'))
.catch((err) => console.error(err))

const app = express()
const port = 3000

const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    year: Number,
    canRent: {
        type: Boolean,
        default: true
    }
})

export const BookModel = mongoose.model('Book', bookSchema)

app.use(express.json())

//GET ALL
app.get('/', async (req: Request, res: Response) => {
    const books = await BookModel.find()
    res.send( { books } )
})

//GET ONE
app.get('/:id', async (req: Request, res: Response) => {
    const { id } = req.params
    console.log({id})

    const book = await BookModel.findById(id)

    res.send('Hello World!')
})

//POST
app.post('/', async (req: Request, res: Response) => {
    const { title, author } = req.body
    const year = req.body.year

    const newBook = new BookModel({ title, author, year })
    await newBook.save()

    res.status(201).send(newBook)
})

app.listen(port, () => {
    console.log(`Server running at ${port}`)
})

