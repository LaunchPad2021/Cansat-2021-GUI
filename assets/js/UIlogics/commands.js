commands = {
    commandPrefix: "CMD,2176,",

    setUTCTime: function() {
        var d = new Date();
        var H = d.getUTCHours();
        var M = d.getUTCMinutes();
        var S = d.getUTCSeconds();
        var command = `${commands.commandPrefix}ST,${H}:${M}:${S}`.replace(/(^|\D)(\d)(?!\d)/g, '$10$2');;
        console.log(command);
        commands.sendCommand(command);
    },

    setContainerTelemetry: function(state) {
        var command = `${commands.commandPrefix}CX,${state}`;
        console.log(command);
        commands.sendCommand(command);
    },

    setPayloadTelemetry: function(number, state) {
        var command = `${commands.commandPrefix}SP${number}X,${state}`;
        console.log(command);
        commands.sendCommand(command);
    },

    setSimulationMode: function(state) {
        var command = `${commands.commandPrefix}SIM,${state}`;
        console.log(command);
        commands.sendCommand(command);
    },

    sendSimulationPressure: function(pressure) {
        var command = `${commands.commandPrefix}SIMP,${pressure}`;
        console.log(command);
        commands.sendCommand(command);
    },
    sendCommand: function(message) {
        var message = new Paho.MQTT.Message(message);
        message.destinationName = "cansat/telemetry";
        client.send(message);
    }
}