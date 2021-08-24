const userInfo = document.getElementById("userInfo");
const addingDiv = document.getElementById("addingDiv");
const divContainet = document.getElementById("divContainet");
let complaintsData = null;

fetch(`http://localhost:6000/abc/customercomplaints`)
    .then(response => {
        if (response.status == 500) {
            // return window.location.href = "../login/index.html";
            console.log("error");
        }
        return response.json();
    })
    .then(result => {
        if (result.length != 0) {
            divContainer.innerHTML = "";
            complaintsData = result;
            console.log('result ', result)
            for (let index = 0; index < complaintsData.length; index++) {
                let userData = complaintsData[index];
                divContainer.insertAdjacentHTML("beforeend",`
                <div class="complaint">
                        <h3>First Name : ${userData.first_name}</h3>
                        <h3>Last Name : ${userData.last_name}</h3>
                        ${userData.status}
                        <label for="status">Status</label>
                        <select id="status" name="status">
                            ${checkStatusValue(userData)}
                        </select>
                        <h3>Country : ${userData.country}</h3>
                        <h3>Gender : ${userData.gender}</h3>
                        <h3>Category : ${userData.category}</h3>
                        <h3>Subject : ${userData.subject}</h3>
                        <h3>Message : ${userData.message}</h3>
                    </div>
                `)

            }
        }

    })

    function checkStatusValue(userData) {
        const targetStatus = userData.status;
        const statuses = [...new Set([targetStatus, "pending", "resolved", "dismissed"])];
        console.log("statuses = ", statuses);

        return statuses.reduce((result, status, index) => {
            if(index === 0) {
                result += `<option value="${status}" checked>${status}</option>`
            } else {
                result += `<option value="${status}">${status}</option>`
            }
            console.log(result)
            return result;
        }, "")
        // if (userData.status == pending){
        //     return `<option value="pending" checked>Pending</option>
        //     <option value="resolved">Resolved</option>
        //     <option value="dismissed">Dismissed</option>`;
        // }
        // else if(userData.status == resolved){
        //     return `<option value="pending">Pending</option>
        //     <option value="resolved" checked>Resolved</option>
        //     <option value="dismissed">Dismissed</option>`;
        // }
        // return `<option value="pending">Pending</option>
        // <option value="resolved">Resolved</option>
        // <option value="dismissed" checked>Dismissed</option>`;
    }
// userInfoDiv.insertAdjacentHTML("beforeend", `
//         <h3>welcome ${username}</h3>
//             <a href="#">Logout</a>`)

// if (divContainer.innerHTML == "") {
//     divContainer.insertAdjacentHTML("afterbegin", `
//         <p> seems it is empty
//         click
//         <a href="#"> here </a> if you want to add new
//         </p>
//         `);
// }


