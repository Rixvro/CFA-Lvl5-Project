

let profile = document.getElementById("profile")
let saved = document.getElementById("saved")
let help = document.getElementById("help")
let display = document.querySelector(".information")

const TEST = {
  name: "Homer Simpson",
  email: "homer@simpson.com",
  phone: "(203)240-4567"
}

profile.addEventListener("click", ()=> {
  display.innerHTML = `<div>
                          this is the profile click
                          <p>Name: ${TEST.name} </p> <br>
                          <p>Email: ${TEST.email} </p> <br>
                          <p>Phone: ${TEST.phone} </p> <br>
                      </div>`

})

saved.addEventListener("click", ()=> {
  display.innerHTML = `<p> this is the saved click </p>`
})

help.addEventListener("click", ()=> {
  display.innerHTML = `<p> this is the help click </p>`
})