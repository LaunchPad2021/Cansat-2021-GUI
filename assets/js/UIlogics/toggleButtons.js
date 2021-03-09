// Status Changing login
document.querySelectorAll('.toggleButtons').forEach(item => {
    item.addEventListener('click', event => {
        changeStatus(item.id.replace("Switch", "Status"));
    })
})

function changeStatus(toggleStatusId) {
    let button = document.getElementById(toggleStatusId)
    if (button.className == "badge badge-danger") {
        button.className = "badge badge-success";
        button.textContent = "ON";
    } else {
        button.className = "badge badge-danger";
        button.textContent = "OFF";
    }
}

// Enable / Disable simulation active switch
var simulationEnableSwitch = document.querySelector("#simulationEnableSwitch")
simulationEnableSwitch.addEventListener("click", event => {
    let button = document.getElementById(simulationEnableSwitch.id.replace("Switch", "Status"));
    if (button.className == "badge badge-danger") {
        document.getElementById("simulationAvtiveStatus").className = "badge badge-default";
        document.getElementById("simulationAvtiveStatus").textContent = "OFF";
        document.getElementById("simulationAvtiveSwitch").disabled = true;
    } else {
        document.getElementById("simulationAvtiveStatus").className = "badge badge-danger";
        document.getElementById("simulationAvtiveSwitch").disabled = false;
    }
})

// Start or stop simulation
var simulationAvtiveSwitch = document.querySelector("#simulationAvtiveSwitch").addEventListener("click", event => {
    simulationActiveStatus = document.getElementById("simulationAvtiveStatus");
    if (simulationActiveStatus.textContent == "OFF") {
        stopSimulation();
    } else {
        runSimulation();
    }
})