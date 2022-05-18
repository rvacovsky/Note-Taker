const router = require('express').Router();
const store = require('../../db/store');


router.get('/notes', (req, res) => {
  store.getNotes().then((data) => {
    return res.json(data)
  })
  .catch((err) => res.status(404).json(err))
});


router.post('/notes', (req, res) => {
  store.addNote(req.body).then((data) => {
    return res.json(data)
  })
  .catch((err) => res.status(404).json(err))
});



router.delete('/notes/:id', (req, res) => {
  store.deleteNote(req.params.id).then(() => {
    res.json({ ok: true })
  })
  .catch((err) => res.status(404).json(err))
});

module.exports  = router;