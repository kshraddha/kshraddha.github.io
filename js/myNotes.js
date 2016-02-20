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
    } else {
        document.getElementById("menu1").style.display = "block";
        document.getElementById("menu2").style.display = "none";
        }
}

/**
 * This function is called when user clicks on sign up button.
 * store() stores username and password in local storage as (key,value) pair.
 * Password is hashed and then stored.
 */

function store() {
    var username = document.getElementById("username");
    var password = document.getElementById("password");
    var blankUser = document.getElementById('blankUser');
    var blankPass = document.getElementById('blankPassword');
    var userNone = document.getElementById('userNone');
    blankUser.style.display = "none";
    blankPass.style.display = "none";
    userNone.style.display = "none";
    if (username.value == "") {   
        blankUser.style.display = "block";
        return false;
    } else if (password.value == "") {   
        blankPass.style.display = "block";
        return false;
    } else if (username.value in localStorage) {
        userNone.style.display = "block";
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
 * This function is called when user clicks on sign in button.
 * It gets the username from text field and checks if it exist in local storage.
 * If exists it checks for password.
 */
function check() {
    var username = document.getElementById("userName");
    var password = document.getElementById("userPw");
    HPassword=CryptoJS.SHA256(password.value);
    var blankUser = document.getElementById('blankUser');
    var blankPass = document.getElementById('blankPassword');
    var passInC = document.getElementById('passIncorrect');
    var userNone = document.getElementById('userNone');
    blankUser.style.display = "none";
    blankPass.style.display = "none";
    passInC.style.display = "none";
    userNone.style.display = "none";
    if (username.value == '') {
        blankUser.style.display = "block";
        return false;
    } else if (password.value == '') {
        blankPass.style.display = "block";
        return false;
    } else if (username.value in localStorage) {
        for (var i = 0; i < localStorage.length; i++) {
            var key1=localStorage.key(i);
            if (username.value == key1) {
                var storedpw = localStorage.getItem(key1);   
            }
        }   
        if (storedpw == HPassword) {
            localStorage.setItem("curr", username.value);
            window.location.href = "notes.html";
            return false;
         } else {
             passInC.style.display = "block";
             return false;
         }
    } else {
        userNone.style.display = "block";
        return false;
    }
    return false;
}
/**
 * Returns the current User
 */
function getCurrUser() {
    var user = localStorage.getItem("curr");
    return user;
}

 /**
  * If user is signed in, user can view his account by clicking on 'My List'.
  */
function myList() {
    if ('curr' in localStorage) {
        var currN = localStorage.getItem('curr');
        window.location.href = "notes.html";
    } else {
        alert("error");
        window.location.href = "index.html";
    } 
}

/**
 * This function will be triggered when notes.html is loaded
 */
function List() {
    document.getElementById('add').addEventListener('click', add);
    display();
}

/** 
 * Items are stored in local storage in a form of array 'note'+username as the key.
 * This function returns the array.
 */
function getNotes() {
    var notes = new Array;
    var curruser = getCurrUser();
    var notesArray = localStorage.getItem('note' + curruser);
    if (notesArray !== null) {
        notes = JSON.parse(notesArray); 
    }
    return notes;
}

/** 
 * Items are displayed in the form of list.This functions gets the array from local storage
 * and displays it.
 */
function display() {
    var notes = getNotes();
    var list1 = '<form>';
    for(var i=0; i<notes.length; i++) {
       var a = notes[i];
       var decrypted=CryptoJS.AES.decrypt(a, "abc").toString(CryptoJS.enc.Utf8);
       list1 += '<button id="rem" title="Delete" name="remove" class="' + i  + '"></button><div style="overflow: hidden"><textarea class="edit" id="' + i + '">'+ decrypted +'</textarea></div>';
    }
    list1 += '</form>';
    document.getElementById('notes').innerHTML = list1;
    var buttons = document.getElementsByName('remove');
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', remove);
    }
    var edit1 = document.getElementsByClassName('edit');
    for (var j = 0; j < edit1.length; j++) {
        edit1[j].addEventListener('change', edit);
        edit1[j].addEventListener('input', saving);
        textAreaAdjust(edit1[j]);
        edit1[j].addEventListener('change', textAreaAdjust1);
        edit1[j].addEventListener('keypress', textAreaAdjust2);
    }
}

/**
 * This function resizes the textarea as content is added.
 */
function textAreaAdjust(a) {
    a.style.height = a.scrollHeight + 'px';
}

function textAreaAdjust2() {
    if (event.keyCode == 13) {
        var id1 = this.getAttribute('id');
        var a = document.getElementById(id1);
        a.style.height = a.scrollHeight + 'px';
    }
}

function textAreaAdjust1() {
    var id1 = this.getAttribute('id');
    var a = document.getElementById(id1);
    a.style.height = a.scrollHeight + 'px';
}

function textareaTask() {
    var a = document.getElementById('task');
    if (a.value == '') {
        a.style.height = "2.6em"; 
    }
}

/**
 * This function is called to add a new item in the array and display it.
 */
function add() {
    var task = document.getElementById('task').value;
    if (task == '') {
        return false;
    } else {
        var notes = getNotes();
        var curruser = getCurrUser();
        var task1 = CryptoJS.AES.encrypt(task, "abc");
        var task2 = CryptoJS.AES.decrypt(task1, "abc").toString(CryptoJS.enc.Utf8);
        notes.unshift(task1.toString());
        localStorage.setItem('note' + curruser, JSON.stringify(notes));
        display();
        document.getElementById('task').value="";
        document.getElementById('task').style.height = "2.6em";
    }
    return false;
}

function saving() {
    document.getElementById('save').innerHTML = 'Saving...';
    document.getElementById('save').style.visibility = "visible";
}

/**
 * User can edit by clicking on an item
 */
function edit() {
    var notes1 = getNotes();
    var curruser = getCurrUser();
    var id1 = this.getAttribute('id');
    var ed1 = notes1[id1];
    var ed = document.getElementById(id1).value;
    if (ed == '') {
        
        notes1[id1] = ed1.toString();
        localStorage.setItem('note' + curruser, JSON.stringify(notes1));
        display();
        document.getElementById('save').style.visibility = "hidden";
    } else {
        var ed2 = CryptoJS.AES.encrypt(ed, "abc");
        notes1[id1] = ed2.toString();
        localStorage.setItem('note' + curruser, JSON.stringify(notes1));
        display();
        document.getElementById('save').innerHTML = 'Saved';
        document.getElementById('save').style.visibility = "visible";
        setTimeout(function(){ document.getElementById('save').style.visibility = "hidden"; }, 5000);
    }
    
    return false;
 }

/**
 * This function removes an item from the array.
 */
function remove() {
    var id = this.getAttribute('class');
    var notes = getNotes();
    var curruser = getCurrUser();
    notes.splice(id, 1);
    localStorage.setItem('note' + curruser, JSON.stringify(notes));
    display();
    return false;
}

 /**
  * User is signed out
  */
function signOut() {
    localStorage.removeItem('curr');
 }

/**
 * Display drop down menu
 */
function menu() {
    document.getElementById("DropdowmMenu").classList.toggle("show");
    var user = localStorage.getItem("curr");
    document.getElementById("user").innerHTML = user;
    window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
        var n = document.getElementsByClassName("dropdown-content");
        for (var i = 0; i < n.length; i++) {
            var openMenu = n[i];
            if (openMenu.classList.contains('show')) {
                openMenu.classList.remove('show');
            }
        }
    }
    }
}

function dropdownC() {
    var c = document.getElementById("dropC");
    if ('curr' in localStorage) {
      return false;
    }
    c.style.display = "none";
}
