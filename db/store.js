const utils = require('utils');
const fs = require('fs');
// unique id generator
const { v4: uuidv4 } = require('uuid');
var readFileAsync = util.promisify(fs.readFile); 
var writeFileAsync = util.promisify(fs.writeFile);


class Action {
    read() {
        return readFileAsync('db/db.json', 'utf8')
    }
    write(data) {
        return writeFileAsync('db/db.json', JSON.stringify(data))
    }
    getNotes() {
        return this.read().then((data) => {
            let newNote
            try {
                newNote = [].concat(JSON.parse(data))
            } catch (error) {
                newNote = [];
            }
            return newNote
        })
        
    }
    addNote(note) {
        const { title, text } = note
        let writeNote = { title, text, id:uuidv4() }
        return this.getNotes()
        .then((data) => [ ...data, writeNote])
        .then((info) => this.write(info))
        .then(() =>  writeNote)
    }
    deleteNote(id) {
        return this.getNotes()
        .then(notes => notes.filter(note => note.id !== id))
        .then(deleted => this.write(deleted));
    }
}


