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

// -----------------modal_valve-------------------------
var btnsopen = document.querySelectorAll('.open_modal_btn');
var modal = document.querySelector('.modal');
var iconclose = document.querySelector('.modal_header i');

function toggleModal() {
    modal.classList.toggle('hide');
}

btnsopen.forEach(function(btn) {
    btn.addEventListener('click', toggleModal);
});

iconclose.addEventListener('click', toggleModal);
modal.addEventListener('click', function(e) {
    if (e.target == e.currentTarget) {
        toggleModal();
    }
})

// -------------------------modal_fan-------------------------------------
var btnopen_fan = document.querySelector('.open_fan')
var modal_fan = document.querySelector('.modal_fan')
var iconclose_fan = document.querySelector('.modal_header_fan i')
var buttonclose_fan = document.querySelector('.modal_footer_fan button')

function toggleModalFan() {
    modal_fan.classList.toggle('hide'); // Sử dụng toggle để thêm hoặc xóa lớp hide
}

btnopen_fan.addEventListener('click', toggleModalFan)
buttonclose_fan.addEventListener('click', toggleModalFan)
iconclose_fan.addEventListener('click', toggleModalFan)
modal_fan.addEventListener('click', function(e){
    if(e.target == e.currentTarget){
        toggleModalFan()
    }
})




  //-------web to firebse------------funtion button 01----------------------------------

var btnOn01 = document.getElementById("btnOnId_01");
var btnOff01 = document.getElementById("btnOffId_01");

btnOn01.onclick = function(){
    document.getElementById("close_open_supply").src = "./img/on.png"
    
    database.ref("control").update({"supply" : 1})
}

btnOff01.onclick = function(){
    document.getElementById("close_open_supply").src = "./img/off.png" 

    database.ref("control").update({"supply" : 0})
}

// //--------web to firebse------------funtion button 02----------------------------------

var btnOn02 = document.getElementById("btnOnId_02");
var btnOff02 = document.getElementById("btnOffId_02");

btnOn02.onclick = function(){
    document.getElementById("close_open_return").src = "./img/on.png"
    
    database.ref("control").update({"return" : 1})
}

btnOff02.onclick = function(){
    document.getElementById("close_open_return").src = "./img/off.png" 

    database.ref("control").update({"return" : 0})
}

//----------web to firebse---------funtion button 03----------------------------------

var btnOn03 = document.getElementById("btnOnId_03");
var btnOff03 = document.getElementById("btnOffId_03");

btnOn03.onclick = function(){
    document.getElementById("close_open_bypass").src = "./img/on.png"
    
    database.ref("control").update({"bypass" : 1})
}

btnOff03.onclick = function(){
    document.getElementById("close_open_bypass").src = "./img/off.png" 

    database.ref("control").update({"bypass" : 0})
}

//---------firebase to web -----------------------------

// get fan from firebase (auto update when data change)
database.ref("fan/Voltage").on("value", function(snapshot){
    var Voltage = snapshot.val();
    document.getElementById("value-voltage-monitor").innerHTML = Voltage + " V";
    document.getElementById("volt").innerHTML = Voltage + " V";
})

database.ref("fan/Current").on("value", function(snapshot){
    var Current = snapshot.val();
    document.getElementById("value-current-monitor").innerHTML = Current + " A";
})

database.ref("fan/Frequency").on("value", function(snapshot){
    var Frequency = snapshot.val();
    document.getElementById("value-frequency-monitor").innerHTML = Frequency + " Hz";
})

database.ref("fan/Speed").on("value", function(snapshot){
    var Speed = snapshot.val();
    document.getElementById("value-speed-monitor").innerHTML = Speed + " rpm";
})

// get Tempsupply from firebase (auto update when data change)
database.ref("giamsat/TempSupply").on("value", function(snapshot){
    var TempSupply = snapshot.val();
    document.getElementById("nhietdosupply").innerHTML = TempSupply;
})

// get Tempreturn from firebase (auto update when data change)
database.ref("giamsat/TempReturn").on("value", function(snapshot){
    var TempReturn = snapshot.val();
    document.getElementById("nhietdoreturn").innerHTML = TempReturn;
})

// get PresSupply from firebase (auto update when data change)
database.ref("giamsat/PresSupply").on("value", function(snapshot){
    var PresSupply = snapshot.val();
    document.getElementById("apsuatsupply").innerHTML = PresSupply;
})

// get PresReturn from firebase (auto update when data change)
database.ref("giamsat/PresReturn").on("value", function(snapshot){
    var PresReturn = snapshot.val();
    document.getElementById("apsuatreturn").innerHTML = PresReturn;
})
// get SUPPLY from firebase (auto update when data change)
database.ref("control/supply").on("value", function(snapshot){
    var supply = snapshot.val();
    if(supply==1){
        document.getElementById("supply_valve").innerHTML = "ON";
        document.getElementById("close_open_supply").src = "img/on.png";
        document.getElementById("close_open_supply_ngoai").src = "img/on.png";
    }
    else{
        document.getElementById("supply_valve").innerHTML = "OFF";
        document.getElementById("close_open_supply").src = "img/off.png"; 
        document.getElementById("close_open_supply_ngoai").src = "img/off.png"; 
    } 
})

// get RETURN from firebase (auto update when data change)
database.ref("control/return").on("value", function(snapshot){
    var return1 = snapshot.val();
    if(return1==1){
        document.getElementById("return_valve").innerHTML = "ON";
        document.getElementById("close_open_return").src = "img/on.png";
        document.getElementById("close_open_return_ngoai").src = "img/on.png";
    }
    else{
        document.getElementById("return_valve").innerHTML = "OFF";
        document.getElementById("close_open_return").src = "img/off.png"; 
        document.getElementById("close_open_return_ngoai").src = "img/off.png"; 
    }
})

// get BYPASS from firebase (auto update when data change)
database.ref("control/bypass").on("value", function(snapshot){
    var bypass = snapshot.val();
    if(bypass==1){
        document.getElementById("bypass_valve").innerHTML = "ON";
        document.getElementById("close_open_bypass").src = "img/on.png";
        document.getElementById("close_open_bypass_ngoai").src = "img/on.png";
    }
    else{
        document.getElementById("bypass_valve").innerHTML = "OFF";
        document.getElementById("close_open_bypass").src = "img/off.png";
        document.getElementById("close_open_bypass_ngoai").src = "img/off.png";
    }  
})


