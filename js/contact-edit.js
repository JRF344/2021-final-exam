'use strict';


const buttonSubmit = document.querySelector('#input-button-edit');

const contentFill = () => {
    if (localStorage.getItem('editContact')) {

        let contact = JSON.parse(localStorage.getItem('editContact'));

        let date = moment(contact.birthDate).format("YYYY-MM-DD");

        document.querySelector('#input-name').value = contact.fullName;
        document.querySelector('#input-email').value = contact.email;
        document.querySelector('#input-birth-date').value = date;
        switch (contact.gender) {
            case 0:
                document.querySelector('#input-gender-choice-1').checked = true
                break;
            case 1:
                document.querySelector('#input-gender-choice-2').checked = true
                break;
            case 2:
                document.querySelector('#input-gender-choice-3').checked = true
                break;
        }
        document.querySelector('#input-address').value = contact.address;
        document.querySelector('#input-contact-type').value = contact.contactType;

        const inputPicture = document.querySelector('#input-profile-picture');
        const inputName = document.querySelector('#input-name');
        const inputEmail = document.querySelector('#input-email');
        const inputBirthDate = document.querySelector('#input-birth-date');
        const inputGender = document.querySelector('input[class="radio-filter"]:checked').value;
        const inputAddress = document.querySelector('#input-address');
        const inputContactType = document.querySelector('#input-contact-type');

        const validate = () => {
            let error = false;

            if (inputName.value == '') {
                inputName.classList.add('input-error');
                error = true;
            } else {
                inputName.classList.remove('input-error');
            }

            if (inputEmail.value == '') {
                inputEmail.classList.add('input-error');
                error = true;
            } else {
                inputEmail.classList.remove('input-error');
            }

            //  Generates current date, converts it to Unix Epoch & divides it by 
            //      1000000000.
            let dateEpoch = Math.floor(new Date().valueOf() / 100000000);

            //  Takes birth date and converts it to Unix Epoch (mSeconds since Epoch), 
            //      divides it by 1000000000 to get rid of miliseconds through hours.
            //      Adds 1 to compensate for hours/seconds/miliseconds included in 
            //      original timestamp.
            let birthEpoch = Math.floor(((inputBirthDate.valueAsNumber) / 100000000) + 1);

            if (inputBirthDate.value == '') {
                inputBirthDate.classList.add('input-error');
                error = true;
            } else {
                if (birthEpoch >= dateEpoch) {
                    inputBirthDate.classList.add('input-error');
                    error = true;
                } else {
                    inputBirthDate.classList.remove('input-error');
                }

            }

            if (inputGender.value == '') {
                document.querySelector('.form-radio').classList.add('input-error');
                error = true;
            } else {
                document.querySelector('.form-radio').classList.remove('input-error');
            }

            if (inputContactType.value == '') {
                inputContactType.classList.add('input-error');
                error = true;
            } else {
                inputContactType.classList.remove('input-error');
            }

            if (error) {
                Swal.fire({
                    'icon': 'warning',
                    'title': 'Ha ocurrido un error.',
                    'text': 'Por favor verifique los campos resaltados.'
                });
            } else {
                let contact = {
                    '_id': JSON.parse(localStorage.getItem('editContact'))._id,
                    'address': inputAddress.value,
                };
                updateContact(contact, '/edit-contacts', 'list.html');
            }
        };

        buttonSubmit.addEventListener('click', validate);

    } else {
        Swal.fire({
            'icon': 'warning',
            'title': 'Ha ocurrido un error.',
            'text': 'Por favor verifique los campos resaltados.'
        }).then(() => {
            window.location.href = 'edit.html';
        });
    }
};

contentFill();