const express = require("express");
const router = express.Router();
const Contact = require("../models/contact");
const sequenceGenerator = require("../routes/sequenceGenerator");
router.get("/", (req, res) => {
  Contact.find()
    .populate("group")
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  res.send("Got id " + id).status(200);
});

router.post("/", (req, res) => {
  let maxContactId = sequenceGenerator.nextId("contacts");
  let body = req.body;
  const contact = new Contact({
    id: maxContactId,
    name: body.name,
    email: body.email,
    phone: body.phone,
    imageUrl: body.imageUrl,
    group: body.group
  });
  // Map ObjectIds
  if (contact.group && contact.group.length > 0) {
    for (let groupContact of contact.group) {
      groupContact = groupContact._id;
    }
  }
  consol();
  contact.save(error => {
    if (error) {
      res.status(500).json({
        error: error
      });
    }
    // Once the data is saved return to client new list
    Contact.find().then(data => {
      res.status(201).json(data);
    });
  });
});

router.put("/:id", (req, res) => {
  try {
    let id = req.params.id;
    Contact.findOne({ id: id }).then(data => {
      if (data == null) {
        res.status(500).send("Contact not found");
      } else {
        if (data.group && data.group.length > 0) {
          for (let contactGroup of data.group) {
            contactGroup = contactGroup._id;
          }
        }
        // Contact info
        const contact = {
          name: req.body.name,
          email: req.body.email,
          phone: req.body.phone,
          imageUrl: req.body.imageUrl,
          group: data.group
        };
        Contact.updateOne({ id: id }, contact)
          .then(() => {
            Contact.find().then(data => {
              res.send(data);
            });
          })
          .catch(err => {
            res.status(500).send(err);
          });
      }
    });
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

router.patch("/:id", (req, res) => {});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  Contact.remove({ id: id }).then(data => {
    res.json(data);
  });
});

module.exports = router;
