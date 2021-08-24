const fNameInput = document.getElementById("fname");
const lNameInput = document.getElementById("lname");
const countryInput = document.getElementById("country");
const maleInput = document.getElementById("male");
const femaleInput = document.getElementById("female");
const connectionInput = document.getElementById("connection");
const disconnectInput = document.getElementById("disconnection");
const subjectInput = document.getElementById("subject");
const messageTextAera = document.getElementById("message");
const submitBtn = document.getElementById("submit");
const token = localStorage.getItem("token");

let username = null;
let subject = null;


let user_id = null;
const option = {
    headers: { "Authorization": `Bearer ${token}` }
}
fetch(`http://localhost:6000/abc/tokenauth`, option)
    .then(response => {
        console.log('response stauts ',response.status)
        if(response.status == 401 || response.status == 500){
            return window.location.href = "../login/index.html";
        }
        return response.json()
    })
    .then(result => {
        console.log('result ',result)
        user_id = result.id;
    })

console.log('male ', maleInput.checked)
console.log('female ', femaleInput.checked)
submitBtn.addEventListener("click", event => {
    event.preventDefault();
    let gender = null;
    let category = null;
    if (maleInput.checked) {
        gender = maleInput.value;
    }
    if (femaleInput.checked) {
        gender = femaleInput.value;
    }
    if (connectionInput.checked && disconnectInput.checked) {
        category = connectionInput.value + "," + disconnectInput.value;
    }
    else if (connectionInput.checked) {
        category = connectionInput.value;
    }
    else if (disconnectInput.checked) {
        category = disconnectInput.value;
    }
    console.log('cat ', category);
    const option = {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "firstname": `${fNameInput.value}`,
            "lastname": `${lNameInput.value}`,
            "country": `${countryInput.value}`,
            "gender": `${gender}`,
            "category": `${category}`,
            "subject": `${subjectInput.value}`,
            "message": `${messageTextAera.value}`,
            "user_id": `${user_id}`,
            "status": `pending`
        })
    };
    fetch(`http://localhost:6000/abc/form`, option)
        .then(response => {
            console.log('result ');
            if (response.status == 400) {
                return document.getElementById("form").insertAdjacentHTML("beforeend", `
                <p> make sure to fill your forms </p>
                `)
            }
            if (response.status == 500) {
                return false;
            }
            return response.json()
        })
        .then(result => {
            if (result) {
                localStorage.username = result.username;
                localStorage.subject = result.subject;
                window.location.href = "../user-dashboard/index.html";
            }
        })
})