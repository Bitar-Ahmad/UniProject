var socket = io();
var mark;
var acc = { x:0, y:0, z:0};
var gyro = { xx:null, yy:null, zz:null };
var switcher = false;
window.addEventListener("devicemotion", accelerometerUpdate, true);
window.addEventListener("deviceorientation", handleOrientation, true);

// window.addEventListener("devicemotion", function(event){
// 	var alpha = event.rotationRate.alpha;
//   var gamma = event.rotationRate.gamma;
//   var beta = event.rotationRate.beta;
//
// 	document.querySelector("#xx").value = alpha;
//   document.querySelector("#yy").value = gamma;
//   document.querySelector("#zz").value = beta;
// 	return gyro = { x:alpha, y:gamma, z:beta };
// });

if (window.DeviceMotionEvent == undefined) {
	console.log("devicemotion was  not defined");
};

if (window.DeviceOrientationEvent) {
  console.log("GyroScope was defined");
};

function handleOrientation(event) {
	var alpha = event.alpha;
  var gamma = event.gamma;
  var beta = event.beta;

	document.querySelector("#xx").value = alpha;
  document.querySelector("#yy").value = gamma;
  document.querySelector("#zz").value = beta;
	return gyro = { xx:alpha, yy:gamma, zz:beta };
}


function accelerometerUpdate(event) {
   var aX = event.accelerationIncludingGravity.x;
   var aY = event.accelerationIncludingGravity.y;
	 var aZ = event.accelerationIncludingGravity.z;

	 document.querySelector("#x").value = aX;
	 document.querySelector("#y").value = aY;
	 document.querySelector("#z").value = aZ;
   return acc = {x:aX, y:aY, z:aZ};
};

var doIt;
var dommy = document.getElementById('send-btn').disabled;
var dommy2 = document.getElementById('stop-btn').disabled;
var check = false;
var check1 = true;
var quality = false;

function doSomething(){
	mark = { x:acc.x, y:acc.y, z:acc.z, alpha:gyro.aa, gamma:gyro.yy, beta:gyro.zz, timestamp:new Date().getTime(), quality:quality};
	socket.emit('GettingData', mark );
	console.log(mark);
};

function sendData(){
	document.getElementById('send-btn').disabled = true;
	document.getElementById('send-btn').textContent = "Sending";
	document.getElementById('stop-btn').disabled = false;
	doIt = setInterval(doSomething, 200);
};

function breakSending(){
	document.getElementById('stop-btn').disabled = true;
	document.getElementById('send-btn').textContent = "Send";
	document.getElementById('send-btn').disabled = false;
	clearInterval(doIt);
};

function toggleQuality(){
	quality = !quality
	if(quality == true){
		document.querySelector('#quality').textContent = 'False';
	} else {
		document.querySelector('#quality').textContent = 'True';
	};
};
