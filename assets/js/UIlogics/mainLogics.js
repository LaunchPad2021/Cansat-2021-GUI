function updateContainerTelemetry() {
    var data = altitudeChartData.config.data;
    data.datasets[0].data = containerAltitude;
    data.labels = chartAltitudeLabel;
    altitudeChartData.update();
}

function updatePayload1Telemetry() {
    var data = altitudeChartData.config.data;
    data.datasets[0].data = payload1Altitude;
    data.labels = chartAltitudeLabel;
    altitudeChartData.update();
}

function updatePayload2Telemetry() {
    var data = altitudeChartData.config.data;
    data.datasets[0].data = payload2Altitude;
    data.labels = chartAltitudeLabel;
    altitudeChartData.update();
}

function runSimulation() {
    var i = 1;
    simulator = setInterval(function() {
        chartAltitudeLabel.push(`${i}s`);
        containerAltitude.push((i ** 2) ** Math.random());
        payload1Altitude.push((i ** 2) ** Math.random());
        payload2Altitude.push((i ** 2) ** Math.random());
        currentVoltage = (Math.random() * 5).toFixed(2);
        volatage.push(currentVoltage);
        $("#batteryVoltage").text(currentVoltage);
        altitudeChartData.update();
        voltageChart.update();
        i = i + 1;

    }, 1000);
}

function stopSimulation() {
    clearInterval(simulator);
}