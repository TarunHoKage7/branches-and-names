const update = document.querySelector('#update-button')

update.addEventListener('click', _ => {
    fetch('/branches', {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            name: 'Tarun1',
            branch: 'CSE'
        })
    })
})