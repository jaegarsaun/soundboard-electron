
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

// Playing audio
// Get the play button elements
const playButtons = document.querySelectorAll('#play');

// Add a click event listener to each play button
playButtons.forEach((button) => {
    button.addEventListener('click', async function () {
        // Find the audio element
        const audio = this.querySelector("audio");

        // Get the output select element and its selected value
        const outputSelect = document.getElementById("output");
        const outputDeviceId = outputSelect.value;

        try {
            // Check if the browser supports setSinkId()
            if (typeof audio.setSinkId === 'function') {
                // Set the sink ID asynchronously
                await audio.setSinkId(outputDeviceId);
            } else {
                console.error('setSinkId() is not supported in this browser.');
            }
            try{
                // Play the audio
                await audio.play();
            }catch(err){
                console.log(err)
            }
        } catch (err) {
            console.error(`${err.name}: ${err.message}`);
        }
    });
});



