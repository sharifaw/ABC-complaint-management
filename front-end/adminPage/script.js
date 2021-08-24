const userInfo = document.getElementById("userInfo");
const addingDiv = document.getElementById("addingDiv");
const divContainet = document.getElementById("divContainet");
let complaintsData = null;

fetch(`http://localhost:6000/abc/customercomplaints`)
    .then(response => {
        if (response.status == 500) {
            // return window.location.href = "../login/index.html";
            
        }
        return response.json();
    })
    .then(result => {
        if (result.length != 0) {
            divContainer.innerHTML = "";
            complaintsData = result;
            for (let index = 0; index < complaintsData.length; index++) {
                let userData = complaintsData[index];
                divContainer.insertAdjacentHTML("beforeend",`
                <div id="${userData.id}" class="complaint">
                        <h3>First Name : ${userData.first_name}</h3>
                        <h3>Last Name : ${userData.last_name}</h3>
                        ${userData.status}
                        <label for="status">Status</label>
                        <select id="status${index+1}" name="status">
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
        else{
            divContainer.innerHTML = "";
            divContainer.insertAdjacentHTML("beforeend",`
            <p> seems it is empty, thats nice
            </p> 
            `)
        }

    })

    divContainer.addEventListener("change", event =>{
        // event.target.parentNode.id
        // event.target.value
        postOption={
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "id": `${event.target.parentNode.id}`,
                "status": `${event.target.value}`,
            })
        }

        fetch(`http://localhost:6000/abc/forms/statusupdate`,postOption)
        .then(response => {
            if (response.status == 500){
                return false
            }
            return response.json();
        })
        
    })

    function checkStatusValue(userData) {
        const targetStatus = userData.status;
        const statuses = [...new Set([targetStatus, "pending", "resolved", "dismissed"])];
        

        return statuses.reduce((result, status, index) => {
            if(index === 0) {
                result += `<option value="${status}" checked>${status}</option>`
            } else {
                result += `<option value="${status}">${status}</option>`
            }
            
            return result;
        }, "")
        
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


