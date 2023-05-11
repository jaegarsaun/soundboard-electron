
(async () => {
    if (!navigator.mediaDevices?.enumerateDevices) {
        console.log("enumerateDevices() not supported.");
    } else {
        // Get a list of the available media input and output devices
        navigator.mediaDevices
            .enumerateDevices()
            .then((devices) => {
                devices.forEach((device) => { // Loop through the list of devices

                    // If device.kind is audioinput list it as an input option in the select
                    if (device.kind === "audioinput") {
                        const select = document.getElementById("input");
                        const option = document.createElement("option");
                        option.value = device.deviceId;
                        option.text = device.label;
                        select.appendChild(option);
                    }

                    // If device.kind is audiooutput list it as an output option in the select
                    if (device.kind === "audiooutput") {
                        const select = document.getElementById("output");
                        const option = document.createElement("option");
                        option.value = device.deviceId;
                        option.text = device.label;
                        select.appendChild(option);
                    }
                });
            })
            .catch((err) => {
                console.error(`${err.name}: ${err.message}`);
            });
    }
})();


// Listen for button clicks on the start and stop buttons
const startButton = document.getElementById("play");
const delButton = document.getElementById("delete");

startButton.addEventListener("click", () => {
  // Get the device ID of the selected microphone
  let outputDeviceId;
  const selectOutput = document.getElementById("output");
  selectOutput.addEventListener("change", (event) => {
    outputDeviceId = event.target.value;
  });

  // Get the value of the button that was clicked ( same value will be used to find the audio track )
  const value = startButton.value;

  // Find the <p> tag with the value of the button that was clicked
  let p = document.querySelectorAll(".sound-name");
  const soundFileName = Array.from(p).find((p) => p.id === value).innerHTML;

  // Find the audio in sounds folder with the same name as soundFileName
  const audio = fs.readFileSync(`./sounds/${soundFileName}`);
  
  console.log(audio);
}



);