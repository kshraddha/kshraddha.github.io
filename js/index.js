window.addEventListener("load", index);
/**
 * This function is triggered when index.html is loaded
 */
function index() {
    // If user is signed in
    if ("curr" in localStorage) {
        var user = localStorage.getItem("curr");
        document.getElementById("menu1").style.display = "none";
        document.getElementById("menu2").style.display = "block";
        document.getElementById("curruser").innerHTML = user;
        document.getElementById("curruser").style.display = "inline-block";
        document.getElementById("mylist").addEventListener("click", myList);
document.getElementById("signout").addEventListener("click", signOut);
    } else {
        document.getElementById("menu1").style.display = "block";
        document.getElementById("menu2").style.display = "none";
    }
}

/**
  * If user is signed in, user can view his account by clicking on 'My List'.
  */
function myList() {
    if ('curr' in localStorage) {
        var currN = localStorage.getItem('curr');
        window.location.href = "notes.html";
    } else {
        window.location.href = "index.html";
    }
}


 /**
  * User is signed out
  */
function signOut() {
    localStorage.removeItem('curr');
}
