const DOMAIN_NAME = "http://localhost:3000";

const TEST = {
  name: "Homer Simpson",
  email: "homer@simpson.com",
  phone: "(203)240-4567"
}

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

window.addEventListener("load", async() => {
  let information = await fetch(DOMAIN_NAME + "/account")

  fName.innerHTML = `
      <p>First Name: ${information.fName} </p> <br>
                      `
  lName.innerHTML = `
      <p>Last Name: ${information.lName} </p> <br>
      `
  email.innerHTML = `
      <p>Email: ${information.email} </p> <br>
      `
  phone.innerHTML = `
      <p>Phone Number: ${information.phone} </p> <br>
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
      fName: fNameInput.value
    })
  })
})


lNameBtn.addEventListener("click", () => {

})

phone.addEventListener("click", () => {

})