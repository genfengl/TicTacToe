const board = document.querySelector('#board')
const navBtns = document.querySelector('nav').children[1]
const messageDiv = document.querySelector('.message')
const message = messageDiv.children[0]
const cellElements = document.querySelectorAll('.cell')
const resetBtn = document.querySelector('#overlay')
const audioX = new Audio('./sounds/Tictactoe_X.mp3')
const audioO = new Audio('./sounds/Tictactoe_O.mp3')
const audioWin = new Audio('./sounds/Tictactoe_Win.mp3')
const audioDraw = new Audio('./sounds/Tictactoe_Draw.mp3')

let currentClass = 'x'
const xClass = 'x'
const oClass = 'o'
let gameFinish = false
let currentArray = []
let winArray = null
localStorage.clear()

if (localStorage.getItem('player1') === null) {
    localStorage.setItem('player1', 'Player 1')
}
if (localStorage.getItem('player2') === null) {
    localStorage.setItem('player2', 'Player 2')
}
let player1 = localStorage.getItem('player1')
let player2 = localStorage.getItem('player2')

if (localStorage.getItem('player1Score') === null) {
    localStorage.setItem('player1Score', 0)
}
if (localStorage.getItem('player2Score') === null) {
    localStorage.setItem('player2Score', 0)
}
if (localStorage.getItem('tieScore') === null) {
    localStorage.setItem('tieScore', 0)
}

let player1Score = localStorage.getItem('player1Score')
let player2Score = localStorage.getItem('player2Score')
let drawScore = localStorage.getItem('tieScore')

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
    if (gameFinish) {
        whoGoesFirst < 0.5 ? currentClass = 'x' : currentClass = 'o'
    }
    gameFinish = false
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
                audioX.play()
                cell.classList.add(currentClass) 
                if (checkWin(currentClass)) {
                    won()
                    return gameFinish === true
                }
                if (checkDraw()) {
                    draw()
                    return gameFinish === true
                }
                switchSide()
            } else {
                audioO.play()
                cell.classList.add(currentClass)
                if (checkWin(currentClass)) {
                    won()
                    return gameFinish === true
                }
                if (checkDraw()) {
                    draw()
                    return gameFinish === true
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
    setTimeout(() => {
        audioWin.play()
        setTimeout(() => {
            audioWin.pause()
            audioWin.currentTime = 0
        }, 2000)
    }, 500)
    addAnimation()
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
    setTimeout(() => {
        audioDraw.play()
    }, 300)
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
            cell.style.animation = 'none'
            winArray = []
            currentArray = []
        })
        audioWin.pause()
        audioWin.currentTime = 0
        audioDraw.pause()
        audioDraw.currentTime = 0
    setupGame()
    })
}

const changeName = () => {
    const player1Tag = document.querySelector('.player1')
    const player2Tag = document.querySelector('.player2')

    player1Tag.addEventListener('click', (ev) => {
        let nameInput = prompt("Player 1 name")
        player1 = nameInput
        localStorage.setItem('player1', `${player1}`)
        setupGame()
    })
    player2Tag.addEventListener('click', (ev) => {
        let nameInput = prompt("Player 2 name")
        player2 = nameInput
        localStorage.setItem('player2', `${player2}`)
        setupGame()
    })
}

const clearLocal = () => {
    const clearLocalBtn = navBtns.children[0]
    console.log(clearLocalBtn)
    clearLocalBtn.addEventListener('click', () => {
        player1 = 'Player 1'
        player2 = 'Player 2'
        player1Score = 0
        player2Score = 0
        drawScore = 0
        cellElements.forEach(cell => {
            cell.className = 'cell'
        })
        gameFinish = true
        setupGame()
    })
}

const toggleSound = () => {
    const soundBtn = navBtns.children[2]
    let soundMuted = false
    const muteIcon = soundBtn.children[1]
    const soundIcon = soundBtn.children[0]
    muteIcon.style.display = 'none'
    soundBtn.addEventListener('click', () => {
        if (soundMuted === false) {
            soundIcon.style.display = 'none'
            muteIcon.style.display = 'flex'
            soundMuted = true
            audioX.muted = true
            audioO.muted = true
            audioWin.muted = true
            audioDraw.muted = true
        } else if (soundMuted === true) {
            muteIcon.style.display = 'none'
            soundIcon.style.display = 'flex'
            soundMuted = false
            audioX.muted = false
            audioO.muted = false
            audioDraw.muted = false
            audioWin.muted = false
        }
    })
}

const addAnimation = () => {
    for (i=0; i<cellElements.length; i++) {
        if (cellElements[i].classList.contains(currentClass)) {
            currentArray.push(i)
        }
    }
    console.log(currentArray)
    winCon.forEach(combination => {
        if (combination.every(index => currentArray.includes(index))) {
            winArray = combination
        }
    })
    console.log(winArray)
    winArray.forEach(index => {
        cellElements[index].style.animation = 'blink 0.8s linear 3'
    })
}

const playGame = () => {
    displayMessage()
    clicked()
    clearBoard()
} 

setupGame()

changeName()

clearLocal()

toggleSound()


// const userIconChange = () => {
//     const userIcon = document.querySelector('.userChange')
//     userIcon.addEventListener('mouseover', () => {
//         userIcon.children[0].style
//     })
// }