const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
}

const password = process.argv[2]

const url =`mongodb+srv://beto:${password}@cluster0.otp1c.mongodb.net/Note-app?retryWrites=true&w=majority`

// password: RtBqdLV1TuK7OSJc

mongoose.connect(url)

const noteSchema = new mongoose.Schema({
    content: String,
    date: Date,
    important: Boolean,
})




// the collection will be the lowercased plural notes, because the Mongoose convention is to automatically name collections as the plural
// (e.g. notes) when the schema refers to them in the singular (e.g. Note)
const Note = mongoose.model('Note', noteSchema)




// const note = new Note({
//   content: 'Mongoose',
//   date: new Date(),
//   important: false,
// })

// note.save().then(result => {
//   console.log('note saved!')
//   mongoose.connection.close()   // If the connection is not closed, the program will never finish its execution.
// })

Note.find({ important: false }).then(result => {
    result.forEach(note => {
        console.log(note)
    })
    mongoose.connection.close()
})