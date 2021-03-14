function updateContainerTelemetry() {
    var data = altitudeChartData.config.data;
    data.datasets[0].data = containerAltitude;
    data.labels = chartContainerAltitudeLabel;
    altitudeChartData.update();
}

function updatePayload1Telemetry() {
    var data = altitudeChartData.config.data;
    data.datasets[0].data = payload1Altitude;
    data.labels = chartPayload1AltitudeLabel;
    altitudeChartData.update();
}

function updatePayload2Telemetry() {
    var data = altitudeChartData.config.data;
    data.datasets[0].data = payload2Altitude;
    data.labels = chartPayload2AltitudeLabel;
    altitudeChartData.update();
}

function updateVoltageChart() {
    var data = voltageChart.config.data;
    data.datasets[0].data = volatage;
    data.labels = chartVoltageLabel;
    voltageChart.update();
}

function runSimulation() {
    var i = 1;
    simulator = setInterval(function() {
        chartContainerAltitudeLabel.push(`${i}s`);
        chartPayload1AltitudeLabel.push(`${i}s`);
        chartPayload2AltitudeLabel.push(`${i}s`);
        chartVoltageLabel.push(`${i}s`)
        containerAltitude.push((i ** 2) ** Math.random());
        payload1Altitude.push((i ** 2) ** Math.random());
        payload2Altitude.push((i ** 2) ** Math.random());
        currentVoltage = (Math.random() * 5).toFixed(2);
        volatage.push(currentVoltage);
        $("#batteryVoltage").text(currentVoltage);
        i = i + 1;
        updateUI();
    }, 1000);
}

function updateUI() {
    // updateContainerTelemetry();
    // updatePayload1Telemetry();
    // updatePayload2Telemetry()
    altitudeChartData.update();
    updateVoltageChart();
}

function stopSimulation() {
    clearInterval(simulator);
}