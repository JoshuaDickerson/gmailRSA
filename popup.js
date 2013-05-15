chrome.extension.onMessage.addListener(function(request, sender) {
  if (request.action == "getSource") {
    var content = request.source;
    // message.innerText = content;
    var beginDelim = "BEGINRSA=[";
    var beginEncrypt = content.indexOf(beginDelim);
    var endEncrypt = content.indexOf("]=ENDRSA");
    var messageContent = "";
    for(var ii=(beginEncrypt+beginDelim.length); ii<endEncrypt; ii++){
    	messageContent += content.charAt(ii);
    }
	document.getElementById("txtPlaintext").value = messageContent;
	message.innerText = "hello";
  }
});

function onWindowLoad() {

  var message = document.querySelector('#message');

  chrome.tabs.executeScript(null, {
    file: "getPageSource.js"
  }, function() {
    // If you try and inject into an extensions page or the webstore/NTP you'll get an error
    if (chrome.extension.lastError) {
      message.innerText = 'There was an error injecting script : \n' + chrome.extension.lastError.message;
    }
  });
}


window.onload = onWindowLoad;

