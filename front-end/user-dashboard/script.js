const divContainer = document.getElementById('divContainer');
const userInfoDiv = document.getElementById('userInfo');
userInfoDiv.innerHTML = "";
const username = localStorage.getItem("username");
const plusBtn = document.getElementById('plusBtn');
const token = localStorage.getItem("token");
const addingDiv = document.getElementById('addingDiv');

let user_id = null;
let userInfo = null;

const getOption = {
    headers: { "authorization": `Bearer ${token}` }
}

fetch(`http://localhost:6000/abc/tokenauth`, getOption)
    .then(response => {
        // if (response.status == 401 || response.status == 500) {

        //     return window.location.href = "../login/index.html";
        // }
        return response.json();
    })
    .then(result => {
        user_id = result.id;
        console.log('result ',result)
        console.log('userId ',user_id)
        const postOption = {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                user_id: `${user_id}`
            })
        }

        fetch(`http://localhost:6000/abc/user_id`, postOption)
            .then(response => {

                if (response.status == 500) {

                    return false
                }
                console.log(user_id)
                return response.json()
            })
            .then(result => {
                console.log('result ', result);
                if (result.length != 0) {
                    divContainer.innerHTML = "";
                    userInfo = result;
                    console.log('userInfo ', userInfo);
                    for (let index = 0; index < userInfo.length; index++) {
                        
                        divContainer.insertAdjacentHTML("beforeend", `
                        <div class="complaint">
                        <h3>subject : ${userInfo[index].subject}</h3>
                        <h3>status : ${userInfo[index].status}</h3>
                        </div>
                        `)
                    }
                }
                else {
                    addingDiv.innerHTML = "";
                    divContainer.innerHTML = "";
                    divContainer.insertAdjacentHTML("beforeend", `
                    <p> seems it is empty
                    click
                    <a id="hereBtn" href="#"> here </a> if you want to add new
                    </p>
                    `)
                    
                    const hereBtn = document.getElementById('hereBtn');
                    hereBtn.addEventListener("click", (event) => {
                        fetch(`http://localhost:6000/abc/tokenauth`, getOption)
                            .then(response => {
                                if (response.status == 401 || response.status == 500) {

                                    return window.location.href = "../login/index.html";
                                }
                                return window.location.href = "../user-form/index.html";
                            })
                    })


                }
            })


        userInfoDiv.insertAdjacentHTML("beforeend", `
        <h3>welcome ${username}</h3>
            <a href="#">Logout</a>`)

        if (divContainer.innerHTML == "") {
            divContainer.insertAdjacentHTML("afterbegin", `
        <p> seems it is empty
        click
        <a href="#"> here </a> if you want to add new
        </p>
        `);
        }


    })

plusBtn.addEventListener("click", (event) => {
    fetch(`http://localhost:6000/abc/tokenauth`, getOption)
        .then(response => {
            if (response.status == 401 || response.status == 500) {

                return window.location.href = "../login/index.html";
            }
            return window.location.href = "../user-form/index.html";
        })
})
