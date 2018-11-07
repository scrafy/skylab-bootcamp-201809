const addBoardForm = document.getElementById('add_board_form')

addBoardForm.addEventListener('submit', function(event) {
    if (!validate(event.target, ['title'])) {
        event.preventDefault()
        setTimeout(function() {
            event.target.querySelector('input[name="title"]').classList.remove('is-invalid')
        }, 3000)
    }
})
