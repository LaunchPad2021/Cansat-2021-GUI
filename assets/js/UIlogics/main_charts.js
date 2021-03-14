type = ['primary', 'info', 'success', 'warning', 'danger'];
main = {
    showNotification: function(from, align) {
        color = notificationMessage[1];

        $.notify({
            icon: "tim-icons icon-bell-55",
            message: notificationMessage[0]

        }, {
            type: type[color],
            timer: 8000,
            placement: {
                from: from,
                align: align
            }
        });
    },

    initDashboardPageCharts: function() {

        gradientChartOptionsConfigurationWithTooltipPurple = {
            maintainAspectRatio: false,
            legend: {
                display: false
            },

            tooltips: {
                backgroundColor: '#f5f5f5',
                titleFontColor: '#333',
                bodyFontColor: '#666',
                bodySpacing: 4,
                xPadding: 12,
                mode: "nearest",
                intersect: 0,
                position: "nearest"
            },
            responsive: true,
            scales: {
                yAxes: [{
                    barPercentage: 1.6,
                    gridLines: {
                        drawBorder: false,
                        color: 'rgba(29,140,248,0.0)',
                        zeroLineColor: "transparent",
                    },
                    ticks: {
                        suggestedMin: 60,
                        suggestedMax: 100,
                        padding: 20,
                        fontColor: "#9a9a9a"
                    }
                }],

                xAxes: [{
                    barPercentage: 1.6,
                    gridLines: {
                        drawBorder: false,
                        color: 'rgba(225,78,202,0.1)',
                        zeroLineColor: "transparent",
                    },
                    ticks: {
                        padding: 20,
                        fontColor: "#9a9a9a",
                        autoSkip: true,
                        maxTicksLimit: 20
                    }
                }]
            }
        };

        gradientChartOptionsConfigurationWithTooltipGreen = {
            maintainAspectRatio: false,
            legend: {
                display: false
            },

            tooltips: {
                backgroundColor: '#f5f5f5',
                titleFontColor: '#333',
                bodyFontColor: '#666',
                bodySpacing: 4,
                xPadding: 12,
                mode: "nearest",
                intersect: 0,
                position: "nearest"
            },
            responsive: true,
            scales: {
                yAxes: [{
                    barPercentage: 1.6,
                    gridLines: {
                        drawBorder: false,
                        color: 'rgba(29,140,248,0.0)',
                        zeroLineColor: "transparent",
                    },
                    ticks: {
                        suggestedMin: 1,
                        suggestedMax: 5,
                        padding: 20,
                        fontColor: "#9e9e9e"
                    }
                }],

                xAxes: [{
                    barPercentage: 1.6,
                    gridLines: {
                        drawBorder: false,
                        color: 'rgba(0,242,195,0.1)',
                        zeroLineColor: "transparent",
                    },
                    ticks: {
                        padding: 20,
                        fontColor: "#9e9e9e",
                        autoSkip: true,
                        maxTicksLimit: 20
                    }
                }]
            }
        };

        gradientBarChartConfiguration = {
            maintainAspectRatio: false,
            legend: {
                display: false
            },

            tooltips: {
                backgroundColor: '#f5f5f5',
                titleFontColor: '#333',
                bodyFontColor: '#666',
                bodySpacing: 4,
                xPadding: 12,
                mode: "nearest",
                intersect: 0,
                position: "nearest"
            },
            responsive: true,
            scales: {
                yAxes: [{

                    gridLines: {
                        drawBorder: false,
                        color: 'rgba(29,140,248,0.1)',
                        zeroLineColor: "transparent",
                    },
                    ticks: {
                        suggestedMin: 60,
                        suggestedMax: 120,
                        padding: 20,
                        fontColor: "#9e9e9e"
                    }
                }],

                xAxes: [{

                    gridLines: {
                        drawBorder: false,
                        color: 'rgba(29,140,248,0.1)',
                        zeroLineColor: "transparent",
                    },
                    ticks: {
                        padding: 20,
                        fontColor: "#9e9e9e"
                    }
                }]
            }
        };

        // LABELS
        chartContainerAltitudeLabel = ['0s'];
        chartPayload1AltitudeLabel = ['0s'];
        chartPayload2AltitudeLabel = ['0s'];
        chartVoltageLabel = ['0s'];

        // INITIAL VALUES
        containerAltitude = [0];
        payload1Altitude = [0];
        payload2Altitude = [0];
        volatage = [4.8];

        // VOLTAGE CHART
        var voltageChartInit = document.getElementById("chartBatteryVoltage").getContext("2d");
        var gradientStroke = voltageChartInit.createLinearGradient(0, 230, 0, 50);
        var config = {
            type: 'line',
            data: {
                labels: chartVoltageLabel,
                datasets: [{
                    label: "Volts (V)",
                    fill: true,
                    backgroundColor: gradientStroke,
                    borderColor: '#00d6b4',
                    borderWidth: 2,
                    borderDash: [],
                    borderDashOffset: 0.0,
                    pointBackgroundColor: '#00d6b4',
                    pointBorderColor: 'rgba(255,255,255,0)',
                    pointHoverBackgroundColor: '#00d6b4',
                    pointBorderWidth: 20,
                    pointHoverRadius: 4,
                    pointHoverBorderWidth: 15,
                    pointRadius: 4,
                    data: volatage
                }]
            },
            options: gradientChartOptionsConfigurationWithTooltipGreen
        };
        gradientStroke.addColorStop(1, 'rgba(66,134,121,0.15)');
        gradientStroke.addColorStop(0.4, 'rgba(66,134,121,0.0)'); //green colors
        gradientStroke.addColorStop(0, 'rgba(66,134,121,0)'); //green colors
        voltageChart = new Chart(voltageChartInit, config);

        // ALTITUDE CHART
        var altitudeChartInit = document.getElementById("chartAltitude").getContext('2d');
        var gradientStroke = altitudeChartInit.createLinearGradient(0, 230, 0, 50);
        var config = {
            type: 'line',
            data: {
                labels: chartContainerAltitudeLabel,
                datasets: [{
                    label: "Altitude (Meters)",
                    fill: true,
                    backgroundColor: gradientStroke,
                    borderColor: '#d346b1',
                    borderWidth: 2,
                    borderDash: [],
                    borderDashOffset: 0.0,
                    pointBackgroundColor: '#d346b1',
                    pointBorderColor: 'rgba(255,255,255,0)',
                    pointHoverBackgroundColor: '#d346b1',
                    pointBorderWidth: 20,
                    pointHoverRadius: 4,
                    pointHoverBorderWidth: 15,
                    pointRadius: 4,
                    data: containerAltitude,
                }]
            },
            options: gradientChartOptionsConfigurationWithTooltipPurple
        };
        gradientStroke.addColorStop(1, 'rgba(72,72,176,0.1)');
        gradientStroke.addColorStop(0.4, 'rgba(72,72,176,0.0)');
        gradientStroke.addColorStop(0, 'rgba(119,52,169,0)'); //purple colors
        altitudeChart = new Chart(altitudeChartInit, config);

        $("#0").click(updateContainerTelemetry);
        $("#1").click(updatePayload1Telemetry);
        $("#2").click(updatePayload2Telemetry);
    }
}

function updateContainerTelemetry() {
    var data = altitudeChart.config.data;
    data.datasets[0].data = containerAltitude;
    data.labels = chartContainerAltitudeLabel;
    altitudeChart.update();
}

function updatePayload1Telemetry() {
    var data = altitudeChart.config.data;
    data.datasets[0].data = payload1Altitude;
    data.labels = chartPayload1AltitudeLabel;
    altitudeChart.update();
}

function updatePayload2Telemetry() {
    var data = altitudeChart.config.data;
    data.datasets[0].data = payload2Altitude;
    data.labels = chartPayload2AltitudeLabel;
    altitudeChart.update();
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
        // ADDING LABELS
        chartContainerAltitudeLabel.push(`${i}s`);
        chartPayload1AltitudeLabel.push(`${i}s`);
        chartPayload2AltitudeLabel.push(`${i}s`);
        chartVoltageLabel.push(`${i}s`)

        // ADDING VALUES
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
    altitudeChart.update();
    voltageChart.update();
}

function stopSimulation() {
    clearInterval(simulator);
}