const STORAGE_KEY = 'usersList';

const inputForm = document.querySelector('.input_block');
const usersListEl = document.querySelector('.input_blocks');
const listTemplate = document.querySelector('.list_template').innerHTML;

inputForm.addEventListener('submit', onUserFormSubmit);

let usersList = {};

init();

function init() {
    fetch('https://jsonplaceholder.typicode.com/users')
        .then((res) => res.json())
        .then((data) => {
            usersList = data;
            renderList();        
    })
}

function onUserFormSubmit() {
    let newUser;
    addUser(newUser);
}

function generateUserHtml(user) {
    return listTemplate.replace('{{Name}}', user.name)
                        .replace('{{Surname}}', user.email)
                        .replace('{{Phone_number}}', user.phone)
                        .replace('{{Address}}', user.address.city + ', ' + user.address.street);
}

function addUser(user) {
    const newUserHtml = generateUserHtml(user);
    usersListEl.insertAdjacentHTML('beforeend', newUserHtml);

    usersList.push(user);

    renderList();
}

function renderList() {
    usersListEl.innerHTML = usersList.map(generateUserHtml).join('\n');
}