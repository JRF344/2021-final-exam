'use strict';

const tableBody = document.querySelector('#contact-list-table tbody');
let userList = [];

const listInit = async() => {
    userList = await pullContacts('/list-contacts');
    renderTable();
}

const renderTable = async() => {
    tableBody.innerHTML = '';

    userList.forEach(contact => {
        let row = tableBody.insertRow();

        row.insertCell().innerText = contact.profilePicture;
        row.insertCell().innerText = contact.fullName;
        row.insertCell().innerText = contact.email;
        row.insertCell().innerText = contact.birthDate;
        row.insertCell().innerText = contact.gender;
        row.insertCell().innerText = contact.address;
        row.insertCell().innerText = contact.contactType;

        let functionButton = row.insertCell();

        let editButton = document.createElement('button');
        editButton.type = 'button';
        editButton.innerText = "Editar";

        let deleteButton = document.createElement('button');
        deleteButton.type = 'button';
        deleteButton.innerText = "Borrar";

        deleteButton.addEventListener('click', () => {
            let _id = contact._id;
            deleteContact('/delete-contact', _id);
        })
        
        functionButton.appendChild(editButton);
        functionButton.appendChild(deleteButton);
    })
};

listInit();