const util = require('util');
const fs = require('fs');
// unique id generator
const { v4: uuidv4 } = require('uuid');
var readFileAsync = util.promisify(fs.readFile); 
var writeFileAsync = util.promisify(fs.writeFile);


class Store {
    read() {
        return readFileAsync('db/db.json', 'utf8')
    }
    write(data) {
        return writeFileAsync('db/db.json', JSON.stringify(data))
    }
    async getNotes() {
        const data = await this.read();
        let newNote;
        try {
            newNote = [].concat(JSON.parse(data));
            console.log(newNote)
        } catch (error) {
            newNote = [];
        }
        return newNote;
        
    }
    async addNote(note) {
        const { title, text } = note
        let writeNote = { title, text, id:uuidv4() }
        const data = await this.getNotes();
        const info = [...data, writeNote];
        await this.write(info);
        return writeNote;
    }
    async deleteNote(id) {
        const notes = await this.getNotes();
        const remaining = notes.filter(note => note.id !== id);
        return await this.write(remaining);
    }
}

module.exports = new Store();

