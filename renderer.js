
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

