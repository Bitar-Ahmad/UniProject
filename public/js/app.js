var socket = io();
window.addEventListener("devicemotion", accelerometerUpdate, true);
window.addEventListener("deviceorientation", handleOrientation, true);


if (window.DeviceMotionEvent == undefined) {
	console.log("devicemotion was  not defined");
};

if (window.DeviceOrientationEvent) {
  console.log("GyroScope was defined");
};

var read1, read2, read3;
var mark = { x:0, y:0, z:0, gamma:0, alpha:0, beta:0, timestamp:0 };

function handleOrientation(event) {
  var alpha    = event.alpha;
  var gamma    = event.gamma;
  var beta     = event.beta;

  console.log(alpha);

  document.querySelector("#xx").value = alpha;
  document.querySelector("#yy").value = gamma;
  document.querySelector("#zz").value = beta;

  return mark = {alpha, gamma, beta};
}

function accelerometerUpdate(event) {
   var aX = event.accelerationIncludingGravity.x*10;
   var aY = event.accelerationIncludingGravity.y*10;
   var aZ = event.accelerationIncludingGravity.z*10;

	 document.querySelector("#x").value = aX;
	 document.querySelector("#y").value = aY;
	 document.querySelector("#z").value = aZ;
   return mark = {x:aX, y:aY, z:aZ ,timestamp:Date.now()};
};

var hello = () => {
  setTimeout(() => {
    read1 = mark;
    console.log('0.3', read1);
  }, 333);
  setTimeout(() => {
    read2 = mark;
    console.log('0.6', read2);
  }, 666);
  setTimeout(() => {
    read3 = mark;
    console.log('1', read3);
  }, 1000);
  setTimeout(() => {
    socket.emit('GettingData', {read1, read2, read3});
  }, 1010);
};
