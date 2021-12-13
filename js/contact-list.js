'use strict';

const tableBody = document.querySelector('#contact-list-table tbody');
const inputFilter = document.querySelector('#content-filter');
let userList = [];

const listInit = async () => {
    userList = await pullContacts('/list-contacts');
    renderTable('');
}

const renderTable = async (filter) => {
    tableBody.innerHTML = '';

    userList.forEach(contact => {
        if (contact.fullName.toLowerCase().includes(filter.toLowerCase())) {
            let row = tableBody.insertRow();

            let date = moment(contact.birthDate).format("YYYY-MM-DD");

            row.insertCell().innerText = contact.profilePicture;
            row.insertCell().innerText = contact.fullName;
            row.insertCell().innerText = contact.email;
            row.insertCell().innerText = date;
            row.insertCell().innerText = contact.gender;
            row.insertCell().innerText = contact.address;
            row.insertCell().innerText = contact.contactType;

            let functionButton = row.insertCell();

            let editButton = document.createElement('button');
            editButton.type = 'button';
            editButton.innerText = "Editar";

            editButton.addEventListener('click', () => {
                localStorage.setItem('editContact', JSON.stringify(contact));
                window.location.href = 'edit.html';
            });

            let deleteButton = document.createElement('button');
            deleteButton.type = 'button';
            deleteButton.innerText = "Borrar";

            deleteButton.addEventListener('click', () => {
                let _id = contact._id;
                deleteContact('/delete-contact', _id);
            })

            functionButton.appendChild(editButton);
            functionButton.appendChild(deleteButton);
        }
    })
};

listInit();
inputFilter.addEventListener('keyup', () => {
    renderTable(inputFilter.value);
});