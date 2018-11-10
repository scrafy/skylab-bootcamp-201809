const addBoardForm = document.getElementById('add_board_form')

addBoardForm.addEventListener('submit', function(event) {
    if (!validate(event.target, ['title'])) {
        event.preventDefault()
        setTimeout(function() {
            event.target.querySelector('input[name="title"]').classList.remove('is-invalid')
        }, 3000)
    }
})

function prepareToDrop(event) {
    event.preventDefault()
}

function drag(postId, event) {
    event.dataTransfer.setData('postId', postId)
}

function drop(boardId, event) {
    event.preventDefault()
    const board = event.target.closest('section')
    const post = document.getElementById('post' + event.dataTransfer.getData('postId'))
    board.insertBefore(post, board.lastChild)
}
