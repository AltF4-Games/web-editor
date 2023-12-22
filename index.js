let editor = CodeMirror.fromTextArea(document.getElementById("js"), {
  mode: "text/javascript",
  lineNumbers: true,
});
let theme = "dracula";
editor.setSize(null,"86.5%")
editor.setOption('theme', theme);

let currentTab = "javascript";
let html="";
let css="";
let js="";

function SaveText()
{
  if(currentTab == "javascript") js = editor.getValue();
  if(currentTab == "html") html = editor.getValue();
  if(currentTab == "css") css = editor.getValue();
}

function loadText()
{
  if(currentTab == "javascript") editor.setValue(js);
  if(currentTab == "html") editor.setValue(html);
  if(currentTab == "css") editor.setValue(css);
}

function switchTab(tab)
{
  SaveText();
  currentTab = tab;
  let label = document.getElementById("tab-label");
  if(currentTab == "javascript") {
    label.innerHTML = "JAVASCRIPT";
    editor.mode = "text/javascript";
  }
  if(currentTab == "html") {
    label.innerHTML = "HTML";
    editor.mode = "text/html";
  }
  if(currentTab == "css") {
    label.innerHTML = "CSS";
    editor.mode = "text/css";
  }
  loadText();
}

function run()
{
    SaveText();
    if(document.getElementById("output"))
    {
      document.getElementById("output").remove();
      prepareFrame();
    }

    let frameObj = document.getElementById("output");

    for (let index = 0; index < scripts.length; index++) {
      let script = document.createElement('script');
      script.src = scripts[index];
      let doc = document.getElementById("output").contentWindow.document.head;
      doc.append(script);
    }

    frameObj.contentWindow.document.body.innerHTML =  "<style>" + css + "</style>" + html;
    frameObj.contentWindow.eval(js);
    try {
      const result = eval(js);
      if (result !== undefined) {
        console.log(result);
      }
    } catch (error) {
      console.error(error);
    }
}

function prepareFrame() {
    let ifrm = document.createElement("iframe");
    ifrm.id = "output";
    document.getElementById("out").insertBefore(ifrm,document.getElementById("out").childNodes[2]);
}

const addLibraries = () => {
  let userInput = prompt('Enter External Libraries:');

  if (userInput !== null) {
      scripts.push(userInput);
      alert('Added: ' + userInput);
  }
}

const downloadFile = () => {
    const link = document.createElement("a");
    let content = "<!DOCTYPE html><html><head><style>" + cssEditor.getValue() + "</style>";
    
    for (let index = 0; index < scripts.length; index++) {
      content += '<script src="' + scripts[index] + '"></script>';
    }
    
    content += "<script>" + jsEditor.getValue()  + "</script></head><body>" + htmlEditor.getValue() + "</body></html>"; 
    const file = new Blob([content], { type: 'text/plain' });
    link.href = URL.createObjectURL(file);
    link.download = "index.html";
    link.click();
    URL.revokeObjectURL(link.href);
 };

function saveToLocalStorage(key, value) {
  localStorage.setItem(key, value);
}

function autoSave() {
  const key_js = 'js';
  const value_js = js;

  const key_html = 'html';
  const value_html = html;

  const key_css = 'css';
  const value_css = css;

  saveToLocalStorage(key_js, value_js);
  saveToLocalStorage(key_html, value_html);
  saveToLocalStorage(key_css, value_css);
}

// Call autoSave function every 1 minutes
setInterval(autoSave, 1 * 60 * 1000);

console = {
  log: function(message) {
    logToConsole(message, 'log');
  },
  error: function(message) {
    logToConsole(message, 'error');
  },
  warn: function(message) {
    logToConsole(message, 'warn');
  }
};

function logToConsole(message, type = 'log') {
  const consoleElement = document.getElementById('console');
  const logItem = document.createElement('div');
  logItem.classList.add(type);
  logItem.textContent = message;
  consoleElement.appendChild(logItem);
  consoleElement.scrollTop = consoleElement.scrollHeight;
}

function loadPreviousData()
{
  if(localStorage.getItem("html") != null)
    html = localStorage.getItem("html");
  if(localStorage.getItem("css") != null)
    css = localStorage.getItem("css");
  if(localStorage.getItem("js") != null)
    js = localStorage.getItem("js");
  loadText();
}

setTimeout(loadPreviousData, 100);

const scripts = [];