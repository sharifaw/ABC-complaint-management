const emailInput = document.getElementById("emailInput");
const emailDiv = document.getElementById("emailDiv");
const passwordInput = document.getElementById("passwordInput");
const passwordDiv = document.getElementById("passwordDiv");
const registerBtn = document.getElementById("registerBtn");
const usernameInput = document.getElementById("usernameInput");
const usernameDiv = document.getElementById("usernameDiv");
let token = null;

registerBtn.addEventListener("click", (event) => {
    event.preventDefault();
    emailDiv.lastElementChild.hidden = true;
    passwordDiv.lastElementChild.hidden = true;
    const option = {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "username": `${usernameInput.value}`,
            "email": `${emailInput.value}`,
            "password": `${passwordInput.value}`
        })
    };
    console.log("@ ", emailInput.value.indexOf("@"))
    fetch(`http://localhost:6000/abc/register`, option)
        .then(response => {
            if (response.status == 500) {
                return console.error(false)
            }
            else if (response.status == 400) {
                if (usernameInput.value == "") {
                    usernameInput.focus();
                }
                else if (emailInput.value == "") {
                    emailInput.focus();
                }
                else if (passwordInput.value == "") {
                    passwordInput.focus();
                }
            }
            else if (response.status == 402) {
                emailDiv.lastElementChild.hidden = false;
                emailDiv.lastElementChild.innerHTML = "this email is already in use";
            }
            else if (response.status == 401) {
                if (emailInput.value.indexOf("@") == -1 || emailInput.value.indexOf(".") == -1) {
                    emailDiv.lastElementChild.hidden = false;
                    emailDiv.lastElementChild.innerHTML = "your email should contain (@ and . )";
                }
                else {
                   return passwordDiv.lastElementChild.hidden = false;
                }
            }
            else if (response.status == 201) {
                return response.json()
            }
        })
        .then(result => {
            console.log(result);
            if (result) {
                localStorage.token = result.token;
                localStorage.email = result.email;
                localStorage.username = result.username;
                window.location.href = "../user-dashboard/index.html";
            }
            console.log('token ', localStorage.getItem("token"));
        })

})

