const emailInput = document.getElementById("emailInput");
const passwordInput = document.getElementById("passwordInput");
const signInBtn = document.getElementById("signInBtn");
const emailDiv = document.getElementById("emailDiv");
const passwordDiv = document.getElementById("passwordDiv");
const wrongMessage = document.getElementById("wrongMessage");
let token = null;
let email = null;
let username = null

signInBtn.addEventListener("click", (event) => {
    event.preventDefault();
    wrongMessage.innerHTML = "";
    event.preventDefault();
    const option = {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "email": `${emailInput.value}`,
            "password": `${passwordInput.value}`
        })
    };
    fetch(`http://localhost:6000/abc/login`, option)
        .then(response => {
            if (response.status == 500) {
                return console.error(false)
            }
            else if (response.status == 400) {
                if (emailInput.value == "") {
                    emailInput.focus();
                }
                else if (passwordInput.value == "") {
                    passwordInput.focus();
                }
            }
            else if (response.status == 401) {
                wrongMessage.insertAdjacentHTML("beforeend", `
                <p>Your email or password is incorrect</p>
                `)
            }
            else if (response.status == 200) {
                return response.json()
            }
        })
        .then(result => {
            
            if (result) {
                if(result.email.includes("@abc.com")){
                    localStorage.token = result.token;
                    localStorage.email = result.email;
                    localStorage.username = result.username;
                    window.location.href = "../adminPage/index.html";
                }
                else{
                localStorage.token = result.token;
                localStorage.email = result.email;
                localStorage.username = result.username;
                window.location.href = "../user-dashboard/index.html";
            }
            }
            console.log('token ', localStorage.getItem("token"));
        })

})

