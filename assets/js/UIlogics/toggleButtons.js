document.querySelectorAll('.toggleButtons').forEach(item => {
    item.addEventListener('click', event => {
        changeStatus(item.id.replace("Switch", "Status"));
    })
})

function changeStatus(toggleStatusId) {
    let button = document.getElementById(toggleStatusId)
    if (button.className == "badge badge-danger") {
        button.className = "badge badge-success"
        button.textContent = "ON"
    } else {
        button.className = "badge badge-danger"
        button.textContent = "OFF"
    }
}