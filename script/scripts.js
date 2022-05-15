const DELETE_BTN_CLASS = 'delete-btn';
const INPUT_STRING = 'list_elements';
const STORAGE_KEY = 'contactList';

const inputForm = document.querySelector('.input_block');
const contactListEl = document.querySelector('.input_blocks');
const listTemplate = document.querySelector('.list_template').innerHTML;
const inputContactsEl = document.querySelectorAll('.input_elements');
const errorText = document.querySelector('.error');
const addBtn = document.querySelector('.input_btn');
const resultEl = document.querySelector('.input_blocks');

inputForm.addEventListener('submit', onContactFormSubmit);
contactListEl.addEventListener('click', onContactsListClick);

let contactList = [];

init();

function onContactFormSubmit(e) {
    e.preventDefault();

    const newContact = getContact();

    if (isContactElValid(newContact)) {
        addContact(newContact);
        resetForm();
        removeError();
    } else {
        showError();
    }
}

function getContact() {
    const contact = {};

    inputContactsEl.forEach((inp) => {
        contact[inp.name] = inp.value;
    });

    return contact;
}

function generateContactHtml(contact) {
    return listTemplate.replace('{{id}}', contact.id)
                        .replace('{{Name}}', contact.name)
                        .replace('{{Surname}}', contact.email)
                        .replace('{{Phone_number}}', contact.phone)
                        .replace('{{Address}}', contact.address.city + ', ' + contact.address.street);
}

function isContactElValid(contact) {
    return validateInput(contact.name)
        && validateInput(contact.email)
        && validateInput(contact.phone);
}

function validateInput(value) {
    return value !== '';
}

function addContact(contact) {
    const newContactHtml = generateContactHtml(contact);
    contactListEl.insertAdjacentHTML('beforeend', newContactHtml);

    contactList.push(contact);
    contact.id = Date.now();

    saveData();
    renderList();
}

function init() {
    // contactList = restoreData();
    fetch('https://jsonplaceholder.typicode.com/users')
        .then((res) => res.json())
        .then((data) => {
            contactList = data;
            renderList();        
    })
}

function getContactID(el) {
    return +el.closest('.' + INPUT_STRING).dataset.id;
}

function onContactsListClick(e) {
    if (e.target.classList.contains(DELETE_BTN_CLASS)) {
        contactID = getContactID(e.target);
        deleteСontact(contactID);
    }   
}

function renderList() {
    contactListEl.innerHTML = contactList.map(generateContactHtml).join('\n');
}

function resetForm() {
    inputForm.reset();
}

function showError() {
    errorText.classList.add('show');
}

function removeError() {
    errorText.classList.remove('show');
}

function deleteСontact(id) {
    contactList = contactList.filter((contact) => contact.id !== id);

    saveData();
    renderList();
}

function saveData() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(contactList));
}

// function restoreData() {
//     const data = localStorage.getItem(STORAGE_KEY);

//     return data ? JSON.parse(data) : [];
// }