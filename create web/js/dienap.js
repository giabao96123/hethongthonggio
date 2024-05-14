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


//---------------------------------------------------------------------
function getArr(arr, newVal) {
    if (arr.length === 0 && !newVal) return [];
    
    const newArr = [...arr, newVal];
    if (newArr.length > 15) {
        newArr.shift();
    }
    return newArr;
}
function open_sheet() {
    var url = "https://docs.google.com/spreadsheets/d/154zyAhdDfyKneWNOv9_bp5fqNMzZWEHPLjCp-sjHbCk/edit#gid=0";
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
    database.ref("fan/Voltage").on("value", function (snapshot) {
        //----------------------------- Gauge ----------------------------
        var Voltage = snapshot.val();
        document.getElementById("volt").innerHTML = Voltage + " V";    
        
        var target_voltage = document.getElementById('gauge-voltage'); // your canvas element
        var ctx = target_voltage.getContext('2d');
        var gauge_voltage = new Gauge(target_voltage).setOptions(opts_voltage); // create sexy gauge!
        gauge_voltage.animationSpeed = 32;
    
        gauge_voltage.maxValue = 400; // set max gauge value
        gauge_voltage.set(Voltage);
        //----------------------------- Chart ----------------------------
        var time = new Date().toLocaleTimeString();
        const data = getArr(chart_voltage.data.datasets[0].data, Voltage);
        const labels = getArr(chart_voltage.data.labels, time);
        chart_voltage.data.labels = labels
        chart_voltage.data.datasets[0].data = data
        chart_voltage.update();
        
        interval = setInterval(() => {
            var time = new Date().toLocaleTimeString();
            const currentVal = chart_voltage.data.datasets[0].data[chart_voltage.data.datasets[0].data.length - 1]
            const data = getArr(chart_voltage.data.datasets[0].data, currentVal)
            const labels = getArr(chart_voltage.data.labels, time)
            chart_voltage.data.labels = labels
            chart_voltage.data.datasets[0].data = data
            chart_voltage.update();
        }, 1000);

        interval = setInterval(() => {
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
        }, 1000);
    });

    
    
    
