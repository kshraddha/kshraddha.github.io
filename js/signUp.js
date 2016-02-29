document.getElementById("signUp_form").addEventListener("submit", store);
document.getElementById("rgstr_btn").addEventListener("click", getCurrUser);

function store(event) {
    event.preventDefault();
    var username, password, blankUser, blankPass, userNone, hashedPassword;
    username = document.getElementById("username");
    password = document.getElementById("password");
    blankUser = document.getElementById('blankUser');
    blankPass = document.getElementById('blankPassword');
    userNone = document.getElementById('userNone');
    blankUser.style.display = "none";
    blankPass.style.display = "none";
    userNone.style.display = "none";
    if (username.value === "" && password.value === "") {
        blankUser.style.display = "block";
        blankPass.style.display = "block";
        username.focus();    
        return false;
    }
    if (username.value === "") {
        blankUser.style.display = "block";
        username.focus();
        return false;
    } else if (password.value === "") {
               blankPass.style.display = "block";
               password.focus();  
               return false;
    } else if (username.value in localStorage) {
               userNone.style.display = "block";
               username.focus(); 
               return false;
           } else {
               hashedPassword = CryptoJS.SHA256(password.value);
               localStorage.setItem(username.value, hashedPassword);
               localStorage.setItem("curr", username.value);
               window.location.href = "notes.html";
               return false; 
        }
    return false;
}


/**
 * Returns the current User
 */
function getCurrUser() {
    var user;
    user = localStorage.getItem("curr");
    return user;
}
