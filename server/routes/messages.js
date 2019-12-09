const express = require("express");
const router = express.Router();
const Message = require("../models/message");
const sequenceGenerator = require("../routes/sequenceGenerator");

router.get("/", (req, res) => {
  Message.find().then(data => {
    res.status(200).json(data);
  });
});

router.post("/", (req, res) => {
  let maxMessageId = sequenceGenerator.nextId("messages");
  const message = Message({
    id: maxMessageId,
    subject: req.body.subject,
    msgText: req.body.msgText,
    sender: req.body.sender
  });
  message
    .save()
    .then(() => {
      Message.find().then(data => {
        res.status(201).send(data);
      });
    })
    .catch(error => {
      res.status(500).send(error);
    });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  res.send("Got id " + id).status(200);
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  res.send("Got id " + id).status(200);
});

router.patch("/:id", (req, res) => {
  const id = req.params.id;
  res.send("Got it " + id).status(200);
});

router.delete("/:id", (req, res) => {
  let id = parseInt(req.params.id);
  Message.findOneAndDelete({ id: id }).then(data => {
    res.send(data);
  });
});

module.exports = router;
