'use strict';

window.onload = function () {
  var $startBtn = document.getElementById('start-btn');
  // var $finishBtn = document.getElementById('finish-btn');

  $startBtn.addEventListener('click', function (e) {
    chrome.runtime.getBackgroundPage(function (backgroundPage) {
      // close popup window
      window.close();
      backgroundPage.startRecord();
    });
  });
};

console.log('Popup');