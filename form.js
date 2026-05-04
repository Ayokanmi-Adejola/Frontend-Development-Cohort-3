const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const form = document.getElementById("form");

form.addEventListener("submit", (e) => {
  // Add your form validation and submission laogic here
  /*if (
    name.value === "" ||
    email.value === "" ||
    password.value === "" ||
    confirmPassword.value === ""
  ) { 
    alert("please fill in all required fields.");*/
  if (password.value.length < 8) {
    alert("Password must be at least 8 characters long");
  }
  if (password.value === "password") {
    alert("Password cannot be password");
  }

  e.preventDefault();
  validateform();
});
