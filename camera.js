'use strict';

var PHOTO_WIDTH = 960;

var mediaSource = new MediaSource();
mediaSource.addEventListener('sourceopen', handleSourceOpen, false);
var mediaRecorder;
var recordedBlobs;
var sourceBuffer;
var intervalTimer;
var startTime;
var finishTime;



var $finishBtn = document.querySelector('#finish');
const video = document.getElementById('video')
const canvasElement = document.getElementById('canvas');


navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

var constraints = {
  audio: false,
  video: true
};

Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('/models'),//in real-time tiny face detector will be more fast
  faceapi.nets.faceLandmark68Net.loadFromUri('/models'),//recognizes part of face eyes,nose etc.
  faceapi.nets.faceRecognitionNet.loadFromUri('/models'),//recognizes where is the face with box
  faceapi.nets.faceExpressionNet.loadFromUri('/models'),
]).then(startVideo)

function startVideo(){
  navigator.getUserMedia(constraints, successCallback, errorCallback);
}

function successCallback(stream) {
  
  video.addEventListener('play', myFunc, false );
  window.stream = stream;
  if (window.URL) {
    video.srcObject = stream;
  } else {
    video.src = window.URL.createObjectURL(stream);
  }
}


function myFunc(){   const canvas = faceapi.createCanvasFromMedia(video)
    document.body.append(canvas)
    const displaySize = { width: video.width ,height: video.height }
    faceapi.matchDimensions(canvas,displaySize)
    setInterval(async () => {
        const detections =await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks().withFaceExpressions()
        
        const resizedDetections = faceapi.resizeResults(detections, displaySize)//properly cover face with square
        canvas.getContext('2d').clearRect(0,0, canvas.width,canvas.height)
        faceapi.draw.drawDetections(canvas, resizedDetections)
        faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
        if(resizedDetections.length == 1){
          setInterval(function(){ something() }, 1000);  
        }
        //faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
    }, 100)//every 100ms it will detect faces
 }

function errorCallback(error) {
  console.log('navigator.getUserMedia error: ', error);
}

function handleSourceOpen(event) {
  console.log('MediaSource opened');
  sourceBuffer = mediaSource.addSourceBuffer('video/webm; codecs="vp8"');
  console.log('Source buffer: ', sourceBuffer);
}


function handleDataAvailable(event) {
  if (event.data && event.data.size > 0) {
    recordedBlobs.push(event.data);
  }
}

var something = (function() {
  var executed = false;
  return function() {
      if (!executed) {
          executed = true;
          upload();
      }
  };
})();

function upload() {
  var width = PHOTO_WIDTH;
  var height = video.videoHeight / (video.videoWidth/width);

  canvasElement.setAttribute('width', width);
  canvasElement.setAttribute('height', height);

  var context = canvasElement.getContext('2d');
  canvasElement.width = width;
  canvasElement.height = height;
  context.drawImage(video, 0, 0, width, height);

  var dataUrl = canvasElement.toDataURL('image/png');

  chrome.runtime.getBackgroundPage( (backgroundPage) => {
    backgroundPage.uploadDataUrl(dataUrl);
    window.close();
  });
}

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.id == 'close-camera-window') {
    window.close();
  }
});

