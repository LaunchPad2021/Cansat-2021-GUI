// Create a client instance
client = new Paho.MQTT.Client("localhost", 9001, "mqtt-js");

// set callback handlers
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

// connect the client

client.connect({ onSuccess: onConnect });


// called when the client connects
function onConnect() {
    // Once a connection has been made, make a subscription and send a message.
    notificationMessage = ["Connected to server!", 1];
    main.showNotification();
    client.subscribe("cansat/container");
    client.subscribe("cansat/sp1");
    client.subscribe("cansat/sp2");

    // var message = new Paho.MQTT.Message("OFF");
    // message.destinationName = "cansat/telemetry";
    // client.send(message);
}

// called when the client loses its connection
function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
        console.log("onConnectionLost:" + responseObject.errorMessage);
    }
}

// called when a message arrives
function onMessageArrived(message) {
    telemetryData = message.payloadString.split(",");
    switch (telemetryData[3]) {
        case "C":
            processContainerTelemetry();
            break;
        case "S1":
            processPayload1Telemetry();
            break;
        case "S2":
            processPayload2Telemetry();
        default:
            break;
    }
}

/*************************************
IDs                     Index   Status
GPS_LATITUDE             11      DONE
GPS_LONGITUDE            12      DONE
GPS_ALTITUDE             13      DONE
CONTAINER_PACKET_COUNT   2       DONE
SP1_PACKET_COUNT         16      DONE
SP2_PACKET_COUNT         17      DONE
SP1_ROTATION_RATE        6       DONE
SP2_ROTATION_RATE        6       DONE
SP1_RELEASED             5       DONE
SP2_RELEASED             6       DONE
CONTAINER_TEMP           8       DONE
SP1_TEMP                 5       DONE
SP2_TEMP                 5       DONE
CONTAINER_ALTITUDE       7       DONE
SP1_ALTITUDE             4       DONE
SP2_ALTITUDE             4       DONE
**************************************/

function processContainerTelemetry() {
    // PUSH ALTITUDE ON ALTITUDE CHART DATA VARIABLE
    chartContainerAltitudeLabel.push(`${telemetryData[2]}s`);
    containerAltitude.push(telemetryData[7]);

    // PUSH VOLTAGE ON VOLTAGE CHART DATA VARIABLE
    volatage.push(telemetryData[9]);
    chartVoltageLabel.push(`${telemetryData[2]}s`);


    document.getElementById("GPS_LATITUDE").innerText = telemetryData[11];
    document.getElementById("GPS_LONGITUDE").innerText = telemetryData[12];
    document.getElementById("GPS_ALTITUDE").innerText = telemetryData[13];
    document.getElementById("CONTAINER_ALTITUDE").innerText = telemetryData[7];
    document.getElementById("CONTAINER_PACKET_COUNT").innerText = telemetryData[2];
    document.getElementById("CONTAINER_TEMP").innerText = telemetryData[8];
    document.getElementById("SP1_PACKET_COUNT").innerText = telemetryData[16];
    document.getElementById("SP2_PACKET_COUNT").innerText = telemetryData[17];

    // CHECK IF PAYLOAD IS RELEASED AND UPDATE UI
    updateReleaseStatus();

    // UPDATE CHARTS
    altitudeChart.update();
    voltageChart.update();
}

// PROCESS AND UPDATE PAYLOAD 1 DATA AND ALTITUDE CHART
function processPayload1Telemetry() {
    document.getElementById("SP1_ROTATION_RATE").innerText = telemetryData[6];
    document.getElementById("SP1_TEMP").innerText = telemetryData[5];
    document.getElementById("SP1_ALTITUDE").innerText = telemetryData[4];
    chartPayload1AltitudeLabel.push(`${telemetryData[2]}s`);
    payload1Altitude.push(telemetryData[4]);
    altitudeChart.update();
}

// PROCESS AND UPDATE PAYLOAD 2 DATA AND ALTITUDE CHART
function processPayload2Telemetry() {
    document.getElementById("SP2_ROTATION_RATE").innerText = telemetryData[6];
    document.getElementById("SP2_TEMP").innerText = telemetryData[5];
    document.getElementById("SP2_ALTITUDE").innerText = telemetryData[4];
    chartPayload2AltitudeLabel.push(`${telemetryData[2]}s`);
    payload2Altitude.push(telemetryData[4]);
    altitudeChart.update();
}

// GLOBAL
// INITIALLY BOTH ARE NOT RELEASED
// [PAYLOAD 1 STATUS, PAYLOAD 2 STATUS]
RELEASE_NOTIFIED = [false, false];

function updateReleaseStatus() {
    if (telemetryData[5] == "R") {
        var sp1 = document.getElementById("SP1_RELEASED");
        sp1.innerText = "RELEASED";
        if (!RELEASE_NOTIFIED[0]) {
            RELEASE_NOTIFIED[0] = true;
            notificationMessage = ["Payload 1 Released..!", 2];
            main.showNotification();
        }
        sp1.className = "badge badge-success";
    }
    if (telemetryData[6] == "R") {
        var sp1 = document.getElementById("SP2_RELEASED");
        sp1.innerText = "RELEASED";
        if (!RELEASE_NOTIFIED[1]) {
            RELEASE_NOTIFIED[1] = true;
            notificationMessage = ["Payload 2 Released..!", 2];
            main.showNotification();
        }
        sp1.className = "badge badge-success";
    }
}

var telemetrySwitches = ["containerTelemetrySwitch", "SP1TelemetrySwitch", "SP2TelemetrySwitch"]
for (let index = 0; index < telemetrySwitches.length; index++) {
    const element = telemetrySwitches[index];
    document.getElementById(element).addEventListener("click", function() {
        var status = document.getElementById(element.replace("Switch", "Status")).innerText;
        switch (status) {
            case "OFF":
                var message = element.replace("TelemetrySwitch", " ") + "ON";
                break;
            default:
                var message = element.replace("TelemetrySwitch", " ") + "OFF";
                break;
        }
        notificationMessage = [`Setting Telemetry: ${message}`, 0];
        main.showNotification()
        var message = new Paho.MQTT.Message(message);
        message.destinationName = "cansat/telemetry";
        client.send(message);
    })
}