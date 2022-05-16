const fs = require('fs');
// unique id generator
const nanoid = require('nanoid');

const router = require('express').Router();


router.get('/notes', (req, res) => {
  let note = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
  res.json(note);
});


router.post('/notes', (req, res) => {
  let noteTaker = {
    title: req.body.title,
    text: req.body.text,
    id: nanoid(),
  };
  fs.readFileSync('./db/db.json', (err, data) => {
    if (err) throw err;
    let noteData = JSON.parse(data);
    noteData.push(noteTaker);
    console.log(noteData);
    fs.writeFileSync('.db/db/json', JSON.stringify(noteData));
    res.send('Note Added');
  })  
});


// router.delete('/notes/:id', (req, res) => {
  // let note = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
// })

module.exports  = router;