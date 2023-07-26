document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("card-form");
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      const emailInput = document.getElementById("email-input").value;
      const passwordInput = document.getElementById("password-input").value;

      console.log(emailInput);
      console.log(passwordInput);
    });
  });