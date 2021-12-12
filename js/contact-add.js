'use strict';

//Add Contact

const inputPicture = document.querySelector('#input-profile-picture');
const inputName = document.querySelector('#input-name');
const inputEmail = document.querySelector('#input-email');
const inputBirthDate = document.querySelector('#input-birth-date');
const inputGender = document.querySelector('input[class="radio-filter"]:checked').value;
const inputAddress = document.querySelector('#input-address');
const inputContactType = document.querySelector('#input-contact-type');
const buttonSubmit = document.querySelector('#input-button-add');

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
        console.log("date err");
    } else {
        if (birthEpoch >= dateEpoch) {
            inputBirthDate.classList.add('input-error');
            error = true;
            console.log("date err 2");
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
            profilePicture: inputPicture.value,
            fullName: inputName.value,
            email: inputEmail.value,
            birthDate: inputBirthDate.value,
            gender: inputGender,
            address: inputAddress.value,
            contactType: inputContactType.value
        };

        pushContact(contact, '/add-contact', 'list.html');
    }
};

buttonSubmit.addEventListener('click', validate);