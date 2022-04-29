
const express = require('express')
const Datastore = require('nedb')
// this is like a import expression

// express() is a toplevel function, which means that it is not associated with any object
const app = express()
app.listen(3000, () => console.log('listen at 3000'))
// app.use(root) tells the server to use the 'public' folder in which all the files are stored
app.use(express.static('public'))
app.use(express.json({ limit: '1mb'}))
// Returns middleware that only parses JSON and only looks at requests where the Content-Type header matches the type option. 
// This parser accepts any Unicode encoding of the body and supports automatic inflation of gzip and deflate encodings.
let database = new Datastore(``)
// creating a Database file named 'database.db'

languages = []

// /api is the endpoint for a get request. 

app.get('/api', (req, res) => {
    // The 'data' represents all information from the database which is the vocabulary
    // The 'err' represents the error -> 'null'
    database.find({}, (err, data) => {
        if(err){
            res.end()
            return
        }
        // Sends a JSON response which is the data from the database
        console.log(data)
        res.json(data)
    })
})

app.post('/lang', (req, res) => {
    const data = req.body
    console.log(data[1])
    languages = []
    languages.push(data[0])
    languages.push(data[1])
    database = new Datastore(`${data[0]}-${data[1]}.db`)
    res.json({
        status: 'success',
    })
    database.loadDatabase()
})

app.get('/lang', (req, res) => {
    res.json({
        status: 'success',
        lang1: languages[0],
        lang2: languages[1]
    })
    console.log(languages)
})

// /api endpoint for the post request

app.post('/api', (req, res) => {
    // logs out what is send from website: the vocabs from index.html
    const data = req.body

    // vocabs are inserted into database
    database.insert({word: data.word, translation: data.translation, level: data.level})
    
    console.log("data " + database)
    // Sends following response
    res.json({
        status: 'success',
        word: data.word,
        translation: data.translation,
        level: data.level
    })
})

app.post('/right', (req, res) => {
    const data = req.body
    database.update({word: `${data.word}`}, {$set: {level: `${data.level}`}}, {multi: true}, function(err, numReplaced){
        console.log(database.find({word: `${data.word}`}))
    })
    
    res.json({
        status: 'success',
        word: data.word,
        translation: data.translation,
        level: data.level
    })
})

app.post('/wrong', (req, res) => {
    const data = req.body
    database.update({word: `${data.word}`}, {$set: {level: `${data.level}`}}, {multi: true}, function(err, numReplaced){
        console.log(database.find({word: `${data.word}`}))
    })
    
    res.json({
        status: 'success',
        word: data.word,
        translation: data.translation,
        level: data.level
    })
})
