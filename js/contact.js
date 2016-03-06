window.addEventListener("load", dropdownC);
window.addEventListener("load", loadmenu);

function loadmenu() {
  if ('curr' in localStorage) {
    document.getElementById("dropmenu").addEventListener("click", menu);
  } else {
    document.getElementById("dropmenu1").addEventListener("click", menu1);
  }
}

/**
 * Display drop down menu
 */
function menu() {
  document.getElementById("contactSignout").addEventListener("click", signOut);
  var user, n, i, openMenu;
  document.getElementById("DropdowmMenu").classList.toggle("show");
  user = localStorage.getItem("curr");
  document.getElementById("user").innerHTML = user;
  window.onclick = function (event) {
    if (!event.target.matches('.dropbtn')) {
      n = document.getElementsByClassName("dropdown-content");
      for (i = 0; i < n.length; i++) {
        openMenu = n[i];
        if (openMenu.classList.contains('show')) {
          openMenu.classList.remove('show');
        }
      }
    }
  }
}


/**
 * User is signed out
 */
function signOut() {
  localStorage.removeItem('curr');
}

function menu1() {
  var n, i, openMenu;
  document.getElementById("DropdowmMenu1").classList.toggle("show");
  window.onclick = function (event) {

    if (!event.target.matches('.dropbtn')) {
      n = document.getElementsByClassName("dropdown-content");
      for (i = 0; i < n.length; i++) {
        openMenu = n[i];
        if (openMenu.classList.contains('show')) {
          openMenu.classList.remove('show');
        }
      }
    }
  }
}

function dropdownC() {
  var dropSignIn, drop;
  dropSignIn = document.getElementById("dropC");
  drop = document.getElementById("drop");
  if ('curr' in localStorage) {
    dropSignIn.style.display = "inline-block";
    drop.style.display = "none";
    return false;
  }
  dropSignIn.style.display = "none";
  drop.style.display = "inline-block";
}