/**
*Athors W3 And Nemie + codeMirror
* Thanks to Andela + Google and Udacity 
* Let's start
*/
//instantiate the model class
const indexController = new IndexController();

//registering the service worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').then((reg) => {

        if(reg.waiting) {
            updateReady(reg.waiting);
            return;
        }

        if(reg.installing) {
            console.log('Service worker installing')
            reg.installing.addEventListener('statechange', () => {
                if(this.state == 'installed'){
                    updateReady(this);
                    return;
                }
            });
        }

        reg.addEventListener('updatefound', () => {
            reg.installing.addEventListener('statechange', function(){
                if(this.state == 'installed'){
                    updateReady(this);
                    return;
                }
            });
        })


    }).catch((error) =>  {
        // registration failed
        console.log('Registration failed with ' + error);
    });

    // Ensure refresh is only called once.
    // This works around a bug in "force update on reload".
    var refreshing;
    navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (refreshing) return;
        window.location.reload();
        refreshing = true;
    });
}

function updateReady(worker){

    indexController.showUpdateUI('New version available');

    const updateMessage = document.querySelector('#update-message');

    updateMessage.addEventListener('click', (e) => {
        if(e.target && e.target.id== 'btn-refresh'){

            worker.postMessage({action: 'skipWaiting'});


        }else if(e.target && e.target.id== 'btn-cancel'){
            setTimeout(() => {
                document.querySelector('#update-message div').remove();
            }, 1000);
        }

    })
}
if (window.addEventListener) {              
    window.addEventListener("resize", browserResize);
} else if (window.attachEvent) {                 
    window.attachEvent("onresize", browserResize);
}
var xbeforeResize = window.innerWidth;

function browserResize() {
    var afterResize = window.innerWidth;
    if ((xbeforeResize < (970) && afterResize >= (970)) || (xbeforeResize >= (970) && afterResize < (970)) ||
        (xbeforeResize < (728) && afterResize >= (728)) || (xbeforeResize >= (728) && afterResize < (728)) ||
        (xbeforeResize < (468) && afterResize >= (468)) ||(xbeforeResize >= (468) && afterResize < (468))) {
        xbeforeResize = afterResize;
        
    }
    if (window.screen.availWidth <= 768) {
      restack(window.innerHeight > window.innerWidth);
    }
    fixDragBtn();
    showFrameSize();    
}
var fileID = "";
var loadSave = false;
function getSavedFile() {
    loadSave = true;
    var htmlCode;
    var paramObj = {};
    paramObj.fileid = "";
    fileID = paramObj.fileid;
    var paramA = JSON.stringify(paramObj);
    var httpA = new XMLHttpRequest();
    httpA.open("POST", globalURL, true);
    httpA.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    httpA.onreadystatechange = function() {
        if(httpA.readyState == 4 && httpA.status == 200) {
            document.getElementById("textareaCode").value = httpA.responseText;
            window.editor.getDoc().setValue(httpA.responseText);
            loadSave = false;
        }
    }
    httpA.send(paramA);   
};

try{
 submitTryit();
	//HTML Skeleton,  
function submitTryit(n) {
var codes = "<!DOCTYPE html>\n<\html>\n<\head>\n<meta charset=\"utf-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n<title> ArtVerbe ?<\/title>\n<\style>\n   body{\n\n    }\n<\/style>\n<\/head>\n<body>\n\n<\script>\n\n<\/script>\n</body>\n<\/html>";
   var codeDest = document.querySelector("#textareaCode");
   codeDest.value = codes;
   if (window.editor) {
    window.editor.save();
  }
  var text = document.getElementById("textareaCode").value;
   
  var ifr = document.createElement("iframe");
  ifr.setAttribute("frameborder", "0");
  ifr.setAttribute("id", "iframeResult");
  ifr.setAttribute("name", "iframeResult");  
  document.getElementById("iframewrapper").innerHTML = "";
  document.getElementById("iframewrapper").appendChild(ifr);
  if (loadSave == true ) {
    ifr.setAttribute("src", "/code/opentjkext.htm");
  } else if (fileID != "" && loadSave == false) {
    var t=text;
    t=t.replace(/=/gi,"w3equalsign");
    t=t.replace(/\+/gi,"w3plussign");    
    var pos=t.search(/script/i)
    while (pos>0) {
      t=t.substring(0,pos) + "w3" + t.substr(pos,3) + "w3" + t.substr(pos+3,3) + "tag" + t.substr(pos+6);
	    pos=t.search(/script/i);
    }
    document.getElementById("code").value=t;
    document.getElementById("codeForm").action = "https://tryit.w3schools.com/tryit_view.php?x=" + Math.random();
    document.getElementById('codeForm').method = "post";
    document.getElementById('codeForm').acceptCharset = "utf-8";
    document.getElementById('codeForm').target = "iframeResult";
    document.getElementById("codeForm").submit();
  } else { 
    var ifrw = (ifr.contentWindow) ? ifr.contentWindow : (ifr.contentDocument.document) ? ifr.contentDocument.document : ifr.contentDocument;
    try{ifrw.document.open();
   ifrw.document.write(text);  
    ifrw.document.close();}catch(err){
 var console = document.querySelector(".console");
 console.style.color = "red";
 console.style.padding = "8px";
 console.innerHTML = "<p style='color:green;'>Sorry for the inconvinience!,"+"We are under development ensuring we fix this as soon as possible</br>"+"Come back after a while</br></p>"+err.name + "<br>"+ err.message;
}
    //23.02.2016: contentEditable is set to true, to fix text-selection (bug) in firefox.
    //(and back to false to prevent the content from being editable)
    //(To reproduce the error: Select text in the result window with, and without, the contentEditable statements below.)  
    if (ifrw.document.body && !ifrw.document.body.isContentEditable) {
      ifrw.document.body.contentEditable = true;
      ifrw.document.body.contentEditable = false;
    }
  }
 
}}catch(err){
 var console = document.querySelector(".console");
 console.style.color = "red";
 console.style.padding = "8px";
 console.innerHTML = "<p style='color:green;'>Sorry for the inconvinience!,"+"We are under development ensuring we fix this as soon as possible</br>"+"Come back after a while</br></p>"+err.name + "<br>"+ err.message;
}
var currentStack = true;
if ((window.screen.availWidth <= 768 && window.innerHeight > window.innerWidth) || " horizontal" == " horizontal") {restack(true);}
function restack(horizontal) {
    var tc, ic, t, i, c, f, sv, sh, d, height, flt, width;
    tc = document.getElementById("textareacontainer");
    ic = document.getElementById("iframecontainer");
    t = document.getElementById("textarea");
    i = document.getElementById("iframe");
    c = document.getElementById("container");    
    sv = document.getElementById("stackV");
    sh = document.getElementById("stackH");
    tc.className = tc.className.replace("horizontal", "");
    ic.className = ic.className.replace("horizontal", "");        
    t.className = t.className.replace("horizontal", "");        
    i.className = i.className.replace("horizontal", "");        
    c.className = c.className.replace("horizontal", "");                        
    if (sv) {sv.className = sv.className.replace("horizontal", "")};
    if (sv) {sh.className = sh.className.replace("horizontal", "")};
    stack = "";
    if (horizontal) {
        tc.className = tc.className + " horizontal";
        ic.className = ic.className + " horizontal";        
        t.className = t.className + " horizontal";        
        i.className = i.className + " horizontal";                
        c.className = c.className + " horizontal";                
        if (sv) {sv.className = sv.className + " horizontal"};
        if (sv) {sh.className = sh.className + " horizontal"};
        stack = " horizontal";
        document.getElementById("textareacontainer").style.height = "80%";
        document.getElementById("iframecontainer").style.height = "20%";
        document.getElementById("textareacontainer").style.width = "100%";
        document.getElementById("iframecontainer").style.width = "100%";
        currentStack=false;
    } else {
        document.getElementById("textareacontainer").style.height = "100%";
        document.getElementById("iframecontainer").style.height = "100%";
        document.getElementById("textareacontainer").style.width = "50%";
        document.getElementById("iframecontainer").style.width = "50%";
        currentStack=true;        
    }
    fixDragBtn();
    showFrameSize();
}
function showFrameSize() {
  var t;
  var width, height;
  width = Number(getStyleValue(document.getElementById("iframeResult"), "width").replace("px", "")).toFixed();
  height = Number(getStyleValue(document.getElementById("iframeResult"), "height").replace("px", "")).toFixed();
 // document.getElementById("framesize").innerHTML = "Result Size: <span>" + width + " x " + height + "</span>";
}
   var dragging = false, stack;
function fixDragBtn() {
  var textareawidth, leftpadding, dragleft, containertop, buttonwidth
  var containertop = Number(getStyleValue(document.getElementById("container"), "top").replace("px", ""));
  if (stack != " horizontal") {
    document.getElementById("dragbar").style.width = "5px";    
    textareasize = Number(getStyleValue(document.getElementById("textareawrapper"), "width").replace("px", ""));
    leftpadding = Number(getStyleValue(document.getElementById("textarea"), "padding-left").replace("px", ""));
    buttonwidth = Number(getStyleValue(document.getElementById("dragbar"), "width").replace("px", ""));
    textareaheight = getStyleValue(document.getElementById("textareawrapper"), "height");
    dragleft = textareasize + leftpadding + (leftpadding / 2) - (buttonwidth / 2);
    document.getElementById("dragbar").style.top = containertop + "px";
    document.getElementById("dragbar").style.left = dragleft + "px";
    document.getElementById("dragbar").style.height = textareaheight;
    document.getElementById("dragbar").style.cursor = "col-resize";
    
  } else {
    document.getElementById("dragbar").style.height = "5px";
    if (window.getComputedStyle) {
        textareawidth = window.getComputedStyle(document.getElementById("textareawrapper"),null).getPropertyValue("height");
        textareaheight = window.getComputedStyle(document.getElementById("textareawrapper"),null).getPropertyValue("width");
        leftpadding = window.getComputedStyle(document.getElementById("textarea"),null).getPropertyValue("padding-top");
        buttonwidth = window.getComputedStyle(document.getElementById("dragbar"),null).getPropertyValue("height");
    } else {
        dragleft = document.getElementById("textareawrapper").currentStyle["width"];
    }
    textareawidth = Number(textareawidth.replace("px", ""));
    leftpadding = Number(leftpadding .replace("px", ""));
    buttonwidth = Number(buttonwidth .replace("px", ""));
    dragleft = containertop + textareawidth + leftpadding + (leftpadding / 2);
    document.getElementById("dragbar").style.top = dragleft + "px";
    document.getElementById("dragbar").style.left = "5px";
    document.getElementById("dragbar").style.width = textareaheight;
    document.getElementById("dragbar").style.cursor = "row-resize";        
  }
}
function dragstart(e) {
  e.preventDefault();
  dragging = true;
  var main = document.getElementById("iframecontainer");
}
function dragmove(e) {
  if (dragging) 
  {
    document.getElementById("shield").style.display = "block";        
    if (stack != " horizontal") {
      var percentage = (e.pageX / window.innerWidth) * 100;
      if (percentage > 5 && percentage < 98) {
        var mainPercentage = 100-percentage;
        document.getElementById("textareacontainer").style.width = percentage + "%";
        document.getElementById("iframecontainer").style.width = mainPercentage + "%";
        fixDragBtn();
      }
    } else {
      var containertop = Number(getStyleValue(document.getElementById("container"), "top").replace("px", ""));
      var percentage = ((e.pageY - containertop + 20) / (window.innerHeight - containertop + 20)) * 100;
      if (percentage > 5 && percentage < 98) {
        var mainPercentage = 100-percentage;
        document.getElementById("textareacontainer").style.height = percentage + "%";
        document.getElementById("iframecontainer").style.height = mainPercentage + "%";
        fixDragBtn();
      }
    }
    showFrameSize();    
  }
}
function dragend() {
  document.getElementById("shield").style.display = "none";
  dragging = false;
  if (window.editor) {
    window.editor.refresh();
  }
}
if (window.addEventListener) {              
  document.getElementById("dragbar").addEventListener("mousedown", function(e) {dragstart(e);});
  document.getElementById("dragbar").addEventListener("touchstart", function(e) {dragstart(e);});
  window.addEventListener("mousemove", function(e) {dragmove(e);});
  window.addEventListener("touchmove", function(e) {dragmove(e);});
  window.addEventListener("mouseup", dragend);
  window.addEventListener("touchend", dragend);
  window.addEventListener("load", fixDragBtn);
  window.addEventListener("load", showFrameSize);
}
function click_savebtn() {
  if (window.editor) {
    window.editor.save();
  }
  document.getElementById('saveModal').style.display = 'block';
}
function click_google_savebtn() {
  if (window.editor) {
    window.editor.save();
  }
  document.getElementById('driveSaveModal').style.display='block'
}

function click_google_loadbtn() {
  document.getElementById('driveLoadModal').style.display='block'
}
   

function colorcoding() { 
  window.editor = CodeMirror.fromTextArea(document.getElementById("textareaCode"), {
    mode: "htmlmixed",
    htmlMode: true,
    lineWrapping: true,
    lineNumbers: true,
	autoCloseTags: true,
    smartIndent: true,
    addModeClass: true,
	autoCloseBrackets: true,
	styleActiveLine: true,
    matchBrackets: true,
	keyMap: "sublime",
	highlightSelectionMatches: {showToken: /\w/, annotateScrollbar: true},
	extraKeys: {
          "Ctrl-Space": "autocomplete",
          "Alt-Space": "autocomplete"
        },
    value: document.documentElement.innerHTML
  });
// editor.setOption("extraKeys", {
//      Tab: function(cm) {
//    var spaces = Array(cm.getOption("indentUnit") + 1).join(" ");
//    cm.replaceSelection(spaces);
//  }
// });
//  window.editor.on("change", function () {window.editor.save();});
}
colorcoding();

function getStyleValue(elmnt,style) {
    if (window.getComputedStyle) {
        return window.getComputedStyle(elmnt,null).getPropertyValue(style);
    } else {
        return elmnt.currentStyle[style];
    }
}
//SAVE AND OPEN SCRIPT
var oauthToken;
var userAction;
var pickerApiLoaded;
var developerKey = 'AIzaSyAMZDPXiGcCNWs1UCWG9LS6kkW5YiABfJ0';
var CLIENT_ID = '451843133508-ckbr5r6ch1ofqbmh87oll4u6ltinqv2t.apps.googleusercontent.com';
var SCOPES = ['https://www.googleapis.com/auth/drive.file'];

//Check if current user has authorized this application
function checkAuth() {
    gapi.auth.authorize(
    {  'client_id': CLIENT_ID,
        'scope': SCOPES.join(' '),
        'immediate': true
    }, handleAuthResult);
}

//Handle response from authorization server
function handleAuthResult(authResult) {
    if (authResult && !authResult.error) {
        oauthToken = authResult.access_token;
        loadApi();
    }
}

// Initiate auth flow in response to user clicking authorize button
function handleAuthClick(event,userClick) {
    userAction = userClick;
    gapi.auth.authorize(
        {client_id: CLIENT_ID, scope: SCOPES, immediate: false},
        handleAuthResult);
    return false;
}

// Load API library
function loadApi() {
    gapi.client.load('drive', 'v3');
    gapi.load('picker', {'callback': onPickerApiLoad});
}
function onPickerApiLoad() {
    pickerApiLoaded = true;
    if (userAction=="save") {
        userAction="";
        document.getElementById('driveText').style.display='none';
        document.getElementById('driveSavedPanel').style.display='block';
        createFileWithHTMLContent(document.getElementById('googleFileName').value,document.getElementById('textareaCode').value)     
    }
    if (userAction=="open") {
        userAction="";
        createPicker();
    }
}

// Create and render a Picker object for picking HTML file
function createPicker() {
    if (pickerApiLoaded) {
        var view = new google.picker.View(google.picker.ViewId.DOCS);
        view.setMimeTypes("text/html");
        var picker = new google.picker.PickerBuilder().
            addView(view).
            setOAuthToken(oauthToken).
            setDeveloperKey(developerKey).
            setCallback(pickerCallback).
            build();
        picker.setVisible(true);
    }
}
// Put content of file in tryit editor
function pickerCallback(data) {
    var docID = '';
    if (data[google.picker.Response.ACTION] == google.picker.Action.PICKED) {
        var doc = data[google.picker.Response.DOCUMENTS][0];
        docID = doc[google.picker.Document.ID];
        getContentOfFile(docID);
    }
}

//Get contents
function getContentOfFile(theID){
    gapi.client.request({'path': '/drive/v2/files/'+theID,'method': 'GET',callback: function ( theResponseJS, theResponseTXT ) {
        var myToken = gapi.auth.getToken();
        var myXHR   = new XMLHttpRequest();
        myXHR.open('GET', theResponsejsUrl, true );
        myXHR.setRequestHeader('Authorization', 'Bearer ' + myToken.access_token );
        myXHR.onreadystatechange = function( theProgressEvent ) {
            if (myXHR.readyState == 4) {
                if ( myXHR.status == 200 ) {
                    var code = myXHR.response;
                    document.getElementById("textareaCode").value=code;
                    window.editor.getDoc().setValue(code);
                    submitTryit(1);
                    resetDriveLoadModal();
                }
            }
        }
        myXHR.send();
        }
    });
}

var createFileWithHTMLContent = function(name,data,callback) {
    const boundary = '-------314159265358979323846';
    const delimiter = "\r\n--" + boundary + "\r\n";
    const close_delim = "\r\n--" + boundary + "--";
    const contentType = 'text/html';

    var metadata = {
        'name': name,
        'mimeType': contentType
    };

    var multipartRequestBody =
        delimiter +
        'Content-Type: application/json\r\n\r\n' +
        JSON.stringify(metadata) +
        delimiter +
        'Content-Type: ' + contentType + '\r\n\r\n' +
        data +
        close_delim;

    var request = gapi.client.request({
        'path': '/upload/drive/v3/files',
        'method': 'POST',
        'params': {'uploadType': 'multipart'},
        'headers': {
            'Content-Type': 'multipart/related; boundary="' + boundary + '"'
        },
        'body': multipartRequestBody});
    if (!callback) {
        callback = function(file) {
            console.log(file);
            document.getElementById("driveSavedText").innerHTML = file.name + " saved in Google Drive";
            document.getElementById("driveSavedPanel").className = "w3-panel w3-large";
        };
    }
    request.execute(callback);
}

if (navigator.userAgent.indexOf("MSIE") > 0 || navigator.userAgent.indexOf("Edge") > 0) {
    document.getElementById("saveGDriveBtn").style.display = "none";
    document.getElementById("loadGDriveBtn").style.display = "none";
}


function resetDriveSaveModal() {
    document.getElementById('driveSavedText').innerHTML='';
    document.getElementById('driveSaveModal').style.display='none'
    document.getElementById('driveSavedPanel').style.display='none'
    document.getElementById('driveText').style.display='block'
    document.getElementById("driveSavedPanel").className = "w3-panel w3-large loader";
}
function resetDriveLoadModal() {
    document.getElementById('driveLoadModal').style.display='none'
}

function saveFile(code) {
    document.getElementById('preSave').style.display='none';
    if (code.length>20000) {
        document.getElementById('errorSave').style.display='block';    
        return;
    }
    document.getElementById('postSave').style.display='block';    
    var paramObj = {};
    paramObj.code = code;
    var paramB = JSON.stringify(paramObj);
    var httpB = new XMLHttpRequest();
    httpB.open("POST", globalURL, true);

    httpB.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    httpB.onreadystatechange = function() {
    if(httpB.readyState == 4 && httpB.status == 200) {
        if(httpB.responseText.substr(0,2) == "OK" ) {
          var getId = httpB.responseText.substr(2);
          document.getElementById("shareLink").href = "/code/tryit.asp?filename=" + getId;
          document.getElementById("shareLinkText").innerHTML = "https://www.simplewebeditor.netlify.com/code/tryit.asp?filename=" + getId;
          document.getElementById('saveLoader').style.display = "none";
          document.getElementById("saveModalSaved").style.display  = "block";
        }
    }
    }
    httpB.send(paramB);
}
function hideAndResetModal() {
    document.getElementById("saveModal").style.display = "none";
    document.getElementById('preSave').style.display = "block";
    document.getElementById('errorSave').style.display = "none";    
    document.getElementById('postSave').style.display = "none";
    document.getElementById("saveModalSaved").style.display = "none";
    document.getElementById('saveDisclaimer').style.display= "none";
    document.getElementById('saveLoader').style.display = "block";
}

var addr = document.location.href;
function displayError() {
  document.getElementById("err_url").value = addr;
  document.getElementById("err_form").style.display = "block";
  document.getElementById("err_email").focus();
  hideSent();
}
function hideError() {
  document.getElementById("err_form").style.display = "none";
}
function hideSent() {
  document.getElementById("err_sent").style.display = "none";
}
function sendErr() {
  var xmlhttp;
  var err_url = document.getElementById("err_url").value;
  var err_email = document.getElementById("err_email").value;
  var err_desc = document.getElementById("err_desc").value;
  if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp = new XMLHttpRequest();
  } else {// code for IE6, IE5
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlhttp.open("POST", "/err_sup.asp", true);
  xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xmlhttp.send("err_url=" + err_url + "&err_email=" + err_email + "&err_desc=" + escape(err_desc));
  document.getElementById("err_desc").value = "";
  hideError();
  document.getElementById("err_sent").style.display = "block";
}
function openMenu() {
    var x = document.getElementById("navbarDropMenu");
    var y = document.getElementById("menuOverlay");
    var z = document.getElementById("menuButton");
    if (z.className.indexOf("w3-text-gray") == -1) {
        z.className += " w3-text-gray";
    } else { 
        z.className = z.className.replace(" w3-text-gray", "");
    }
    if (z.className.indexOf("w3-gray") == -1) {
        z.className += " w3-gray";
    } else { 
        z.className = z.className.replace(" w3-gray", "");
    }
    if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";
    } else { 
        x.className = x.className.replace(" w3-show", "");
    }
    if (y.className.indexOf("w3-show") == -1) {
        y.className += " w3-show";
    } else { 
        y.className = y.className.replace(" w3-show", "");
    }

}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == document.getElementById("saveModal")) 
	{
        hideAndResetModal();
    }
    if (event.target == document.getElementById("driveSaveModal")) 
	{
        resetDriveSaveModal();
    }
    if (event.target == document.getElementById("driveLoadModal"))
	{
        resetDriveLoadModal();
    }
    if (event.target == document.getElementById("menuOverlay")) 
	{
        openMenu();
    }
    
}
// function addAutoRun(){
//  var oto = document.getElementById("textareacontainer");
//  oto.setAttribute("onkeyup","submitTryit(1)")
//}

st = (f) =>{
     return document.getElementsByTagName(f);
}
sl = (l) =>{
     return document.querySelector(l);
}
let expando,relative,clic;
      clic = "click";
      expando  = document.querySelector(".change");
      relative = document.querySelector(".nav");
	  
		expando.addEventListener(clic,()=>{
		relative.classList.toggle("screen_change");	 	  
});
document.onclick = function autoHideMenu(event) {
var nav =  sl(".nav");
		  if(event.target !== nav && event.target !== st("div") && event.target !== st("button") && event.target !== st(" input") && event.target !== st("a") && event.target !== st(" i") && event.target !== sl(".nav label") && event.target !== sl("iframe") && event.target !== sl("textareaCode") && event.target !== sl("nav") && event.target !== expando){
             // let me first get all my stuffs together
			 relative.classList.remove("screen_change")
          }
      }
//In future
let btn = sl(".randomColor"),
      bdy = sl("body"),
	  changeIt = sl(".CodeMirror.cm-s-default");
      let a,b,c,code;
    btn.onclick = ()=>{
      a = eval(258 * Math.floor( Math.random() * 2 / 2 ));
      b = Math.floor(Math.random()*99*99*9);
      c = eval(a + b);
      code = "#"+a+b;
      //bdy.style.background = code;
      //changeIt.style.background = code;
      //alert(code)
      }
	  //AutoRun start
let chec,val; 
var oto  = document.getElementById("textareacontainer"),
    submitIt =function(){ return submitTryit(1)};  
var inti = function(){ setTimeout(submitIt,1999);}
var auto;
  switcher = sl(".switch");
  chec = sl("#check"),
  val = sl("#displayDialog");
chec.addEventListener("click",function(){
 var togoD = val.classList.remove("togoDialog"); 
 setTimeout(togoD,455000); 
   if(chec.checked == true){
	  auto = setInterval(inti,2999); 
    var togoD = val.innerHTML = "AutoRun Enabled";
     //val.className = "b";
   }
   else if(chec.checked === false){ 
	clearInterval(auto);	
	val.innerHTML = "AutoRun Disabled";
	  var togoD = val.classList.add("togoDialog");  
      setTimeout(togoD,455000);
   //val.classList.remove("b"); 
   //r.preventDefault()
   }
});
  //Set background-color
changeIt.style.background = "rgb(12,27,39)";
//Filter
 var input, filter, div, span, textareaIn, i;
function myFunction() {
    input = sl("#val");
    filter = input.value.toUpperCase();
    div = document.getElementById("textarea");
    span = div.getElementsByTagName("div");
    for (i = 0; i < span.length; i++) {
        textareaIn = span[i].getElementsByTagName("textarea")[0];
        if (textareaIn.value.toUpperCase().indexOf(filter) > -1){
            span[i].style.display = "";
             span[i].style.background = "yellow";
			 //Prevent bgColor when input is empty
             if(document.getElementById("val").value == ""){
            span[i].style.background = "inherit";
  
            }
        } else {
            //span[i].style.display = "none";
            span[i].style.background = "transparent";
            
        }
    }
}
if(chec.checked == false){   
   switcher.setAttribute("title","Toggle Auto run");
   //alert("title\",\"Enable Auto run");
 }
var closIntro =sl(".closeIntro"),intro = sl(".layer-i");
 closIntro.addEventListener("click",function(){
	 intro.style.display="none"
 });
 function closeI(event){
	 intro.style.display="none"
 }