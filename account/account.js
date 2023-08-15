const DOMAIN_NAME = "http://localhost:3000";

// const TEST = {
//   name: "Homer Simpson",
//   email: "homer@simpson.com",
//   phone: "(203)240-4567"
// }

let email = document.querySelector("#email")
let fName = document.querySelector("#fName")
let lName = document.querySelector("#lName")
let phone = document.querySelector("#phone")

let fNameInput = document.querySelector("#fNameInput")
let lNameInput = document.querySelector("#lNameInput")
let phoneInput = document.querySelector("#phoneInput")

let fNameBtn = document.querySelector("#fNameBtn")
let lNameBtn = document.querySelector("#lNameBtn")
let phoneBtn = document.querySelector("#phoneBtn")

// let create_account = document.querySelector("#create-account");
// let signin = document.querySelector('#signin');

window.addEventListener("load", async() => {
  if(localStorage.getItem('email') === null) {
    window.location.href = "../signin/signin.html";
  }
  let information = await fetch(DOMAIN_NAME + "/account?email=" + localStorage.getItem('email'))
  let firstName = ""
  let lastName = ""
  let phoneNum = ""

  if(information.fName) {
    firstName = information.fName
  }
  if(information.lName) {
    lastName = information.lName
  }
  if(information.phone) {
    phoneNum = information.phone
  }

  fName.innerHTML = `
      <p>First Name: ${firstName} </p> <br>
                      `
  lName.innerHTML = `
      <p>Last Name: ${lastName} </p> <br>
      `
  email.innerHTML = `
      <p>Email: ${information.email} </p> <br>
      `
  phone.innerHTML = `
      <p>Phone Number: ${phoneNum} </p> <br>
          `
})

fNameBtn.addEventListener("click", async () => {
  fName.innerHTML = `
      <p>First Name: ${fNameInput.value} </p> <br>
                      `
  await fetch(DOMAIN_NAME + "/account/fname", {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: localStorage.getItem('email'),
      fName: fNameInput.value
    })
  })
})


lNameBtn.addEventListener("click", async () => {
  lName.innerHTML = `
      <p>:Last Name: ${lNameInput.value} </p> <br>
                      `
  await fetch(DOMAIN_NAME + "/account/lname", {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: localStorage.getItem('email'),
      lName: lNameInput.value
    })
  })

})

phoneBtn.addEventListener("click", async () => {
  phone.innerHTML = `
  <p>Phone Number: ${phoneInput.value} </p> <br>
                  `
await fetch(DOMAIN_NAME + "/account/phone", {
method: "PUT",
headers: {
  Accept: "application/json",
  "Content-Type": "application/json",
},
body: JSON.stringify({
  email: localStorage.getItem('email'),
  phone: phoneInput.value
})
})
})

// create_account.addEventListener("click", () => {
//   window.location.href = "../signup/signup.html";
// })

// signin.addEventListener("click", () => {
//   window.location.href = "../signin/signin.html";
// })