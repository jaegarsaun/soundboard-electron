const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  // we can also expose variables, not just functions
})


window.addEventListener('DOMContentLoaded', () => {
  // Listen for button clicks on the start and stop buttons
  const startButton = document.getElementById("play");
  const delButton = document.getElementById("delete");
  let outputDeviceId;
  startButton.addEventListener("click", () => {
    // Get the device ID of the selected microphone

    const selectOutput = document.getElementById("output");
    selectOutput.addEventListener("change", (event) => {
      outputDeviceId = event.target.value;
    });

    // Get the value of the button that was clicked ( same value will be used to find the audio track )
    const value = startButton.value;

    // Find the <p> tag with the value of the button that was clicked
    let p = document.querySelectorAll(".sound-name");
    const soundFileName = Array.from(p).find((p) => p.id === value).innerHTML;

    const fs = require("fs");
    // Find the audio in sounds folder with the same name as soundFileName
    const audio = fs.readFileSync(`sounds/${soundFileName}`);
    console.log(outputDeviceId);
    console.log(soundFileName);
    ipcRenderer.send('selectDevice', outputDeviceId, audio);
  });

}
)


