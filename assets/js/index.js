var nameInput = document.querySelector(".nameinput");
var emailInput = document.querySelector(".emailinput");
var passwordInput = document.querySelector(".passwordinput");
var submetBtn = document.querySelector(".submet-btn");
var allUsers = [];
var emailRegex = /^[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+$/;
var nameRegex = /^[A-Z][a-z]{3,15}\s?[A-Z][a-z]{3,15}$/;
var passwordRegex = /[a-zA-Z]{3,}[0-9]{3,}/;
var error = document.querySelector(".error");
var loginBox = document.querySelector(".login-box")
var box = document.querySelector(".box")
var container = document.querySelector(".container")

var loginNameInput = document.querySelector(".login-nameinput")
var loginPasswordInput = document.querySelector(".login-passwordinput")


console.log(loginNameInput, loginPasswordInput)

if (localStorage.getItem("users") !== null) {
  allUsers = JSON.parse(localStorage.getItem("users"))

}

// *functions 

function addInStorage() {

  if (validate(nameRegex, nameInput) && validate(emailRegex, emailInput) && validate(passwordRegex, passwordInput) && mailvalidate()) {
    user = {
      name: nameInput.value,
      email: emailInput.value,
      password: passwordInput.value
    }
    allUsers.push(user);
    localStorage.setItem("users", JSON.stringify(allUsers))
    loginBox.classList.remove("d-none")
    box.classList.add("d-none")

  }
  else {
    // submetBtn.previousElementSibling.classList.remove("d-none")
    var existerror = document.querySelector(".email-exists-msg");
    if (!existerror) {
      var mailexisted = document.createElement("p")
      mailexisted.textContent = "your mail is existed"
      mailexisted.classList.add("text-danger", "email-exists-msg")
      submetBtn.before(mailexisted)
    }

  }
}
function validate(regex, element) {
  if (regex.test(element.value)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    element.nextElementSibling.classList.add("d-none");
    return true;
  }
  else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
    // this line with email not work not show error
    element.nextElementSibling.classList.remove("d-none");
    console.log("error in mail ")
    return false;
  }
}
function mailvalidate() {
  for (var i = 0; i < allUsers.length; i++) {
    if (allUsers[i].email == emailInput.value) {
      // it false as when this function called in add in storage function it not work and enter in else statement in top
      return false;
    }
    // it true as when this function called in add in storage function it give us true and enter in if statement in top
  }
  return true
}
// console.log(nameInput,emailInput,passwordInput,submetBtn)
function signupPage() {
  loginBox.classList.add("d-none")
  box.classList.remove("d-none")
}
function login() {
  var isfound = false
  for (var i = 0; i < allUsers.length; i++) {
    if ((allUsers[i].name.toLowerCase() === loginNameInput.value.toLowerCase()) && (allUsers[i].password === loginPasswordInput.value)) {
      isfound = true;
      console.log("correct name ");
      loginBox.classList.add("d-none");
      var userName = document.createElement("p");
      userName.innerHTML = "Welcom Mr " + loginNameInput.value;
      userName.classList.add("position-absolute", "start-50", "top-50","translate-middle","text-info","fs-3")
      container.append(userName);
      break;
    }

  }
  if (!isfound) {
    alert("Your Data not Exist")
  }

}