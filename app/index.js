import document from "document";
import * as simpleSettings from "./simple/device-settings";

let testObj = document.getElementById("testObj")

/* -------- SETTINGS -------- */
function settingsCallback(data) {
    if (!data) {
      return;
    }
    if (data.colorBackground) {
      testObj.style.fill = data.colorBackground;
    }
  }
  simpleSettings.initialize(settingsCallback);
