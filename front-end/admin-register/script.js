const emailInput = document.getElementById("emailInput");
const emailDiv = document.getElementById("emailDiv");
const passwordInput = document.getElementById("passwordInput");
const passwordDiv = document.getElementById("passwordDiv");
const registerBtn = document.getElementById("registerBtn");
const usernameInput = document.getElementById("usernameInput");
const usernameDiv = document.getElementById("usernameDiv");
const employeeDiv = document.getElementById("employeeDiv");
const employeeInput = document.getElementById("employeeInput");
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
            "employee_number": `${employeeInput.value}`,
            "email": `${emailInput.value}`,
            "password": `${passwordInput.value}`
        })
    };
    if (emailInput.value.includes("@abc.com")) {
        fetch(`http://localhost:6000/abc/adminregister`, option)
            .then(response => {
                if (response.status == 500) {
                    return console.log('response ',response.body);
                }
                else if (response.status == 400) {
                    if (usernameInput.value == "") {
                        usernameInput.focus();
                    }
                    else if (employeeInput.value == "") {
                        employeeInput.focus();
                    }
                    else if (emailInput.value == "") {
                        emailInput.focus();
                    }
                    else if (passwordInput.value == "") {
                        passwordInput.focus();
                    }

                }
                else if (response.status == 402) {
                    passwordDiv.lastElementChild.hidden = false;
                    return passwordDiv.lastElementChild.innerHTML = "Check your informations"
                }
                else if (response.status == 401) {
                    if (emailInput.value.indexOf("@") == -1 || emailInput.value.indexOf(".") == -1) {
                        emailDiv.lastElementChild.hidden = false;
                        return emailDiv.lastElementChild.innerHTML = "your email should contain (@ and . )";
                    }
                    else {
                        passwordDiv.lastElementChild.hidden = false;
                        return passwordDiv.lastElementChild.innerHTML = "Use at least 8 characters and must be Uppercase letters and numbers"
                    }
                }
                else if (response.status == 201) {
                    return response.json()
                }
            })
            .then(result => {
                if (result.username) {
                    localStorage.token = result.token;
                    localStorage.email = result.email;
                    localStorage.username = result.username;
                    window.location.href = "../adminPage/index.html";
                }
                console.log('token ', localStorage.getItem("token"));
            })
    }
    else {
        emailDiv.lastElementChild.hidden = false;
    }
})


