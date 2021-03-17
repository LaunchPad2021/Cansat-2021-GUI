const fileSelector = document.getElementById('simulationTelemetryFileUpload');
fileSelector.addEventListener('change', (event) => {
    const fileList = event.target.files[0];
    console.log(fileList.name);
    readFile(fileList)
});

function readFile(file) {
    console.log("Reading file");
    const reader = new FileReader();
    reader.addEventListener('load', (event) => {
        commands.simulationCommands = [];
        var result = event.target.result.split("\n");
        for (let index = 0; index < result.length; index++) {
            var line = result[index];
            if (!line.includes("#")) {
                if (!line == "") {
                    var command = line.replace("$", "2176");
                    commands.simulationCommands.push(command);
                }
            }
        }
        return commands.simulationCommands;
    });

    reader.addEventListener('progress', (event) => {
        if (event.loaded && event.total) {
            const percent = (event.loaded / event.total) * 100;
            console.log(`Progress: ${Math.round(percent)}`);
        }
    });
    reader.readAsText(file);
}