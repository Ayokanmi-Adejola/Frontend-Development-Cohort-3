const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const form = document.getElementById("form");

form.addEventListener("submit", (e) => {
  // Add your form validation and submission laogic here
  if (name.value === "" || 
    email.value === "" || 
    password.value === "") {
    alert("please fill in all required fields.");
    /* if (password.value.length < 8) {
      alert("Password must be at least 8 characters long");
    }
    if (password.value === "password") {
      alert("Password cannot be password");
    }

    e.preventDefault();
    validateform(); */
  }
});

const clickButton = document.querySelector("#click-btn");
const frontendParagraph = document.getElementById("frontend");

if (clickButton && frontendParagraph) {
  clickButton.addEventListener("click", () => {
    frontendParagraph.textContent = "Hello Cohort 3! The button works!";
  });
}
