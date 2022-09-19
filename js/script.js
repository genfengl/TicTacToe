const board = document.querySelector('#board')
console.log(board)
const message = document.querySelector('.message')


const startGame = () => {
    const whoGoesFirst = Math.random()

    if (whoGoesFirst < 0.5) {
        board.className = 'board x'
        const newMessage = document.createElement('p')
        newMessage.textContent = "Player 1's turn!"
        message.appendChild(newMessage)
    } else {
        board.className = 'board o'
        const newMessage = document.createElement('p')
        newMessage.textContent = "Player 2's turn!"
        message.appendChild(newMessage)
    }

}

startGame()

// board.addEventListener('click', (event) => {
//     if (event.target.className === 'cell') {
//         event.target.className += ' x'
//     }
// })