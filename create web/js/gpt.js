//---------------------liên kết với firebase----------------------
const firebaseConfig = {
    apiKey: "AIzaSyBws1ko6w6n8uIQEJRwjLat2KQL9xmMAYM",
    authDomain: "website-to-firebase-ce93c.firebaseapp.com",
    databaseURL: "https://website-to-firebase-ce93c-default-rtdb.firebaseio.com",
    projectId: "website-to-firebase-ce93c",
    storageBucket: "website-to-firebase-ce93c.appspot.com",
    messagingSenderId: "153252597805",
    appId: "1:153252597805:web:22ec3e073e04a3972968a4",
    measurementId: "G-1P2T8YRH2K"
  };

  firebase.initializeApp(firebaseConfig);
  var database = firebase.database();

//-----------------modal-------------------------
var btnopen = document.querySelector('.open_modal_btn')
var modal = document.querySelector('.modal')
var iconclose = document.querySelector('.modal_header i')
var buttonclose = document.querySelector('.modal_footer button')

function toggleModal(){
    modal.classList.toggle('hide')
}

btnopen.addEventListener('click', toggleModal)
buttonclose.addEventListener('click', toggleModal)
iconclose.addEventListener('click', toggleModal)
modal.addEventListener('click', function(e){
    if(e.target == e.currentTarget){
        toggleModal()
    }
})

  //-------web to firebse------------funtion button 01----------------------------------

var btnOn01 = document.getElementById("btnOnId_01");
var btnOff01 = document.getElementById("btnOffId_01");

btnOn01.onclick = function(){
    document.getElementById("close_open_supply").src = "./img/on.jpg"
    
    database.ref("control").update({"supply" : 1})
}

btnOff01.onclick = function(){
    document.getElementById("close_open_supply").src = "./img/off.jpg" 

    database.ref("control").update({"supply" : 0})
}

// //--------web to firebse------------funtion button 02----------------------------------

var btnOn02 = document.getElementById("btnOnId_02");
var btnOff02 = document.getElementById("btnOffId_02");

btnOn02.onclick = function(){
    document.getElementById("close_open_return").src = "./img/on.jpg"
    
    database.ref("control").update({"return" : 1})
}

btnOff02.onclick = function(){
    document.getElementById("close_open_return").src = "./img/off.jpg" 

    database.ref("control").update({"return" : 0})
}

//----------web to firebse---------funtion button 03----------------------------------

var btnOn03 = document.getElementById("btnOnId_03");
var btnOff03 = document.getElementById("btnOffId_03");

btnOn03.onclick = function(){
    document.getElementById("close_open_bypass").src = "./img/on.jpg"
    
    database.ref("control").update({"bypass" : 1})
}

btnOff03.onclick = function(){
    document.getElementById("close_open_bypass").src = "./img/off.jpg" 

    database.ref("control").update({"bypass" : 0})
}

//---------firebase to web -----------------------------
// get SUPPLY from firebase (auto update when data change)
database.ref("control/supply").on("value", function(snapshot){
    var supply = snapshot.val();
    if(supply==1){
        document.getElementById("supply_valve").innerHTML = "ON";
        document.getElementById("close_open_supply").src = "img/on.jpg";
    }
    else{
        document.getElementById("supply_valve").innerHTML = "OFF";
        document.getElementById("close_open_supply").src = "img/off.jpg";  
    } 
})

// get RETURN from firebase (auto update when data change)
database.ref("control/return").on("value", function(snapshot){
    var return1 = snapshot.val();
    if(return1==1){
        document.getElementById("return_valve").innerHTML = "ON";
        document.getElementById("close_open_return").src = "img/on.jpg";
    }
    else{
        document.getElementById("return_valve").innerHTML = "OFF";
        document.getElementById("close_open_return").src = "img/off.jpg";  
    }
})

// get BYPASS from firebase (auto update when data change)
database.ref("control/bypass").on("value", function(snapshot){
    var bypass = snapshot.val();
    if(bypass==1){
        document.getElementById("bypass_valve").innerHTML = "ON";
        document.getElementById("close_open_bypass").src = "img/on.jpg";
    }
    else{
        document.getElementById("bypass_valve").innerHTML = "OFF";
        document.getElementById("close_open_bypass").src = "img/off.jpg";  
    }
})

// get led from firebase (auto update when data change)
database.ref("web/led").on("value", function(snapshot){
    var led = snapshot.val();
    if(led==1)
        document.getElementById("den01").src = "./img/denon.png"
    else
        document.getElementById("den01").src = "./img/denoff.png"
})
