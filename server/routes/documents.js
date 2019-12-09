const express = require('express');
const router = express.Router();
const Document = require('../models/document');
const sequenceGenerator = require('../routes/sequenceGenerator');

router.get('/', (req, res) => {
  Document.find()
    .then(data => {
      res.json(data);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  res.send('Got id ' + id).status(200);
});

router.post('/', (req, res) => {
  let maxDocumentId = sequenceGenerator.nextId('documents');
  const document = new Document({
    id: maxDocumentId,
    name: req.body.name,
    description: req.body.description,
    url: req.body.url,
  });
  document
    .save()
    .then(response => {
      res.status(201).json({
        response: 'Successful',
      });
    })
    .catch(error => {
      res.status(500).json({
        error,
      });
    });
});

router.put('/:id', (req, res) => {
  const id = req.params.id;
  Document.findOneAndUpdate(
    { id: id },
    {
      name: req.body.name,
      url: req.body.url,
      description: req.body.description,
    }
  )
    .then(data => {
      if (data == null) {
        res.status(500).send('Document not found');
      } else {
        Document.find().then(data => {
          res.send(data);
        });
      }
    })
    .catch(error => {
      res.status(500).send(error);
    });
});

router.patch('/:id', (req, res) => {
  const id = req.params.id;
  //deferring to put
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  Document.findOneAndDelete({ id: id })
    .then(data => {
      if (data == null) {
        res.status(500).send('Document not found');
      } else {
        Document.find().then(data => {
          res.send(data);
        });
      }
    })
    .catch(error => {
      res.status(500).send(error);
    });
});

module.exports = router;
