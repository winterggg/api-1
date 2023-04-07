const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    }
}, { // https://mongoosejs.com/docs/guide.html#timestamps
    timestamps: true
})

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;