import { me } from "companion";
import * as messaging from "messaging";
import { settingsStorage } from "settings";


console.log("companion running")

// when companion is launched, it sets the check toggle to true
settingsStorage.setItem("companionCheck", "true")

function initialize() {

  settingsStorage.addEventListener("change", evt => {
    if(evt.key === "companionCheck"){
      settingsStorage.setItem("companionCheck", "true")
    }
    if (evt.oldValue !== evt.newValue) {
      sendValue(evt.key, evt.newValue);
    }
  });
}

function sendValue(key, val) {
    switch(JSON.parse(val)){
        case "red": 
            val = 1;
            break;
        case "green":
            val = 2;
            break;
        case "blue":
            val = 3;
            break;
    }
    switch(key){
        case "colorBackground": 
            key = 1;
            break;
    }
  if (val) {
    sendSettingData({
      key: key,
      value: val
    });
  }
}


function sendSettingData(data) {
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    settingsStorage.setItem("openCheck", "true")
    messaging.peerSocket.send(data);
  } else {
    settingsStorage.setItem("openCheck", "false")
    console.log("No peerSocket connection");
  }
}

initialize();
