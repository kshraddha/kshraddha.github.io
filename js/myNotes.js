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
    var username, password, blankUser, blankPass, userNone, hashedPassword;
    username = document.getElementById("username");
    password = document.getElementById("password");
    blankUser = document.getElementById('blankUser');
    blankPass = document.getElementById('blankPassword');
    userNone = document.getElementById('userNone');
    blankUser.style.display = "none";
    blankPass.style.display = "none";
    userNone.style.display = "none";
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
}

/**
 * This function is called when user clicks on sign in button.
 * It gets the username from text field and checks if it exist in local storage.
 * If exists it checks for password.
 */
function check() {
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
 * Items are stored in local storage in a form of array 'note'+username as the key.
 * This function returns the array.
 */
function getNotes() {
    var notes, curruser, notesArray;
    notes = [];
    curruser = getCurrUser();
    notesArray = localStorage.getItem('note' + curruser);
    if (notesArray !== null) {
        notes = JSON.parse(notesArray);
    }
    return notes;
}

/**
 * This function resizes the textarea as content is added.
 */
function textAreaAdjust(a) {
    a.style.height = a.scrollHeight + 'px';
}

function textAreaAdjust2() {
    var id1, a;
    if (event.keyCode == 13) {
        id1 = this.getAttribute('id');
        a = document.getElementById(id1);
        a.style.height = a.scrollHeight + 'px';
    }
}

function textAreaAdjust1() {
    var id1, a;
    id1 = this.getAttribute('id');
    a = document.getElementById(id1);
    a.style.height = a.scrollHeight + 'px';
}

function textareaTask() {
    var a = document.getElementById('task');
    if (a.value === '') {
        a.style.height = "2.6em";
    }
}

/**
 * This function is called to add a new item in the array and display it.
 */
function add() {
    var task, notes, curruser, task1, task2;
    task = document.getElementById('task').value;
    if (task === '') {
        return false;
    } else {
        notes = getNotes();
        curruser = getCurrUser();
        task1 = CryptoJS.AES.encrypt(task, "abc");
        task2 = CryptoJS.AES.decrypt(task1, "abc").toString(CryptoJS.enc.Utf8);
        notes.unshift(task1.toString());
        localStorage.setItem('note' + curruser, JSON.stringify(notes));
        display();
        document.getElementById('task').value = "";
        document.getElementById('task').style.height = "2.6em";
        document.getElementById('task').focus();
    }
    return false;
}

/**
 * This function is triggered when user is editing an item in the list
 */
function saving() {
    var id, id1;
    id = this.getAttribute('id');
    id1 = 's' + id;
    document.getElementById(id1).innerHTML = 'Saving...';
    document.getElementById(id1).style.visibility = "visible";
}

/**
 * User can edit by clicking on an item
 */
function edit() {
    var notes1, curruser, id1, ed1, ed, ed2, id2;
    notes1 = getNotes();
    curruser = getCurrUser();
    id1 = this.getAttribute('id');
    id2 = 's' + id1;
    ed1 = notes1[id1];
    ed = document.getElementById(id1).value;
    if (ed === '') {
        
        notes1[id1] = ed1.toString();
        localStorage.setItem('note' + curruser, JSON.stringify(notes1));
        display();
        document.getElementById(id2).style.visibility = "hidden";
    } else {
        ed2 = CryptoJS.AES.encrypt(ed, "abc");
        notes1[id1] = ed2.toString();
        localStorage.setItem('note' + curruser, JSON.stringify(notes1));
        display();
        document.getElementById(id2).innerHTML = 'Saved';
        document.getElementById(id2).style.visibility = "visible";
        setTimeout(function() { document.getElementById(id2).style.visibility = "hidden"; }, 3000);
    }
    
    return false;
}

/**
 * This function removes an item from the array.
 */
function remove() {
    var id, notes, curruser;
    id = this.getAttribute('class');
    notes = getNotes();
    curruser = getCurrUser();
    notes.splice(id, 1);
    localStorage.setItem('note' + curruser, JSON.stringify(notes));
    display();
    return false;
}

/** 
 * Items are displayed in the form of list.This functions gets the array from local storage
 * and displays it.
 */
function display() {
    var list1, notes, i, buttons, edit1, j, a, decrypted, save;
    notes = getNotes();
    list1 = '<form>';
    for (i = 0; i < notes.length; i++) {
        a = notes[i];
        var id2 = 's' + i;
        decrypted = CryptoJS.AES.decrypt(a, "abc").toString(CryptoJS.enc.Utf8);
        list1 += '<button id="rem" title="Delete" name="remove" class="' + i  + '"></button><div style="overflow: hidden"><label class="save" id="' + id2  + '">S</label><textarea class="edit" id="' + i + '">' + decrypted + '</textarea></div>';
    }
    list1 += '</form>';
    document.getElementById('notes').innerHTML = list1;
    buttons = document.getElementsByName('remove');
    for (i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', remove);
    }
    edit1 = document.getElementsByClassName('edit');
    for (j = 0; j < edit1.length; j++) {
        edit1[j].addEventListener('change', edit);
        edit1[j].addEventListener('input', saving);
        textAreaAdjust(edit1[j]);
        edit1[j].addEventListener('change', textAreaAdjust1);
        edit1[j].addEventListener('keypress', textAreaAdjust2);
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
  * User is signed out
  */
function signOut() {
    localStorage.removeItem('curr');
}

/**
 * Display drop down menu
 */
function menu() {
    var user, n, i, openMenu;
    document.getElementById("DropdowmMenu").classList.toggle("show");
    user = localStorage.getItem("curr");
    document.getElementById("user").innerHTML = user;
    window.onclick = function(event) {
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

function menu1() {
    var n, i, openMenu;
    document.getElementById("DropdowmMenu1").classList.toggle("show");
    window.onclick = function(event) {
        
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
