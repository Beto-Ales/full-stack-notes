const express = require('express')
const cors = require('cors')
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const Note = require('./models/note')

const app = express()

app.use(cors())
app.use(express.static('build'))
app.use(express.json())     // json-parser



// Express error handlers are middleware that are defined with a function that accepts four parameters. Our error handler looks like this:

const errorHandler = (error, request, response, nect) => {
    
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({error: 'malformatted id'})
    } else if(error.name === 'ValidationError'){
        return response.status(400).json({error: error.message})
    }

    next(error)
}

// The error handler checks if the error is a CastError exception, in which case we know that the error was caused by an invalid object id for Mongo. 
// In this situation the error handler will send a response to the browser with the response object passed as a parameter. 
// In all other error situations, the middleware passes the error forward to the default Express error handler

// Note that the error handling middleware has to be the last loaded middleware!




const requestLogger = (request, response, next) => {
    console.log('Method', request.method)
    console.log('Path', request.path)
    console.log('Body', request.body)
    console.log('---')
    next()
}

app.use(requestLogger)



let notes = [
    {    
        id: 1,
        content: "HTML is easy",
        date: "2019-05-30T17:30:31.098Z",
        important: true  
    },
    {
        id: 2,
        content: "Browser can execute only Javascript",
        date: "2019-05-30T18:39:34.091Z",
        important: false  
    },
    {
        id: 3,
        content: "GET and POST are the most important methods of HTTP protocol",
        date: "2019-05-30T19:20:14.298Z",
        important: true  
    }
]

app.get('/', (request, response) => {
    response.send('<h1>Welcome</h1>')       // Since the parameter is a string, express automatically sets the value of the Content-Type header 
})                                          // to be text/html. The status code of the response defaults to 200.

app.get('/api/notes', (request, response) => {
    Note.find({}).then(notes => {
        response.json(notes)
    })
})

app.get('/api/notes/:id', (request, response, next) => {
    const id = request.params.id
    Note.findById(id).then(note => {
        if (note) {
            response.json(note)    
        } else {
            response.status(404).end()
        }        
    })
    .catch(error => next(error))            // The error that is passed forwards is given to the next function as a parameter
        
        
        // console.log(error)                                           move this to the middleware
        // response.status(400).send({error: 'malformatted id'})
    
})

app.delete('/api/notes/:id', (request, response, next) => {    
    Note.findByIdAndDelete(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))    
})

app.post('/api/notes', (request, response, next) => {

    const body = request.body

    if (body.content === undefined) {
        return response.status(400).json({
            error: 'Content missing'
        })
    }
    
    const note = new Note({
        content: body.content,
        important: body.important || false,
        date: new Date(),
    })
    
    note.save().then(savedNote => {
        response.json(savedNote)
    })
    .catch(error => next(error))
    
})

app.put('/api/notes/:id', (request, response, next) => {
    const body = request.body

    const note = {
        content: body.content,
        important: body.important,
    }

    Note.findByIdAndUpdate(request.params.id, note, {new: true})
        .then(updatedNote => {
            response.json(updatedNote)
        })
        .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({error: 'unknown endpoint'})
}

app.use(unknownEndpoint)

app.use(errorHandler)



const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})


// heroku
// https://young-depths-75578.herokuapp.com/api/notes