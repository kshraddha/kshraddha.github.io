document.getElementById("signIn_form").addEventListener("submit", check);
document.getElementById("signIn_btn").addEventListener("click", getCurrUser);
/**
 * This function is called when user clicks on sign in button.
 * It gets the username from text field and checks if it exist in local storage.
 * If exists it checks for password.
 */
function check(event) {
  event.preventDefault();
  var username, password, blankUser, blankPass, userNone, passInC, HPassword, i, key1, storedpw;
  username = document.getElementById("userName");
  password = document.getElementById("userPw");
  HPassword = CryptoJS.SHA256(password.value);
  blankUser = document.getElementById('blankUser');
  blankPass = document.getElementById('blankPassword');
  passInC = document.getElementById('passIncorrect');
  userNone = document.getElementById('userNone');
  blankUser.style.display = "none";
  blankPass.style.display = "none";
  passInC.style.display = "none";
  userNone.style.display = "none";
  if (username.value === '' && password.value === '') {
    blankUser.style.display = "block";
    blankPass.style.display = "block";
    username.focus();
    return false;
  }
  if (username.value === '') {
    blankUser.style.display = "block";
    username.focus();
    return false;
  } else if (password.value === '') {
    blankPass.style.display = "block";
    password.focus();
    return false;
  } else if (username.value in localStorage) {
    for (i = 0; i < localStorage.length; i++) {
      key1 = localStorage.key(i);
      if (username.value == key1) {
        storedpw = localStorage.getItem(key1);
      }
    }
    if (storedpw == HPassword) {
      localStorage.setItem("curr", username.value);
      window.location.href = "notes.html";
      return false;
    } else {
      passInC.style.display = "block";
      password.focus();
      return false;
    }
  } else {
    userNone.style.display = "block";
    username.focus();
    return false;
  }
}

/**
 * Returns the current User
 */
function getCurrUser() {
  var user;
  user = localStorage.getItem("curr");
  return user;
}