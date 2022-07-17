const update = document.querySelector('#update-button')
const delButton = document.querySelector("#delete-button")
const messageDiv = document.querySelector('#message')

update.addEventListener('click', _ => {
    fetch('/branches', {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            name: 'TarunNew',
            branch: 'CSENew'
        })
    })
    .then(res => {
        if(res.ok) return res.json()
    })
    .then(response => {
        window.location.reload(true)
    })
})

delButton.addEventListener('click', _ => {
    fetch('/branches', {
        method: 'delete',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(
            {
                name: "null"
            })
    })
    .then(res => {
        if(res.ok) return res.json()
    })
    .then(response => {
        if(response === "No null pairs to delete"){
            messageDiv.textContent = "No null pairs to delete"
        }
        else{
            window.location.reload(true)
        }
    })
})
