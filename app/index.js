import document from "document";
import { me } from "appbit";
import * as fs from "fs";
import * as messaging from "messaging";

let SETTINGS_TYPE = "cbor";
let SETTINGS_FILE = "mysettings.cbor";

let settings, onsettingschange;

let testObj = document.getElementById("testObj")
let errorObj = document.getElementById("errorObj")


function initialize(callback) {
  settings = loadSettings();
  onsettingschange = callback;
  onsettingschange(settings);
  fs.writeFileSync(SETTINGS_FILE, settings, SETTINGS_TYPE);
}
// Register for the unload event
me.addEventListener("unload", saveSettings);

// Received message containing settings data
messaging.peerSocket.addEventListener("message", function(evt) {
  if(fs.existsSync(SETTINGS_FILE) === true){
    errorObj.style.fill = "green"
  }
  else{
    errorObj.style.fill = "red"
  }
    let dataToSwitch = evt.data.key;
    switch (dataToSwitch){
        case 1:
            dataToSwitch = "colorBackground"
    }
  settings[dataToSwitch] = evt.data.value;
  
  onsettingschange(settings);
})

// Register for the unload event
me.addEventListener("unload", saveSettings);

// Load settings from filesystem
function loadSettings() {
  try {
    return fs.readFileSync(SETTINGS_FILE, SETTINGS_TYPE);
  } catch (ex) {
    return {};
  }
}

// Save settings to the filesystem
function saveSettings() {
  fs.writeFileSync(SETTINGS_FILE, settings, SETTINGS_TYPE);
}



/* -------- SETTINGS -------- */
function settingsCallback(data) {
  testObj.style.fill = "red";
    if (!data) {
      return;
    }
    if (data.colorBackground) {
        let intColor = data.colorBackground
        switch(intColor){
            case 1:
                intColor = "red"
                break;
            case 2:
                intColor = "green"
                break;
            case 3:
                intColor = "blue"
                break;
        }
      testObj.style.fill = intColor;
    }
  }
  initialize(settingsCallback);
