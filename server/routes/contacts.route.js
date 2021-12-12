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
router.get('/list-contacts', (req, res) => {
    Contact.find((error, list) => {
        if (error) {
            res.json({
                msj: 'Could not find items (CONTACT_LIST)',
                error
            });
        } else {
            res.json({
                msj: 'Users found successfully',
                list
            })
        }
    });
});

//Edit contacts
router.put('/edit-contacts', (req, res) => {});

//Delete contacts
router.delete('/delete-contact', (req, res) => {
    Contact.deleteOne({_id: req.body._id}, error => {
        if (error) {
            res.json({
                msj: 'Could not delete item (CONTACT_DELETE)',
                error
            });
        } else {
            res.json({
                msj: 'User deleted successfully',
            })
        }
    });
});

module.exports = router;