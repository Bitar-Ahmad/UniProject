var socket = io();
window.addEventListener("devicemotion", accelerometerUpdate, true);
window.addEventListener("deviceorientation", handleOrientation, true);

var switcher = false;

if (window.DeviceMotionEvent == undefined) {
	console.log("devicemotion was  not defined");
};

if (window.DeviceOrientationEvent) {
  console.log("GyroScope was defined");
};

var mark;
var acc = { x:0, y:0, z:0};
var gyro = { gamma:1, alpha:1, beta:1 };


function handleOrientation(event) {
  var alpha = event.alpha;
  var gamma = event.gamma;
  var beta = event.beta;

  document.querySelector("#xx").value = alpha;
  document.querySelector("#yy").value = gamma;
  document.querySelector("#zz").value = beta;
	return gyro = { x:alpha, y:gamma, z:beta };
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
var quality = false;

function doSomething(){
	// mark = { x:acc.x, y:acc.y, z:acc.z, gamma:gyro.gamma, alpha:gyro.alpha, beta:gyro.beta, timestamp:new Date().getTime(), quality:quality};
	var mark = [{John:{x:acc.x, y:acc.y, z:acc.z,timestamp:new Date().getTime(), quality:quality}}, {henry:{gamma:gyro.gamma, alpha:gyro.alpha, beta:gyro.beta}}];
	socket.emit('GettingData', mark );
	console.log(mark);
};



function sendData(){
	 doIt = setInterval(doSomething, 200);
};

function breakSending(){
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

//
//
// const hi = function(){
// 	setTimeout(() => {
// 	},1000);
// }
//
// var doWhile = () => {
// 	setInterval(() => {
// 		console.log('hello');
// 	},500);
// }
//
// var stop = () => {
// 	clearInterval(start)
// };
//
// var start = setInterval(() => {
// 			console.log('hello');
// 		},500);
//
