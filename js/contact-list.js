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
            switch (contact.gender) {
                case 0:
                    row.insertCell().innerText = "Masculino";
                    break;
                case 1:
                    row.insertCell().innerText = "Femenino";
                    break;
                case 2:
                    row.insertCell().innerText = "Otro";
                    break;
                default:
                    break;
            }
            row.insertCell().innerText = contact.address;
            switch (contact.contactType) {
                case 0:
                    row.insertCell().innerText = "Amigos";
                    break;
                case 1:
                    row.insertCell().innerText = "Familia";
                    break;
                case 2:
                    row.insertCell().innerText = "Trabajo";
                    break;
                case 3:
                    row.insertCell().innerText = "Otro";
                    break;
            }
            let functionButton = row.insertCell();

            let editButton = document.createElement('button');
            editButton.type = 'button';
            editButton.classList.add("submit-button");
            editButton.innerText = "Editar";

            editButton.addEventListener('click', () => {
                localStorage.setItem('editContact', JSON.stringify(contact));
                window.location.href = 'edit.html';
            });

            let deleteButton = document.createElement('button');
            deleteButton.classList.add("delete-button");
            deleteButton.type = 'button';
            deleteButton.innerText = "Borrar";

            deleteButton.addEventListener('click', () => {
                let _id = contact._id;
                Swal.fire({
                    'icon': 'danger',
                    'title': "¿Está seguro que desea eliminar este contacto?",
                    'buttons': true,
                    'showDenyButton': true,
                    'showConfirmButton': true,
                    'dangerMode': true,
                }).then((result) => {
                    if (result.isConfirmed) {
                        deleteContact('/delete-contact', _id);
                    } else if (result.isDenied) {
                        Swal.fire({
                            'icon': 'info',
                            'title': "Operación cancelada.",
                        })
                    }
                })
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