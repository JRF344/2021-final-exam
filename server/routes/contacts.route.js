'use strict';

const express = require('express');
const router = express.Router();
const Contact = require("../models/contacts.model");

//Add contact
router.post('/add-contact', (req, res) => {
    let newContact = new Contact({
        profilePicture: req.body.profilePicture,
        fullName: req.body.fullName,
        email: req.body.email,
        birthDate: req.body.birthDate,
        gender: req.body.gender,
        address: req.body.address,
        contactType: req.body.contactType
    });

    newContact.save((error) => {
        if (error) {
            res.json({
                msj: 'An unexpected error has ocurred. (CONTACT_ADD)',
                error
            });
        } else {
            res.json ({
                msj: "Contact added successfully."
            });
            
        }
    });
});

//List contacts
router.get('/list-contacts', (req, res) => {});

//Edit contacts
router.put('/edit-contacts', (req, res) => {});

//Delete contacts
router.delete('/delete-contact', (req, res) => {});

module.exports = router;