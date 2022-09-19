const board = document.querySelector('#board')
console.log(board)
const messageDiv = document.querySelector('.message')
const message = messageDiv.children[0]
let currentPlayer = ''
let gameFinished = false

const startGame = () => {
    const whoGoesFirst = Math.random()
    if (whoGoesFirst < 0.5) {
        currentPlayer = 'Player 1'
        board.className = 'board x'
    } else {
        currentPlayer = 'Player 2'
        board.className = 'board o'
    }
}

const switchSide = () => {
    if (currentPlayer === 'Player 1') {
        currentPlayer = 'Player 2'
        board.className = 'board o' 
        message.textContent = `${currentPlayer}'s turn!`
    } else if (currentPlayer === 'Player 2') {
        currentPlayer = 'Player 1'
        board.className = 'board x'
        message.textContent = `${currentPlayer}'s turn!`
    }
}

const playGame = () => {
    message.textContent = `${currentPlayer}'s turn`
    board.addEventListener('click', (ev) => {
        if (ev.target.className === 'cell') {
            if (currentPlayer === 'Player 1') {
                ev.target.className += ' x' 
                switchSide()
            } else if (currentPlayer === 'Player 2') {
                ev.target.className += ' o'
                switchSide()
            }
        } 
    })
}

startGame()
playGame()


