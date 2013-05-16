chrome.extension.onMessage.addListener(function(request, sender) {
  if (request.action == "getSource") {
    var content = request.source;
    // message.innerText = content;
    var beginDelim = "RSAME=[";
    var beginEncrypt = content.indexOf(beginDelim);
    var endEncrypt = content.indexOf("]=ENDRSA");
    var messageContent = "";
    for(var ii=(beginEncrypt+beginDelim.length); ii<endEncrypt; ii++){
    	messageContent += content.charAt(ii);
    }
	document.getElementById("txtPlaintext").value = messageContent;
	message.innerText = messageContent;
  }
});

function onWindowLoad() {
  // alert(localStorage["rsakey"].m);
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

function cmdEncryptClick(message){
  // var key = localStorage['rsakey'];
  with(document.rsame){
    txtMessages.value="Encrypting. Please wait...";
    txtCiphertext.value="";
    txtVerification.value="";
    var t1=new Date().getTime();
    var ct = encryptedString(key,message);
    // txtCiphertext.value = "hello";
    alert(ct);
    // var t2=new Date().getTime();
    // txtMessages.value="Done. Encryption took "+(t2-t1)+" milliseconds.";
  }
}

function cmdVerifyClick(message){
  // var key = localStorage['rsakey'];
  with(document.rsame){
    txtMessages.value="Decrypting. Please wait...";
    txtVerification.value="";
    var t1=new Date().getTime();
    txtVerification.value=decryptedString(key, message);
    var t2=new Date().getTime();
    txtMessages.value="Done. Decryption took "+(t2-t1)+" milliseconds.";
  }
}

// window.onload = onWindowLoad;
$(document).ready(function(){
  // alert("working");
  onWindowLoad();

    $('#encryptButt').click(function(){
      cmdEncryptClick($('#message').html());
//    $('#txtMessages').append("hello");
 });
  $('#decryptButt').click(function(){
    cmdVerifyClick($('#txtCiphertext').val());
  });
});