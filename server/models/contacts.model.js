'use strict';

const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
    profilePicture: {
        type: String,
        required: false,
        unique: false
    },
    fullName: {
        type: String,
        required: true,
        unique: false
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    birthDate: {
        type: Date,
        required: true,
        unique: false
    },
    gender: {
        type: Number,
        required: true,
        unique: false
    },
    address: {
        type: String,
        required: true,
        unique: false
    },
    contactType: {
        type: Number,
        required: true,
        unique: false
    }
    /* 
    
    Genero:             Tipo de Contacto:
    0: Masculino        0: Amigos
    1: Femenino         1: Familia
    2: Otro             2: Trabajo
                        3: Otros

     */
});

module.exports = mongoose.model('Contact', contactSchema, 'contacts');