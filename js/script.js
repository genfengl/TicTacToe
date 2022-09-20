const board = document.querySelector('#board')

const messageDiv = document.querySelector('.message')
const message = messageDiv.children[0]
const cellElements = document.querySelectorAll('.cell')
const resetBtn = messageDiv.children[1]
console.log(resetBtn)

let player1 = 'Player 1'
let player2 = 'Player 2'
let currentClass = 'x'
const xClass = 'x'
const oClass = 'o'
let player1Score = 0
let player2Score = 0
let drawScore = 0

let gameFinished = false
const winCon = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

const setupGame = () => {
    let whoGoesFirst = Math.random()
    whoGoesFirst < 0.5 ? currentClass = 'x' : currentClass = 'o'
    currentClass === 'x' ? board.className = 'board x' : board.className = 'board o'
    resetBtn.style.display = 'none'
    displayMessage()
    keepScore()
    playGame()
}

const displayMessage = () => {
    currentClass === 'x' ? message.textContent = `${player1}'s turn!` : message.textContent = `${player2}'s turn!`
}

const clicked = () => {
    board.addEventListener('click', (ev) => {
        cell = ev.target
        if (cell.className === 'cell') {
            if (currentClass === 'x') {
                cell.classList.add(currentClass) 
                if (checkWin(currentClass)) {
                    won()
                    return gameFinished = true
                }
                if (checkDraw()) {
                    draw()
                    return gameFinished = true
                }
                switchSide()
            } else {
                cell.classList.add(currentClass)
                if (checkWin(currentClass)) {
                    won()
                    return gameFinished = true
                }
                if (checkDraw()) {
                    draw()
                    return gameFinished = true
                }
                switchSide()
            }
        }
    })
}

const checkWin = (currentClass) => {
    return winCon.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}

const won = () => {
    message.textContent = `${currentClass === 'x' ? player1 : player2} wins!`
    currentClass === 'x' ? player1Score++ : player2Score++
    keepScore()
    resetBtn.style.display = 'flex'

}

const checkDraw = () => {
    return [...cellElements].every(cell => {
        return cell.classList.contains(xClass) || cell.classList.contains(oClass)
    })
}

const draw = () => {
    message.textContent = `It's a draw!`
    drawScore++
    keepScore()
    resetBtn.style.display = 'flex'
}

const keepScore = () => {
    const p1tag = document.querySelector('.player1').children[0]
    const p2tag = document.querySelector('.player2').children[0]

    p1tag.textContent = player1
    p2tag.textContent = player2
    const p1Score = document.querySelector('#p1Score')
    const tieScore = document.querySelector('#tieScore')
    const p2Score = document.querySelector('#p2Score')

    p1Score.textContent = player1Score
    tieScore.textContent = drawScore
    p2Score.textContent = player2Score

}

const switchSide = () => {
    if (currentClass === 'x') {
        currentClass = 'o'
        board.className = 'board o' 
        displayMessage()
    } else if (currentClass === 'o') {
        currentClass = 'x'
        board.className = 'board x'
        displayMessage()
    }
}

const clearBoard = () => {
        resetBtn.addEventListener('click', () => {
            cellElements.forEach(cell => {
                cell.className = 'cell'
            })
            setupGame()
        })
    }

const playGame = () => {
    displayMessage()
    clicked()
    clearBoard()
} 

setupGame()

const changeName = () => {
    const player1Tag = document.querySelector('.player1')
    const player2Tag = document.querySelector('.player2')
    player1Tag.addEventListener('click', (ev) => {
        let nameInput = prompt("Player 1 name")
        player1 = nameInput
        setupGame()
    })
    player2Tag.addEventListener('click', (ev) => {
        let nameInput = prompt("Player 2 name")
        player2 = nameInput
        setupGame()
    })
}

changeName()