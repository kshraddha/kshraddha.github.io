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
   var userName = document.getElementById("uname");
   var password = document.getElementById("pw");
    
    if (userName.value == "") {   
        userName.style.borderColor = "#d91717";
        userName.style.boxShadow = "0 0 0 0";
        return false;
    } else if (password.value == "") {   
        password.style.borderColor = "#d91717";
        password.style.boxShadow = "0 0 0 0";   
        return false;
    } else if (userName.value in localStorage) {
        swal("username already exits");
        return false;
    } else {
        hashedPassword = CryptoJS.SHA256(password.value); 
        localStorage.setItem(userName.value, hashedPassword);
        localStorage.setItem("curr", userName.value);
        window.location = "Notes.html";
    }
  
 }

/**
 * This function is called when user clicks on sign in button.
 * It gets the username from text field and checks if it exist in local storage.
 * If exists it checks for password.
 */
function check() {
    var usernam = document.getElementById("userName");
    var password = document.getElementById("userPw");
    HPassword=CryptoJS.SHA256(password.value);
    
    if (usernam.value == '') {
        usernam.style.boxShadow = "0 0 0 0";
        usernam.style.borderColor = "#d91717";
        return false;
    } else if (password.value == '') {
        password.style.boxShadow = "0 0 0 0";
        password.style.borderColor = "#d91717";
        return false;
    } else if (usernam.value in localStorage) {
        for (var i = 0; i < localStorage.length; i++) {
            var key1=localStorage.key(i);
            if (usernam.value == key1) {
                var storedpw = localStorage.getItem(key1);   
            }
        }   
        if (storedpw == HPassword) {
            localStorage.setItem("curr", usernam.value);
            window.location = "Notes.html";
         } else {
             swal("Password Incorrect");
         }
    } else {
        swal("Username not found, please sign up");
        
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
        window.location = "Notes.html";
    } else {
        alert('You are not Signed in');
    }
}

/**
 * This function will be triggered when Notes.html is loaded
 */
function List() {
    document.getElementById('add').addEventListener('click', add);
    display();
}

/** 
 * Items are stored in local storage in a form of array 'todo'+username as the key.
 * This function returns the array.
 */
function getNotes() {
    var notes = new Array;
    var usern = getCurrUser();
    var notesArray = localStorage.getItem('todo' + usern);
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
    var usern = getCurrUser();
    var list1 = '<form>';
    for(var i=0; i<notes.length; i++) {
       var a = notes[i];
       var decrypted=CryptoJS.AES.decrypt(a, "abc").toString(CryptoJS.enc.Utf8);
       list1 += '<button id="rem" name="remove" class="' + i  + '"></button><div style="overflow: hidden"><textarea class="edit" id="' + i + '">'+ decrypted +'</textarea></div>';
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
        textAreaAdjust(edit1[j]);
        edit1[j].addEventListener('change', textAreaAdjust1);
    }
}

function textAreaAdjust(a) {
    a.style.height = a.scrollHeight + 'px';
}

function textAreaAdjust1() {
    var id1 = this.getAttribute('id');
    var a = document.getElementById(id1);
    a.style.height = a.scrollHeight + 'px';
}

function text1() {
    var a = document.getElementById('task');
    if (a.value == "") {
        a.style.height = "2.6em"; 
    }
}

/**
 * This function is called to add a new item in the array and display it.
 */
function add() {
    var task = document.getElementById('task').value;
    if (task == '') {
        alert('Please add an item');
    } else {
        var notes = getNotes();
        var usern = getCurrUser();
        var task1 = CryptoJS.AES.encrypt(task, "abc");
        var task2 = CryptoJS.AES.decrypt(task1, "abc").toString(CryptoJS.enc.Utf8);
        notes.unshift(task1.toString());
        localStorage.setItem('todo'+usern, JSON.stringify(notes));
        display();
        document.getElementById('task').value="";
        document.getElementById('task').style.height = "2.6em";
    }
    return false;
}

/**
 * User can edit by clicking on an item
 */
function edit() {
    var notes1 = getNotes();
    var usern = getCurrUser();
    var id1 = this.getAttribute('id');
    var ed1 = notes1[id1];
    var ed = document.getElementById(id1).value;
    if (ed == '') {
        alert('Items in the list cannot be empty');
        notes1[id1] = ed1.toString();
        localStorage.setItem('todo'+usern, JSON.stringify(notes1));
        display();
    } else {
        var ed2 = CryptoJS.AES.encrypt(ed, "abc");
        notes1[id1] = ed2.toString();
        localStorage.setItem('todo'+usern, JSON.stringify(notes1));
        display();
    }
    return false;
 }

/**
 * This function removes an item from the array.
 */
function remove() {
    var id = this.getAttribute('class');
    var notes = getNotes();
    var usern = getCurrUser();
    notes.splice(id, 1);
    localStorage.setItem('todo'+usern, JSON.stringify(notes));
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

