

function validateName(){
 let nameError = document.getElementById('name-error')
 const name = document.getElementById('userName').value
 
 const disallowedChars = /[.,\/#!$%\^&\*;:{}=\-_`~())"@'|\\]/;
 if(name.trim().length < 3){
    nameError.textContent = "Enter valid name"
    return false
 }else if(disallowedChars.test(name)){
    nameError.textContent = "Disallowed characters"
    return false
 }else{
     nameError.textContent =''
     return true
 }
}


function validateEmail(){
    let emailError = document.getElementById('email-error')
    const email = document.getElementById('email').value
    const mailFormat = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if(email.match(mailFormat)){
        emailError.textContent = ''
        return true
    }else{
        emailError.textContent = 'Enter valid email address'
        return false
    }
}


function validateNumber(){
    let numberError = document.getElementById('mobile-error')
    const number = document.getElementById('mobile').value
    const numberFormat = /^\d{10}$/; // Regular expression to match a 10-digit number
    if (number.match(numberFormat)) {
      numberError.textContent = ''
      return true;
    } else {
      numberError.textContent = 'Enter valid 10 digit number'
      return false;
    }
  }
  

  function validatePassword(){
    let passwordError = document.getElementById('password-error')
    const password = document.getElementById('password').value
    if(password.length <6 ){
        passwordError.textContent = 'Enter more than 5 characters'
        return false
    }else{
        passwordError.textContent = ''
        return true
    }
  }
  


