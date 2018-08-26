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
            }, 500);
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
    document.getElementById("dragbar").style.left = "10px";
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
  val.innerHTML = "AutoRun Disabled";
chec.addEventListener("click",function(){
 var togoD = val.classList.remove("togoDialog"); 
 setTimeout(togoD,455000); 
   if(chec.checked == true){
	  auto = setInterval(inti,2999); 
    var togoD =   val.innerHTML = "AutoRun Enabled";
     //val.className = "b";
   }
   else if(chec.checked === false){ 
	clearInterval(auto);	
	val.innerHTML = "AutoRun Disabled";
	  var togoD = val.classList.add("togoDialog");  
      setTimeout(togoD,455000);
   }
});
  //___________ Set background-color _________________
changeIt.style.background = "rgb(12,27,39)";
//___________( This is Filter in code function, currently not working correctly )____________
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
	   //___________ Prevent bgColor when input is empty _________________
          if(document.getElementById("val").value == ""){
           span[i].style.background = "inherit";
  
            }
        } else {
            //span[i].style.display = "none";
            span[i].style.background = "transparent";
            
        }
    }
}
//_________________Add toogle title for the toggle switcher ____________________________________
if(chec.checked == false){   
   switcher.setAttribute("title","Toggle Auto run");
 }
 var closIntro = sl(".closeIntro"),intro = sl(".layer-i");
     closIntro.addEventListener("click",function(){
	 intro.style.display="none"
 });
 //_________________ Closer function, this close the Intro/H'page ____________
 function closeI(event){
	       intro.style.display="none"
 }
 
/*_________________ SAVE file begin _________________ */
   g=(k)=>document.querySelector(k);
(function () {
var textFile = null,
  makeTextFile = function (text) {
    var data = new Blob([text], {type: 'text/html'});

    // If we are replacing a previously generated file we need to
    // manually revoke the object URL to avoid memory leaks.
    if (textFile !== null) {
      window.URL.revokeObjectURL(textFile);
    }

    textFile = window.URL.createObjectURL(data);

    return textFile;
  };


  var create = g('#rename'),
    textbox = g('#textareaCode');

  create.addEventListener('click', function () {
    var link = g('#downloadlink');
    link.href = makeTextFile(textbox.value);
   // link.style.display = 'block';
  }, false);
})();
const rnm = g("#rename");
  let modal = g(".main_modal"),dne = g("#ok");
  rnm.addEventListener("click",()=>{
    //show modal
    modal.style.display = "block";
	g("body").style.overflow = "hidden";
  });
  // Put a value to file Name
       g("#name").value = "Myfile";
    dne.addEventListener("click",(e)=>{
      let downLink = g('#downloadlink'),
          name = g("#name"),
          sel = g("#slect");
      if(name.value != ""){
           if(sel.value.includes('.')){
			  let str = sel.value;
              let nstr = str.replace(/./i,"");
              sel.value = nstr;
			  
             //_______Set download link
              downLink.setAttribute("download",name.value+"."+sel.value);	     
	        }
	}
	else
	{
       let prompted = prompt("Please put a name first");
           name.value = prompted;
           //_________Set download link
           downLink.setAttribute("download",name.value+"."+sel.value)
    }
            //_______hide modal
            modal.style.display = "none";
	        g("body").style.overflow = "auto";
      if(name.value == "")
	  {
         e.preventDefault();
      }else
		 {
            //______Trigger download click
            setTimeout(()=>{
                downLink.click()
            },500);
         }
});
  //______ What if you don't want to save your file right now ?, Cansel it,right?
  let cbrn = document.createElement("button");
      cbrn.classList.add("brn-from-left");
      cbrn.classList.add("cansel");
      cbrn.id = "cansel";
      cbrn.innerHTML = "Cansel";
      modal.insertBefore(cbrn,modal.childNodes[4]);
  const cansel = g("#cansel");
        cansel.addEventListener("click",()=>{   
       //hide modal
        modal.style.display = "none";
	    g("body").style.overflow="auto";
  });
  
 g = (k)=>{return document.querySelector(k)};
 
 //_____ KeyBord Future containing Simpols and special characters for codes
 /*  let area = g("#textbox"),urlb = g(".ul_brn");
  //Let's try to get Area focus as we're typing
  function getFocus(){
     area.focus();
  }
  //Define and initialize the writer function
  function writer(e){   
    area.value += e;
    //This calls area focus
    getFocus()
   }
  //Put the writer fun to every Input with attribute Type of Button
 let inputs= document.querySelectorAll(".brn");
for(inp of inputs){
    inp.setAttribute("onclick","writer(this.value)");
}     urlb.onclick = function(){
  for(let i =0;i<inputs.length;i++){
    if(inputs[i].style.textTransform != "uppercase"){
       inputs[i].style.textTransform = "uppercase";
       inputs[i].value =inputs[i].value.toUpperCase();
   
      
    }else if(inputs[i].style.textTransform == "uppercase")
   {
     inputs[i].style.textTransform = "lowercase";
       inputs[i].value =inputs[i].value.toLowerCase();
   } //This calls area focus
    getFocus();
}
  } 
  const del = g(".funD");
  del.onclick =()=>{
           area.value = area.value.substring(0,area.value.length-1);
    //This calls area focus
    getFocus();
  }
  const brck = g(".funBRK");
  brck.onclick =()=>{
       area.value += '\n';
    //This calls area focus
    getFocus();
  }
   */
   
 