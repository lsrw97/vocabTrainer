
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
const database = new Datastore('database.db')
// creating a Database file named 'database.db'
database.loadDatabase()

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
        res.json(data)
    })
})

// /api endpoint for the post request

app.post('/api', (req, res) => {
    // logs out what is send from website: the vocabs from index.html
    const data = req.body

    // vocabs are inserted into database
    database.insert({word: data.word, translation: data.translation})
    
    console.log("data " + database)
    // Sends following response
    res.json({
        status: 'success',
        word: data.word,
        translation: data.translation
    })
})

