//---------------------liên kết với firebase----------------------
const firebaseConfig = {
    apiKey: "AIzaSyB9jToRiobNMwscPhObOrKgxsnj2JTi_w4",
    authDomain: "datn-finalll.firebaseapp.com",
    databaseURL: "https://datn-finalll-default-rtdb.firebaseio.com",
    projectId: "datn-finalll",
    storageBucket: "datn-finalll.appspot.com",
    messagingSenderId: "82955896777",
    appId: "1:82955896777:web:d97e8a74cc242249fbca18",
    measurementId: "G-8WXSMX60YD"
  };


  firebase.initializeApp(firebaseConfig);
  var database = firebase.database();


// -------------------------modal_fan-------------------------------------
var btnopen_fan = document.querySelector('.open_fan')
var modal_fan = document.querySelector('.modal_fan')
var iconclose_fan = document.querySelector('.modal_header_fan i')
//var buttonclose_fan = document.querySelector('.modal_footer_fan button')

function toggleModalFan() {
    modal_fan.classList.toggle('hide'); // Sử dụng toggle để thêm hoặc xóa lớp hide
}

btnopen_fan.addEventListener('click', toggleModalFan)
//buttonclose_fan.addEventListener('click', toggleModalFan)
iconclose_fan.addEventListener('click', toggleModalFan)
modal_fan.addEventListener('click', function(e){
    if(e.target == e.currentTarget){
        toggleModalFan()
    }
})
// get SUPPLY from firebase (auto update when data change)
database.ref("Monitor system/den bao co/data").on("value", function(snapshot){
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
database.ref("Monitor system/den bao nhiet/data").on("value", function(snapshot){
    var return1 = snapshot.val();
    if(return1==1){
        document.getElementById("return_valve").innerHTML = "ON";
        document.getElementById("close_open_return").src = "img/on.png";
        // document.getElementById("close_open_return_ngoai").src = "img/on.png";
    }
    else{
        document.getElementById("return_valve").innerHTML = "OFF";
        document.getElementById("close_open_return").src = "img/off.png"; 
        // document.getElementById("close_open_return_ngoai").src = "img/off.png"; 
    }
})

// setthoigian
document.getElementById('dataForm').addEventListener('submit', function(e) {
    e.preventDefault();

    var isTimer = document.getElementById('isTimer').value;
    var option = document.getElementById('option').value;
    var timeStart = document.getElementById('timeStart').value;
    var timeEnd = document.getElementById('timeEnd').value;

    // Write data to Firebase
    database.ref('Timeset').set({
        isTimer: isTimer,
        option: option,
        timeStart: timeStart,
        timeEnd: timeEnd
    }, function(error) {
        if (error) {
            alert('Failed to save data: ' + error.message);
        } else {
            alert('Data saved successfully');
        }
    });
});


 
// get fan from firebase (auto update when data change)
database.ref("Monitor system/Output voltage/data").on("value", function(snapshot){
    var Voltage = snapshot.val();
    document.getElementById("value-voltage-monitor").innerHTML = Voltage + " V";
    document.getElementById("volt").innerHTML = Voltage + " V";
})

database.ref("Monitor system/Output current/data").on("value", function(snapshot){
    var Current = snapshot.val();
    document.getElementById("value-current-monitor").innerHTML = Current + " A";
})


var motor_gif = document.getElementById("ahu");
var hcmute1_gif = document.querySelector("img.hcmute1");

database.ref("Monitor system/Output frequecy/data").on("value", function(snapshot) {
    var Frequency = snapshot.val();
    
    if (Frequency == 0) {
        motor_gif.style.display = "none";
        hcmute1_gif.style.display = "none";
        document.getElementById("value-frequency-monitor").innerHTML = Frequency + " Hz";
    } else {
        motor_gif.style.display = "block";
        hcmute1_gif.style.display = "block";
        document.getElementById("value-frequency-monitor").innerHTML = Frequency + " Hz";
    }
});


database.ref("Monitor system/Output speed/data").on("value", function(snapshot){
    var Speed = snapshot.val();
    document.getElementById("value-speed-monitor").innerHTML = Speed + " rpm";
})
database.ref("Monitor system/Output Power/data").on("value", function(snapshot){
    var Speed = snapshot.val();
    document.getElementById("value-power-monitor").innerHTML = Speed + " Kw";
})
// get Tempsupply from firebase (auto update when data change)
database.ref("Monitor system/Room Temp/data").on("value", function(snapshot) {
    var TempSupply = snapshot.val();
    document.getElementById("nhietdosupply").innerHTML = TempSupply;

    // Kiểm tra nhiệt độ và hiển thị hoặc ẩn alert tùy chỉnh
    var tempAlert = document.getElementById("tempAlert");
    if (TempSupply > 45) {
        // Hiển thị alert nếu nhiệt độ vượt quá 45°C
        tempAlert.style.display = 'block';
        document.getElementById("tempAlertMessage").textContent = 'Cảnh báo: Nhiệt độ vượt mức an toàn!';
    } else {
        // Ẩn alert nếu nhiệt độ dưới 45°C
        tempAlert.style.display = 'none';
    }
});




database.ref("Monitor system/Co concentration/data").on("value", function(snapshot) {
    var PresSupply = snapshot.val();
    document.getElementById("apsuatsupply").innerHTML = PresSupply;

    // Kiểm tra nồng độ CO và hiển thị hoặc ẩn alert tùy chỉnh
    var coAlert = document.getElementById("coAlert");
    if (PresSupply > 20) {
        // Hiển thị alert nếu nồng độ CO vượt quá 50ppm
        coAlert.style.display = 'block';
        document.getElementById("coAlertMessage").textContent = 'Cảnh báo: Nồng độ CO vượt mức cho phép!';
    } else {
        // Ẩn alert nếu nồng độ CO dưới 50ppm
        coAlert.style.display = 'none';
    }
});




// Lắng nghe sự kiện khi người dùng nhấn nút "Lưu"
document.getElementById('write').addEventListener('click', function(){
    // Lấy giá trị từ các input
    var minVal = document.getElementById('Min_value').value; // Sửa 'Min_Value' thành 'Min_value'

    // Gửi dữ liệu mới qua Firebase
    database.ref("Control sensor").update({
        "Virtual Min AO 01/data": minVal,
        
    });


});


document.getElementById('write').addEventListener('click', function(){
    // Lấy giá trị từ các input
    var minVal = document.getElementById('Max_value').value;
    database.ref("Control sensor").update({
        "Virtual Max AO 01/data": minVal,    });

});

document.getElementById('write').addEventListener('click', function(){
            // Lấy giá trị từ các input
            var minVal = document.getElementById('Set_Point').value;
            database.ref("Control sensor").update({
                "Virtual setpoint Co/data": minVal,    });
        
 });
 document.getElementById('write').addEventListener('click', function(){
    // Lấy giá trị từ các input
    var minVal = document.getElementById('Set_pointD01').value;
    database.ref("Control sensor").update({
        "Virtual setpoint  DO1/data": minVal,    });

});
document.getElementById('write').addEventListener('click', function(){
    // Lấy giá trị từ các input
    var minVal = document.getElementById('Set_pointD02').value;
    database.ref("Control sensor").update({
        "Virtual setpoint  DO2/data": minVal,    });

});             
 document.getElementById('write').addEventListener('click', function(){
    // Lấy giá trị từ các input
    var minVal = document.getElementById('Over_Enable').value;
    database.ref("Control system").update({
        "Virtual enable DO 06/data": minVal,    });

});         
document.getElementById('write').addEventListener('click', function(){
    // Lấy giá trị từ các input
    var minVal = document.getElementById('Over_Value').value;
    database.ref("Control system").update({
        "Virtual value AO 01/data": minVal,    });

});
document.getElementById('write').addEventListener('click', function(){
    // Lấy giá trị từ các input
    var minVal = document.getElementById('ACC').value;
    database.ref("Control system").update({
        "Virtual ACC/data": minVal,    });
});
document.getElementById('write').addEventListener('click', function(){
    // Lấy giá trị từ các input
    var minVal = document.getElementById('DEC').value;
    database.ref("Control system").update({
        "Virtual DEC/data": minVal,    });
});
document.getElementById('write').addEventListener('click', function(){
    // Lấy giá trị từ các input
    var minVal = document.getElementById('RCM').value;
    database.ref("Control system").update({
        "Virtual run command/data": minVal,    });
});
//------------------realtime----------------
var time = document.getElementById("current_time");
setInterval(()=>{
  var d = new Date();
  time.innerHTML = d.toLocaleTimeString();
},1000)
// var selectedTime;
//         var resetTime;
//         var timer;
//         var resetTimer;
//         var isTimerOn = false;

//         function handleChange() {
//             var input = document.getElementById("RCM");
//             var selectedValue = parseInt(input.value);
//             console.log("Selected value:", selectedValue);
            
//             if (selectedValue === 2 || selectedValue === 4) {
//                 selectedTime = document.getElementById("timeInput").value;
//                 console.log("Selected time:", selectedTime);
//                 if (isTimerOn) {
//                     clearTimeout(timer);
//                     timer = setTimeout(function() {
//                         input.value = 1;
//                         console.log("Changing value to 1");
//                         saveValue(input.value);
//                     }, calculateMilliseconds(selectedTime));
//                 }
//                 localStorage.setItem('selectedTime', selectedTime);
//             }
//         }

//         function handleTimeChange() {
//             selectedTime = document.getElementById("timeInput").value;
//             console.log("Time changed to:", selectedTime);
//             handleChange();
//         }

//         function handleResetTimeChange() {
//             resetTime = document.getElementById("resetTimeInput").value;
//             console.log("Reset time changed to:", resetTime);
//             handleResetChange();
//         }

//         function handleResetChange() {
//             var input = document.getElementById("RCM");
//             if (resetTime && isTimerOn) {
//                 clearTimeout(resetTimer);
//                 resetTimer = setTimeout(function() {
//                     input.value = 2;
//                     console.log("Resetting value to 2");
//                     saveValue(input.value);
//                 }, calculateMilliseconds(resetTime));
//                 localStorage.setItem('resetTime', resetTime);
//             }
//         }

//         function calculateMilliseconds(time) {
//             var selectedHours = parseInt(time.split(":")[0]);
//             var selectedMinutes = parseInt(time.split(":")[1]);
//             var now = new Date();
//             var targetTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), selectedHours, selectedMinutes);
//             var currentTime = now.getTime();
//             var targetTimeMilliseconds = targetTime.getTime();
//             if (targetTimeMilliseconds < currentTime) {
//                 targetTime.setDate(targetTime.getDate() + 1);
//             }
//             var milliseconds = targetTime.getTime() - currentTime;
//             console.log("Milliseconds until change:", milliseconds);
//             return milliseconds;
//         }

//         function saveValue(value) {
//             console.log("Saving value to database:", value);
//             // Thực hiện các thao tác lưu giá trị vào cơ sở dữ liệu Firebase
//             database.ref("Control system").update({
//                 "Virtual run command/data": value
//             });
//         }

//         function toggleTimer() {
//             var onOffSwitch = document.getElementById("onOffSwitch");
//             isTimerOn = onOffSwitch.checked;
//             console.log("Timer is " + (isTimerOn ? "on" : "off"));

//             if (isTimerOn) {
//                 handleChange(); // Start the timer if it's turned on
//                 handleResetChange(); // Start the reset timer if it's turned on
//             } else {
//                 clearTimeout(timer); // Stop the timer if it's turned off
//                 clearTimeout(resetTimer); // Stop the reset timer if it's turned off
//             }
//         }

//         window.onload = function() {
//             var input = document.getElementById("RCM");
//             input.addEventListener("change", handleChange);

//             var saveButton = document.getElementById("write");
//             saveButton.addEventListener("click", function() {
//                 var input = document.getElementById("RCM");
//                 var selectedValue = parseInt(input.value);
//                 console.log("Lưu giá trị:", selectedValue);
//                 saveValue(selectedValue);
//             });

//             var timeInput = document.getElementById("timeInput");
//             timeInput.addEventListener("change", handleTimeChange);

//             var resetTimeInput = document.getElementById("resetTimeInput");
//             resetTimeInput.addEventListener("change", handleResetTimeChange);

//             var onOffSwitch = document.getElementById("onOffSwitch");
//             onOffSwitch.addEventListener("change", toggleTimer);

//             // Load saved times from localStorage and set the timers
//             var savedSelectedTime = localStorage.getItem('selectedTime');
//             var savedResetTime = localStorage.getItem('resetTime');
//             if (savedSelectedTime) {
//                 document.getElementById("timeInput").value = savedSelectedTime;
//                 selectedTime = savedSelectedTime;
//             }
//             if (savedResetTime) {
//                 document.getElementById("resetTimeInput").value = savedResetTime;
//                 resetTime = savedResetTime;
//             }
//             if (isTimerOn) {
//                 handleChange();
//                 handleResetChange();
//             }
//         };
//         function toggleTimer() {
//             var onOffSwitch = document.getElementById("onOffSwitch");
//             isTimerOn = onOffSwitch.checked;
//             console.log("Timer is " + (isTimerOn ? "on" : "off"));
        
//             if (isTimerOn) {
//                 handleChange(); // Start the timer if it's turned on
//                 handleResetChange(); // Start the reset timer if it's turned on
//             } else {
//                 clearTimeout(timer); // Stop the timer if it's turned off
//                 clearTimeout(resetTimer); // Stop the reset timer if it's turned off
//             }
        
//             // Nếu đang ở trạng thái 1 và chuyển sang trạng thái 2, sau đó chuyển lại trạng thái 1
//             if (!isTimerOn && document.getElementById("RCM").value === "1") {
//                 document.getElementById("RCM").value = "2";
//                 console.log("Changing value to 2");
//                 saveValue(2);
//             }
// }
// var selectedTime;
// var resetTime;
// var timer;
// var resetTimer;
// var isTimerOn = false;
// function handleChange() {
//     var input = document.getElementById("RCM");
//     var selectedValue = parseInt(input.value);
//     console.log("Selected value:", selectedValue);

//     if (selectedValue === 2 || selectedValue === 4) {
//         selectedTime = document.getElementById("timeInput").value;
//         console.log("Selected time:", selectedTime);
//         if (isTimerOn) {
//             clearTimeout(timer);
//             timer = setTimeout(function() {
//                 input.value = 1;
//                 console.log("Changing value to 1");
//                 saveValue(input.value);
//             }, calculateMilliseconds(selectedTime));
//         }
//         localStorage.setItem('selectedTime', selectedTime);
//     }
// }

// function handleTimeChange() {
//     selectedTime = document.getElementById("timeInput").value;
//     console.log("Time changed to:", selectedTime);
//     handleChange();
// }

// function handleResetTimeChange() {
//     resetTime = document.getElementById("resetTimeInput").value;
//     console.log("Reset time changed to:", resetTime);
//     handleResetChange();
// }

// function handleResetChange() {
//     var input = document.getElementById("RCM");
//     if (resetTime && isTimerOn) {
//         clearTimeout(resetTimer);
//         resetTimer = setTimeout(function() {
//             input.value = 2;
//             console.log("Resetting value to 2");
//             saveValue(input.value);
//         }, calculateMilliseconds(resetTime));
//         localStorage.setItem('resetTime', resetTime);
//     }
// }

// function calculateMilliseconds(time) {
//     var selectedHours = parseInt(time.split(":")[0]);
//     var selectedMinutes = parseInt(time.split(":")[1]);
//     var now = new Date();
//     var targetTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), selectedHours, selectedMinutes);
//     var currentTime = now.getTime();
//     var targetTimeMilliseconds = targetTime.getTime();
//     if (targetTimeMilliseconds < currentTime) {
//         targetTime.setDate(targetTime.getDate() + 1);
//     }
//     var milliseconds = targetTime.getTime() - currentTime;
//     console.log("Milliseconds until change:", milliseconds);
//     return milliseconds;
// }

// function saveValue(value) {
//     console.log("Saving value to database:", value);
//     database.ref("Control system").update({
//         "Virtual run command/data": value
//     });
// }

// function toggleTimer() {
//     var onOffSwitch = document.getElementById("onOffSwitch");
//     isTimerOn = onOffSwitch.checked;
//     console.log("Timer is " + (isTimerOn ? "on" : "off"));

//     if (isTimerOn) {
//         handleChange(); // Start the timer if it's turned on
//         handleResetChange(); // Start the reset timer if it's turned on
//     } else {
//         clearTimeout(timer); // Stop the timer if it's turned off
//         clearTimeout(resetTimer); // Stop the reset timer if it's turned off
//     }

//     if (!isTimerOn && document.getElementById("RCM").value === "1") {
//         document.getElementById("RCM").value = "2";
//         console.log("Changing value to 2");
//         saveValue(2);
//     }
// }

// window.onload = function() {
//     var input = document.getElementById("RCM");
//     input.addEventListener("change", handleChange);

//     var saveButton = document.getElementById("write");
//     saveButton.addEventListener("click", function() {
//         var input = document.getElementById("RCM");
//         var selectedValue = parseInt(input.value);
//         console.log("Lưu giá trị:", selectedValue);
//         saveValue(selectedValue);
//     });

//     var timeInput = document.getElementById("timeInput");
//     timeInput.addEventListener("change", handleTimeChange);

//     var resetTimeInput = document.getElementById("resetTimeInput");
//     resetTimeInput.addEventListener("change", handleResetTimeChange);

//     var onOffSwitch = document.getElementById("onOffSwitch");
//     onOffSwitch.addEventListener("change", toggleTimer);

//     // Load saved times from localStorage and set the timers
//     var savedSelectedTime = localStorage.getItem('selectedTime');
//     var savedResetTime = localStorage.getItem('resetTime');
//     if (savedSelectedTime) {
//         document.getElementById("timeInput").value = savedSelectedTime;
//         selectedTime = savedSelectedTime;
//     }
//     if (savedResetTime) {
//         document.getElementById("resetTimeInput").value = savedResetTime;
//         resetTime = savedResetTime;
//     }
//     if (isTimerOn) {
//         handleChange();
//         handleResetChange();
//     }
// };

database.ref("Control system/Virtual run command/data").on("value", function(snapshot){
    var chaythuan = snapshot.val();
    if(chaythuan==2){
        // document.getElementById("chaythuan").innerHTML = "ON";
        document.getElementById("dung").src = "img/on.png";
        // document.getElementById("close_open_return_ngoai").src = "img/on.png";
    }
    else{
        // document.getElementById("chaythuan").innerHTML = "OFF";
        document.getElementById("dung").src = "img/off.png"; 
        // document.getElementById("close_open_return_ngoai").src = "img/off.png"; 
    }
})
database.ref("Monitor system/Output frequecy/data").on("value", function(snapshot){
    var trangthai = snapshot.val();
    if(trangthai==0){
        document.getElementById("trangthai").innerHTML = "OFF";
        document.getElementById("stop").src = "img/off.png";
        // document.getElementById("close_open_return_ngoai").src = "img/on.png";
    }
    else{
        document.getElementById("trangthai").innerHTML = "ON";
        document.getElementById("stop").src = "img/on.png"; 
        // document.getElementById("close_open_return_ngoai").src = "img/off.png"; 
    }
})

var denon = document.querySelector(".controldenbaoon")
var denoff = document.querySelector(".controldenbaooff")
database.ref("Monitor system/den bao nut nhan/data").on("value", function(snapshot){
    var chay = snapshot.val();
    if(chay==1){
        denon.style.display = "block"
        denoff.style.display = "none"
        // document.getElementById("dungs").src = "hinh/nbo-ezgif.com-resize (1).gif";
        // document.getElementById("close_open_return_ngoai").src = "img/on.png";
    }
    else{
        denon.style.display = "none"
        denoff.style.display = "block"
        // document.getElementById("dungs").src = "hinh/alram-removebg-preview.png"; 
        // document.getElementById("close_open_return_ngoai").src = "img/off.png"; 
    }
})
database.ref("Control system/Virtual enable DO 06/data").on("value", function(snapshot){
    var chay = snapshot.val();
    if(chay==1){
        document.getElementById("chay").innerHTML = "";
        document.getElementById("manualid").src = "img/on.png";
        // document.getElementById("close_open_return_ngoai").src = "img/on.png";
    }
    else{
        document.getElementById("chay").innerHTML = "";
        document.getElementById("manualid").src = "img/off.png"; 
        // document.getElementById("close_open_return_ngoai").src = "img/off.png"; 
    }
})
database.ref("Control system/Virtual enable DO 06/data").on("value", function(snapshot){
    var chay = snapshot.val();
    if(chay==0){
        document.getElementById("chays").innerHTML = "";
        document.getElementById("autolid").src = "img/on.png";
        // document.getElementById("close_open_return_ngoai").src = "img/on.png";
    }
    else{
        document.getElementById("chay").innerHTML = "";
        document.getElementById("autolid").src = "img/off.png"; 
        // document.getElementById("close_open_return_ngoai").src = "img/off.png"; 
    }
})
//--


document.getElementById('write').addEventListener('click', function(){
    // Lấy giá trị từ các input
    var minVal = document.getElementById('LOCK').value;
    database.ref("Control system").update({
        "Virtual parameter lock/data": minVal,    });
});
document.getElementById('write').addEventListener('click', function(){
    // Lấy giá trị từ các input
    var minVal = document.getElementById('P').value;
    database.ref("Control system").update({
        "Virtual P/data": minVal,    });
});
document.getElementById('write').addEventListener('click', function(){
    // Lấy giá trị từ các input
    var minVal = document.getElementById('I').value;
    database.ref("Control system").update({
        "Virtual value I/data": minVal,    });
});
document.getElementById('write').addEventListener('click', function(){
    // Lấy giá trị từ các input
    var minVal = document.getElementById('D').value;
    database.ref("Control system").update({
        "Virtual value D/data": minVal,    });
});



// Chọn button có class "luu"
const luuButton = document.querySelector('.luu button');
const alert = document.querySelector('.alert');

// Ẩn alert ban đầu
alert.style.right = '-500px';

// Thêm sự kiện click cho button "luu"
luuButton.addEventListener('click', () => {
    // Nếu alert đang ẩn, hiển thị alert
    if (alert.style.right === '-500px') {
        alert.style.right = '20px';
        let length = 70;
        let process = document.querySelector('.process');
        const run = setInterval(() => {
            process.style.height = length + 'px';
            length -= 5;
            if (length <= -10) {
                clearInterval(run);
                // Sau khi hiển thị trong một khoảng thời gian, ẩn alert
                setTimeout(() => {
                    alert.style.right = '-500px';
                }, 1000); // Đặt thời gian ẩn alert ở đây, ví dụ sau 2 giây (2000 miligiây)
            }
        }, 100);
    }
});



// Xử lý alert1
const alertDiv1 = document.querySelector('.alert1');
const greenIcon = alertDiv1.querySelector('.green-icon');
const redIcon = alertDiv1.querySelector('.red-icon');

// Ẩn alert ban đầu
alertDiv1.style.right = '-500px';

// Thêm sự kiện change cho menu dropdown
document.getElementById('RCM').addEventListener('change', function() {
    const selectedValue = this.value;
    let message = '';

    // Xác định thông báo và icon tương ứng với giá trị được chọn
    switch (selectedValue) {
        case '2':
            message = 'Chế độ Forward ';
            greenIcon.style.display = 'block';
            redIcon.style.display = 'none';
            break;
        case '4':
            message = 'Chế độ Reverse ';
            greenIcon.style.display = 'block';
            redIcon.style.display = 'none';
            break;
        case '1':
            message = 'Chế độ dừng';
            greenIcon.style.display = 'none';
            redIcon.style.display = 'block';
            break;
        default:
            message = 'Lựa chọn không hợp lệ.';
            greenIcon.style.display = 'none';
            redIcon.style.display = 'none';
    }

    // Hiển thị thông báo và tiến trình
    if (alertDiv1.style.right === '-500px') {
        alertDiv1.style.right = '20px';
        let length = 70;
        const process1 = alertDiv1.querySelector('.process'); // Chỉ lấy phần tử .process trong alert1
        const run1 = setInterval(() => {
            process1.style.height = length + 'px';
            length -= 5;
            if (length <= -10) {
                clearInterval(run1);
                // Ẩn alert sau một khoảng thời gian
                setTimeout(() => {
                    alertDiv1.style.right = '-500px';
                }, 500); // Đặt thời gian ẩn alert ở đây, ví dụ sau 2 giây (2000 miligiây)
            }
        }, 80);
    }
    // Hiển thị thông báo
    alertDiv1.querySelector('span').textContent = message;
});

// Xử lý alert2
const alertDiv2 = document.querySelector('.alert2');
const lockIcon = alertDiv2.querySelector('.lock-icon');
const unlockIcon = alertDiv2.querySelector('.unlock-icon');

// Ẩn alert ban đầu
alertDiv2.style.right = '-500px';

// Thêm sự kiện change cho menu dropdown
document.getElementById('LOCK').addEventListener('change', function() {
    const selectedValue2 = this.value;
    let message = '';

    // Xác định thông báo và icon tương ứng với giá trị được chọn
    switch (selectedValue2) {
        case '0':
            message = 'Khóa';
            lockIcon.style.display = 'block';
            unlockIcon.style.display = 'none';
            break;
        case '1':
            message = 'Mở Khóa';
            lockIcon.style.display = 'none';
            unlockIcon.style.display = 'block';
            break;
    }

    // Hiển thị thông báo và tiến trình
    if (alertDiv2.style.right === '-500px') {
        alertDiv2.style.right = '20px';
        let length = 70;
        const process2 = alertDiv2.querySelector('.process'); // Chỉ lấy phần tử .process trong alert2
        const run2 = setInterval(() => {
            process2.style.height = length + 'px';
            length -= 5;
            if (length <= -10) {
                clearInterval(run2);
                // Ẩn alert sau một khoảng thời gian
                setTimeout(() => {
                    alertDiv2.style.right = '-500px';
                }, 500); // Đặt thời gian ẩn alert ở đây, ví dụ sau 2 giây (2000 miligiây)
            }
        }, 80);
    }
    // Hiển thị thông báo
    alertDiv2.querySelector('span').textContent = message;
});


const alertDiv3 = document.querySelector('.alert3');
        alertDiv3.style.right = '-500px';
        document.getElementById('Over_Enable').addEventListener('change', function() {
            const selectedValue3 = this.value;
            let message = '';
            switch (selectedValue3) {
                case '0':
                    message = 'Auto';
                    break;
                case '1':
                    message = 'Manual';
                    break;
            }
            if (alertDiv3.style.right === '-500px') {
                alertDiv3.style.right = '20px';
                let length = 70;
                const process3 = alertDiv3.querySelector('.process');
                const run3 = setInterval(() => {
                    process3.style.height = length + 'px';
                    length -= 5;
                    if (length <= -10) {
                        clearInterval(run3);
                        setTimeout(() => {
                            alertDiv3.style.right = '-500px';
                        }, 500);
                    }
                }, 80);
            }
            alertDiv3.querySelector('span').textContent = message;
        });

// Gọi hàm function_gsdk ngay khi trang web được tải lên
setTimeout(function() {
    function_gsdk();
}, 2000);
var mohinh = document.getElementById("mohinh");
 var giamsatdienap = document.getElementById("giamsatdienap");
 var giamsatdongdien = document.getElementById("giamsatdongdien");
 var giamsattanso = document.getElementById("giamsattanso");
 var giamsattocdo = document.getElementById("giamsattocdo");
 var giamsatcongsuat = document.getElementById("giamsatcongsuat");
 function function_voltage() {        
    mohinh.style.display = "none";
    giamsatdienap.style.display = "block";
    giamsatdienap.style.opacity=1;
    giamsatdongdien.style.display = "none";
    giamsattanso.style.display = "none";
    giamsattocdo.style.display = "none";
    giamsatcongsuat.style.display = "none";        
}
function function_gsdk() {        
    mohinh.style.display = "block";
    giamsatdienap.style.display = "none";
    giamsatdongdien.style.display = "none";
    giamsattanso.style.display = "none";
    giamsattocdo.style.display = "none";
    giamsatcongsuat.style.display = "none";       
}
function function_current() {        
    mohinh.style.display = "none";
    giamsatdienap.style.display = "none";
    giamsatdongdien.style.display = "block";
    giamsatdongdien.style.opacity=1;
    giamsattanso.style.display = "none";
    giamsattocdo.style.display = "none"; 
    giamsatcongsuat.style.display = "none";          
}
function function_frequency() {        
    mohinh.style.display = "none";
    giamsatdienap.style.display = "none";
    giamsatdongdien.style.display = "none";
    giamsattanso.style.display = "block"; 
    giamsattanso.style.opacity=1;
    giamsattocdo.style.display = "none"; 
    giamsatcongsuat.style.display = "none";         
}
function function_speed() {        
    mohinh.style.display = "none";
    giamsatdienap.style.display = "none";
    giamsatdongdien.style.display = "none";
    giamsattanso.style.display = "none";
    giamsattocdo.style.display = "block";
    giamsattocdo.style.opacity=1; 
    giamsatcongsuat.style.display = "none";        
}
function function_power() {        
    mohinh.style.display = "none";
    giamsatdienap.style.display = "none";
    giamsatdongdien.style.display = "none";
    giamsattanso.style.display = "none";
    giamsattocdo.style.display = "none";
    giamsatcongsuat.style.display = "block";
    giamsatcongsuat.style.opacity=1;    
}

//---------------DIENAP-------------------
function getArr(arr, newVal) {
    if (arr.length === 0 && !newVal) return [];
    
    const newArr = [...arr, newVal];
    if (newArr.length > 15) {
        newArr.shift();
    }
    return newArr;
}
function open_sheet() {
    var url = "https://docs.google.com/spreadsheets/d/1H8tVvgnyaNv76P0YG9u-haIhxGH3SJoNudgQifCyels/edit#gid=0";
    var target = "_blank";
    window.open(url, target);   
}
var opts_voltage = {
    angle: -0.2,
    lineWidth: 0.2,
    radiusScale: 1,
    pointer: {
        length: 0.6,
        strokeWidth: 0.04,
        color: '#000000'
    },
    renderTicks: false,
    limitMax: false,
    limitMin: false,
    percentColors: [[0.0, "#a9d70b"], [0.50, "#f9c802"], [1.0, "#ff0000"]],
    strokeColor: '#E0E0E0',
    generateGradient: true
};

var voltagee = document.getElementById('chart-voltage').getContext('2d');
var chart_voltage = new Chart(voltagee, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Voltage',
            data: [],
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 3,
            fill: false
        }]
    },
    options: {
        responsive: true,
        animation: {
            duration: 0
        },
        scales: {
            // x: {
            //     type: 'time',
            //     time: {
            //         displayFormats: {
            //             second: 'h:mm:ss a'
            //         }
            //     }
            // },
            y: {
                min: 0,
                max: 400,
                ticks: {
                    stepSize: 50
                }
            }
        }
    }
});

var content_row_voltage = document.querySelectorAll(".content-row-voltage");
var time_voltage = [];
var value_voltage = [];
var j = 0;
var Voltage = 0;
var chartIntervalvoltage, historyIntervalvoltage;
    database.ref("Monitor system/Output voltage/data").on("value", function (snapshot) {
        //----------------------------- Gauge ----------------------------
        Voltage = snapshot.val();
        document.getElementById("volt").innerHTML = Voltage + " V";    
        
        var target_voltage = document.getElementById('gauge-voltage'); // your canvas element
        var ctx = target_voltage.getContext('2d');
        var gauge_voltage = new Gauge(target_voltage).setOptions(opts_voltage); // create sexy gauge!
        gauge_voltage.animationSpeed = 32;
    
        gauge_voltage.maxValue = 400; // set max gauge value
        gauge_voltage.set(Voltage);
                //----------------------------- Chart ----------------------------
        // Cập nhật biểu đồ ngay lập tức khi có dữ liệu mới
        updateChartvoltage(Voltage);
        //----------------------------- Table ----------------------------
        // Cập nhật dữ liệu lịch sử ngay lập tức khi có dữ liệu mới
        updateHistoryDatavoltage(Voltage);
    });
        //----------------------------- Chart ----------------------------
        function updateChartvoltage(Voltage) {
            var time = new Date().toLocaleTimeString();
            const data = getArr(chart_voltage.data.datasets[0].data, Voltage);
            const labels = getArr(chart_voltage.data.labels, time);
            chart_voltage.data.labels = labels
            chart_voltage.data.datasets[0].data = data
            chart_voltage.update();
        }

        function updateHistoryDatavoltage(Voltage) { 
            var time_now = new Date();
            if (j <= 6) {
                time_voltage[j] = time_now.getHours() + ":" + time_now.getMinutes() + ":" + time_now.getSeconds();
                value_voltage[j] = Voltage;
                j++;
            }
            else {
                time_voltage[0] = time_voltage[1];
                value_voltage[0] = value_voltage[1];
                time_voltage[1] = time_voltage[2];
                value_voltage[1] = value_voltage[2];
                time_voltage[2] = time_voltage[3];
                value_voltage[2] = value_voltage[3];
                time_voltage[3] = time_voltage[4];
                value_voltage[3] = value_voltage[4];
                time_voltage[4] = time_voltage[5];
                value_voltage[4] = value_voltage[5];
                time_voltage[5] = time_voltage[6];
                value_voltage[5] = value_voltage[6];
                time_voltage[6] = time_now.getHours() + ":" + time_now.getMinutes() + ":" + time_now.getSeconds();
                value_voltage[6] = Voltage;
            }
            content_row_voltage[2].innerHTML = time_voltage[0];
            content_row_voltage[3].innerHTML = value_voltage[0] + " V";
            content_row_voltage[4].innerHTML = time_voltage[1];
            content_row_voltage[5].innerHTML = value_voltage[1] + " V";
            content_row_voltage[6].innerHTML = time_voltage[2];
            content_row_voltage[7].innerHTML = value_voltage[2] + " V";
            content_row_voltage[8].innerHTML = time_voltage[3];
            content_row_voltage[9].innerHTML = value_voltage[3] + " V";
            content_row_voltage[10].innerHTML = time_voltage[4];
            content_row_voltage[11].innerHTML = value_voltage[4] + " V";
            content_row_voltage[12].innerHTML = time_voltage[5];
            content_row_voltage[13].innerHTML = value_voltage[5] + " V";
            content_row_voltage[14].innerHTML = time_voltage[6];
            content_row_voltage[15].innerHTML = value_voltage[6] + " V";
        }
        // Bắt đầu cập nhật biểu đồ mỗi giây nếu chưa có
        if (!chartIntervalvoltage) {
            chartInterval = setInterval(() => {
                updateChartvoltage(Voltage);
            }, 1000);
        }
        
        // Bắt đầu cập nhật dữ liệu lịch sử mỗi giây nếu chưa có
        if (!historyIntervalvoltage) {
            historyInterval = setInterval(() => {
                updateHistoryDatavoltage(Voltage);
            }, 1000);
        }
// -------DONGDIEN------/
var opts_current = {
    angle: -0.2,
    lineWidth: 0.2,
    radiusScale: 1,
    pointer: {
        length: 0.6,
        strokeWidth: 0.04,
        color: '#000000'
    },
    renderTicks: false,
    limitMax: false,
    limitMin: false,
    percentColors: [[0.0, "#a9d70b"], [0.50, "#f9c802"], [1.0, "#ff0000"]],
    strokeColor: '#E0E0E0',
    generateGradient: true
};

var current = document.getElementById('chart-current').getContext('2d');
var chart_current = new Chart(current, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Current',
            data: [],
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 3,
            fill: false
        }]
    },
    options: {
        responsive: true,
        animation: {
            duration: 0
        },
        scales: {
            // x: {
            //     type: 'time',
            //     time: {
            //         displayFormats: {
            //             second: 'h:mm:ss a'
            //         }
            //     }
            // },
            y: {
                min: 0,
                max: 400,
                ticks: {
                    stepSize: 50
                }
            }
        }
    }
});

var content_row_current = document.querySelectorAll(".content-row-current");
var time_current = [];
var value_current = [];
var j = 0;
var current_out=0;
   // Đảm bảo rằng setInterval chỉ được tạo một lần
   var chartIntervalcurrent, historyIntervalcurrent;

    database.ref("Monitor system/Output current/data").on("value", function (snapshot) {
        //----------------------------- Gauge ----------------------------
        current_out = snapshot.val();
        document.getElementById("current").innerHTML = current_out + " A";    
        
        var target_current = document.getElementById('gauge-current'); // your canvas element
        var ctx = target_current.getContext('2d');
        var gauge_current = new Gauge(target_current).setOptions(opts_current); // create sexy gauge!
        gauge_current.animationSpeed = 32;
    
        gauge_current.maxValue = 400; // set max gauge value
        gauge_current.set(current_out);
             //----------------------------- Chart ----------------------------
        // Cập nhật biểu đồ ngay lập tức khi có dữ liệu mới
        updateChartcurrent(current_out);
        //----------------------------- Table ----------------------------
        // Cập nhật dữ liệu lịch sử ngay lập tức khi có dữ liệu mới
        updateHistoryDatacurrent(current_out);
    });
        //----------------------------- Chart ----------------------------
        function updateChartcurrent(current_out) {
            var time = new Date().toLocaleTimeString();
            const data = getArr(chart_current.data.datasets[0].data, current_out);
            const labels = getArr(chart_current.data.labels, time);
            chart_current.data.labels = labels;
            chart_current.data.datasets[0].data = data;
            chart_current.update();
        }

        function updateHistoryDatacurrent(current_out) {
            var time_now = new Date();
            if (j <= 6) {
                time_current[j] = time_now.getHours() + ":" + time_now.getMinutes() + ":" + time_now.getSeconds();
                value_current[j] = current_out;
                j++;
            } else {
                time_current[0] = time_current[1];
                value_current[0] = value_current[1];
                time_current[1] = time_current[2];
                value_current[1] = value_current[2];
                time_current[2] = time_current[3];
                value_current[2] = value_current[3];
                time_current[3] = time_current[4];
                value_current[3] = value_current[4];
                time_current[4] = time_current[5];
                value_current[4] = value_current[5];
                time_current[5] = time_current[6];
                value_current[5] = value_current[6];
                time_current[6] = time_now.getHours() + ":" + time_now.getMinutes() + ":" + time_now.getSeconds();
                value_current[6] = current_out;
            }
            content_row_current[2].innerHTML = time_current[0];
            content_row_current[3].innerHTML = value_current[0] + " A";
            content_row_current[4].innerHTML = time_current[1];
            content_row_current[5].innerHTML = value_current[1] + " A";
            content_row_current[6].innerHTML = time_current[2];
            content_row_current[7].innerHTML = value_current[2] + " A";
            content_row_current[8].innerHTML = time_current[3];
            content_row_current[9].innerHTML = value_current[3] + " A";
            content_row_current[10].innerHTML = time_current[4];
            content_row_current[11].innerHTML = value_current[4] + " A";
            content_row_current[12].innerHTML = time_current[5];
            content_row_current[13].innerHTML = value_current[5] + " A";
            content_row_current[14].innerHTML = time_current[6];
            content_row_current[15].innerHTML = value_current[6] + " A";
        }
        // Bắt đầu cập nhật biểu đồ mỗi giây nếu chưa có
    if (!chartIntervalcurrent) {
        chartInterval = setInterval(() => {
            updateChartcurrent(current_out);
        }, 1000);
    }
    
    // Bắt đầu cập nhật dữ liệu lịch sử mỗi giây nếu chưa có
    if (!historyIntervalcurrent) {
        historyInterval = setInterval(() => {
            updateHistoryDatacurrent(current_out);
        }, 1000);
    }       
    // ----------------tanso------------------
var opts_frequency = {
        angle: -0.2,
        lineWidth: 0.2,
        radiusScale: 1,
        pointer: {
            length: 0.6,
            strokeWidth: 0.04,
            color: '#000000'
        },
        renderTicks: false,
        limitMax: false,
        limitMin: false,
        percentColors: [[0.0, "#a9d70b"], [0.50, "#f9c802"], [1.0, "#ff0000"]],
        strokeColor: '#E0E0E0',
        generateGradient: true
    };
    
    var frequency = document.getElementById('chart-frequency').getContext('2d');
    var chart_frequency = new Chart(frequency, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Frequency',
                data: [],
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 3,
                fill: false
            }]
        },
        options: {
            responsive: true,
            animation: {
                duration: 0
            },
            scales: {
                // x: {
                //     type: 'time',
                //     time: {
                //         displayFormats: {
                //             second: 'h:mm:ss a'
                //         }
                //     }
                // },
                y: {
                    min: 0,
                    max: 80,
                    ticks: {
                        stepSize: 10
                    }
                }
            }
        }
    });
    
    var content_row_frequency = document.querySelectorAll(".content-row-frequency");
    var time_frequency = [];
    var value_frequency = [];
    var j = 0;
        database.ref("Monitor system/Output frequecy/data").on("value", function (snapshot) {
            //----------------------------- Gauge ----------------------------
            var frequency_out = snapshot.val();
            document.getElementById("frequency").innerHTML = frequency_out + " Hz";    
            
            var target_frequency = document.getElementById('gauge-frequency'); // your canvas element
            var ctx = target_frequency.getContext('2d');
            var gauge_frequency = new Gauge(target_frequency).setOptions(opts_frequency); // create sexy gauge!
            gauge_frequency.animationSpeed = 32;
        
            gauge_frequency.maxValue = 80; // set max gauge value
            gauge_frequency.set(frequency_out);
            //----------------------------- Chart ----------------------------
            var time = new Date().toLocaleTimeString();
            const data = getArr(chart_frequency.data.datasets[0].data, frequency_out);
            const labels = getArr(chart_frequency.data.labels, time);
            chart_frequency.data.labels = labels
            chart_frequency.data.datasets[0].data = data
            chart_frequency.update();
            
            interval = setInterval(() => {
                var time = new Date().toLocaleTimeString();
                const frequencyVal = chart_frequency.data.datasets[0].data[chart_frequency.data.datasets[0].data.length - 1]
                const data = getArr(chart_frequency.data.datasets[0].data, frequencyVal)
                const labels = getArr(chart_frequency.data.labels, time)
                chart_frequency.data.labels = labels
                chart_frequency.data.datasets[0].data = data
                chart_frequency.update();
            }, 1000);
    
            interval = setInterval(() => {
                var time_now = new Date();
                if (j <= 6) {
                    time_frequency[j] = time_now.getHours() + ":" + time_now.getMinutes() + ":" + time_now.getSeconds();
                    value_frequency[j] = frequency_out;
                    j++;
                }
                else {
                    time_frequency[0] = time_frequency[1];
                    value_frequency[0] = value_frequency[1];
                    time_frequency[1] = time_frequency[2];
                    value_frequency[1] = value_frequency[2];
                    time_frequency[2] = time_frequency[3];
                    value_frequency[2] = value_frequency[3];
                    time_frequency[3] = time_frequency[4];
                    value_frequency[3] = value_frequency[4];
                    time_frequency[4] = time_frequency[5];
                    value_frequency[4] = value_frequency[5];
                    time_frequency[5] = time_frequency[6];
                    value_frequency[5] = value_frequency[6];
                    time_frequency[6] = time_now.getHours() + ":" + time_now.getMinutes() + ":" + time_now.getSeconds();
                    value_frequency[6] = frequency_out;
                }
                content_row_frequency[2].innerHTML = time_frequency[0];
                content_row_frequency[3].innerHTML = value_frequency[0] + " Hz";
                content_row_frequency[4].innerHTML = time_frequency[1];
                content_row_frequency[5].innerHTML = value_frequency[1] + " Hz";
                content_row_frequency[6].innerHTML = time_frequency[2];
                content_row_frequency[7].innerHTML = value_frequency[2] + " Hz";
                content_row_frequency[8].innerHTML = time_frequency[3];
                content_row_frequency[9].innerHTML = value_frequency[3] + " Hz";
                content_row_frequency[10].innerHTML = time_frequency[4];
                content_row_frequency[11].innerHTML = value_frequency[4] + " Hz";
                content_row_frequency[12].innerHTML = time_frequency[5];
                content_row_frequency[13].innerHTML = value_frequency[5] + " Hz";
                content_row_frequency[14].innerHTML = time_frequency[6];
                content_row_frequency[15].innerHTML = value_frequency[6] + " Hz";
            }, 2000);
        });  
    
 // ----------tocdo------------------
    var opts_speed = {
        angle: -0.2,
        lineWidth: 0.2,
        radiusScale: 1,
        pointer: {
            length: 0.6,
            strokeWidth: 0.04,
            color: '#000000'
        },
        renderTicks: false,
        limitMax: false,
        limitMin: false,
        percentColors: [[0.0, "#a9d70b"], [0.50, "#f9c802"], [1.0, "#ff0000"]],
        strokeColor: '#E0E0E0',
        generateGradient: true
    };
    
    var speed = document.getElementById('chart-speed').getContext('2d');
    var chart_speed = new Chart(speed, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Speed',
                data: [],
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 3,
                fill: false
            }]
        },
        options: {
            responsive: true,
            animation: {
                duration: 0
            },
            scales: {
                // x: {
                //     type: 'time',
                //     time: {
                //         displayFormats: {
                //             second: 'h:mm:ss a'
                //         }
                //     }
                // },
                y: {
                    min: 0,
                    max: 2000,
                    ticks: {
                        stepSize: 10
                    }
                }
            }
        }
    });
    
    var content_row_speed = document.querySelectorAll(".content-row-speed");
    var time_speed = [];
    var value_speed = [];
    var j = 0;
        database.ref("Monitor system/Output speed/data").on("value", function (snapshot) {
            //----------------------------- Gauge ----------------------------
            var speed_out = snapshot.val();
            document.getElementById("speed").innerHTML = speed_out + " Kw";    
            
            var target_speed = document.getElementById('gauge-speed'); // your canvas element
            var ctx = target_speed.getContext('2d');
            var gauge_speed = new Gauge(target_speed).setOptions(opts_speed); // create sexy gauge!
            gauge_speed.animationSpeed = 32;
        
            gauge_speed.maxValue = 2000; // set max gauge value
            gauge_speed.set(speed_out);
            //----------------------------- Chart ----------------------------
            var time = new Date().toLocaleTimeString();
            const data = getArr(chart_speed.data.datasets[0].data, speed_out);
            const labels = getArr(chart_speed.data.labels, time);
            chart_speed.data.labels = labels
            chart_speed.data.datasets[0].data = data
            chart_speed.update();
            
            interval = setInterval(() => {
                var time = new Date().toLocaleTimeString();
                const speedVal = chart_speed.data.datasets[0].data[chart_speed.data.datasets[0].data.length - 1]
                const data = getArr(chart_speed.data.datasets[0].data, speedVal)
                const labels = getArr(chart_frequency.data.labels, time)
                chart_speed.data.labels = labels
                chart_speed.data.datasets[0].data = data
                chart_speed.update();
            }, 1000);
    
            interval = setInterval(() => {
                var time_now = new Date();
                if (j <= 6) {
                    time_speed[j] = time_now.getHours() + ":" + time_now.getMinutes() + ":" + time_now.getSeconds();
                    value_speed[j] = speed_out;
                    j++;
                }
                else {
                    time_speed[0] = time_speed[1];
                    value_speed[0] = value_speed[1];
                    time_speed[1] = time_speed[2];
                    value_speed[1] = value_speed[2];
                    time_speed[2] = time_speed[3];
                    value_speed[2] = value_speed[3];
                    time_speed[3] = time_speed[4];
                    value_speed[3] = value_speed[4];
                    time_speed[4] = time_speed[5];
                    value_speed[4] = value_speed[5];
                    time_speed[5] = time_speed[6];
                    value_speed[5] = value_speed[6];
                    time_speed[6] = time_now.getHours() + ":" + time_now.getMinutes() + ":" + time_now.getSeconds();
                    value_speed[6] = speed_out;
                }
                content_row_speed[2].innerHTML = time_speed[0];
                content_row_speed[3].innerHTML = value_speed[0] + " rpm";
                content_row_speed[4].innerHTML = time_speed[1];
                content_row_speed[5].innerHTML = value_speed[1] + " rpm";
                content_row_speed[6].innerHTML = time_speed[2];
                content_row_speed[7].innerHTML = value_speed[2] + " rpm";
                content_row_speed[8].innerHTML = time_speed[3];
                content_row_speed[9].innerHTML = value_speed[3] + " rpm";
                content_row_speed[10].innerHTML = time_speed[4];
                content_row_speed[11].innerHTML = value_speed[4] + " rpm";
                content_row_speed[12].innerHTML = time_speed[5];
                content_row_speed[13].innerHTML = value_speed[5] + " rpm";
                content_row_speed[14].innerHTML = time_speed[6];
                content_row_speed[15].innerHTML = value_speed[6] + " rpm";
            }, 2000);
        });   
//-----congsuat------
var opts_power = {
    angle: -0.2,
    lineWidth: 0.2,
    radiusScale: 1,
    pointer: {
        length: 0.6,
        strokeWidth: 0.04,
        color: '#000000'
    },
    renderTicks: false,
    limitMax: false,
    limitMin: false,
    percentColors: [[0.0, "#a9d70b"], [0.50, "#f9c802"], [1.0, "#ff0000"]],
    strokeColor: '#E0E0E0',
    generateGradient: true
};

var power = document.getElementById('chart-power').getContext('2d');
var chart_power = new Chart(power, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Power',
            data: [],
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 3,
            fill: false
        }]
    },
    options: {
        responsive: true,
        animation: {
            duration: 0
        },
        scales: {
            // x: {
            //     type: 'time',
            //     time: {
            //         displayFormats: {
            //             second: 'h:mm:ss a'
            //         }
            //     }
            // },
            y: {
                min: 0,
                max: 0.9,
                ticks: {
                    stepSize: 0.005
                }
            }
        }
    }
});

var content_row_power = document.querySelectorAll(".content-row-power");
var time_power = [];
var value_power = [];
var j = 0;
var power_out=0;
var chartIntervalpower, historyIntervalpower;
database.ref("Monitor system/Output Power/data").on("value", function (snapshot) {
    //----------------------------- Gauge ----------------------------
     power_out = snapshot.val();
    document.getElementById("power").innerHTML = power_out + " kW";    

    var target_power = document.getElementById('gauge-power'); // your canvas element
    var ctx = target_power.getContext('2d');
    var gauge_power = new Gauge(target_power).setOptions(opts_power); // create sexy gauge!
    gauge_power.animationSpeed = 32;

    gauge_power.maxValue = 0.85; // set max gauge value
    gauge_power.set(power_out);
     //----------------------------- Chart ----------------------------
        // Cập nhật biểu đồ ngay lập tức khi có dữ liệu mới
        updateChartpower(power_out);
        //----------------------------- Table ----------------------------
        // Cập nhật dữ liệu lịch sử ngay lập tức khi có dữ liệu mới
        updateHistoryDatapower(power_out);
    });
    
    function updateChartpower(power_out) {
        var time = new Date().toLocaleTimeString();
        const data = getArr(chart_power.data.datasets[0].data, power_out);
        const labels = getArr(chart_power.data.labels, time);
        chart_power.data.labels = labels;
        chart_power.data.datasets[0].data = data;
        chart_power.update();
    }

    function updateHistoryDatapower(power_out) {
        var time_now = new Date();
        if (j <= 6) {
            time_power[j] = time_now.getHours() + ":" + time_now.getMinutes() + ":" + time_now.getSeconds();
            value_power[j] = power_out;
            j++;
        }
        else {
            time_power[0] = time_power[1];
            value_power[0] = value_power[1];
            time_power[1] = time_power[2];
            value_power[1] = value_power[2];
            time_power[2] = time_power[3];
            value_power[2] = value_power[3];
            time_power[3] = time_power[4];
            value_power[3] = value_power[4];
            time_power[4] = time_power[5];
            value_power[4] = value_power[5];
            time_power[5] = time_power[6];
            value_power[5] = value_power[6];
            time_power[6] = time_now.getHours() + ":" + time_now.getMinutes() + ":" + time_now.getSeconds();
            value_power[6] = power_out;
        }
        content_row_power[2].innerHTML = time_power[0];
        content_row_power[3].innerHTML = value_power[0] + " Kw";
        content_row_power[4].innerHTML = time_power[1];
        content_row_power[5].innerHTML = value_power[1] + " Kw";
        content_row_power[6].innerHTML = time_power[2];
        content_row_power[7].innerHTML = value_power[2] + " Kw";
        content_row_power[8].innerHTML = time_power[3];
        content_row_power[9].innerHTML = value_power[3] + " Kw";
        content_row_power[10].innerHTML = time_power[4];
        content_row_power[11].innerHTML = value_power[4] + " Kw";
        content_row_power[12].innerHTML = time_power[5];
        content_row_power[13].innerHTML = value_power[5] + " Kw";
        content_row_power[14].innerHTML = time_power[6];
        content_row_power[15].innerHTML = value_power[6] + " Kw";

    }
// Bắt đầu cập nhật biểu đồ mỗi giây nếu chưa có
if (!chartIntervalpower) {
    chartInterval = setInterval(() => {
        updateChartpower(power_out);
    }, 1000);
}

// Bắt đầu cập nhật dữ liệu lịch sử mỗi giây nếu chưa có
if (!historyIntervalpower) {
    historyInterval = setInterval(() => {
        updateHistoryDatapower(power_out);
    }, 1000);
}

