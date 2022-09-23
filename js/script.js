const board = document.querySelector('#board')
const navBtns = document.querySelector('nav').children[1]
const messageDiv = document.querySelector('.message')
const message = messageDiv.children[0]
const cellElements = document.querySelectorAll('.cell')
const resetBtn = document.querySelector('#overlay')
const audioX = new Audio('./sounds/Tictactoe_X.mp3')
const audioO = new Audio('./sounds/Tictactoe_O.mp3')
const audioDraw = new Audio('./sounds/Tictactoe_Draw.mp3')
const audioBtn = new Audio('./sounds/Tictactoe_buttonClick.mp3')
const themeChoice = document.querySelector('.themeChoice')
const nav = document.querySelector('nav')
const mainContent = document.querySelector('.main-content')
const scoreboard = document.querySelector('.scoreboard')
const banner = document.querySelector('.banner')

let currentClass = 'x'
const xClass = 'x'
const oClass = 'o'
let gameFinish = false
let currentArray = []
let winArray = null
let currentTheme = 'red'
let whoGoesFirst = null
let vsAI = false

if (localStorage.getItem('player1') === null) {
    localStorage.setItem('player1', 'PLAYER 1')
}
if (localStorage.getItem('player2') === null) {
    localStorage.setItem('player2', 'PLAYER 2')
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
    whoGoesFirst = Math.random()
    console.log(whoGoesFirst)
    if (gameFinish === true) {
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
    player1 = localStorage.getItem('player1')
    player2 = localStorage.getItem('player2')
    currentClass === 'x' ? message.textContent = `${player1}'s turn!` : message.textContent = `${player2}'s turn!`
}

const keepScore = () => {
    player1Score = localStorage.getItem('player1Score')
    player2Score = localStorage.getItem('player2Score')
    drawScore = localStorage.getItem('tieScore')

    const p1tag = document.querySelector('.player1').children[1]
    const p2tag = document.querySelector('.player2').children[1]

    p1tag.textContent = player1
    p2tag.textContent = player2

    const p1Score = document.querySelector('#p1Score')
    const tieScore = document.querySelector('#tieScore')
    const p2Score = document.querySelector('#p2Score')

    p1Score.textContent = player1Score
    tieScore.textContent = drawScore
    p2Score.textContent = player2Score
}

const playGame = () => {
    if (vsAI === true && currentClass === 'o') {
        aiTurn()
    }
    board.addEventListener('click', (ev) => {
        cell = ev.target
        if (cell.className === 'cell') {
            if (vsAI === false && currentClass === 'x') {
                audioX.play()
                cell.classList.add(currentClass)
                if (checkWin(currentClass)) {
                    won()
                    return gameFinish = true
                }
                if (checkDraw()) {
                    draw()
                    return gameFinish = true
                }
                switchSide()
            } else if (vsAI === false && currentClass === 'o') {
                audioO.play()
                cell.classList.add(currentClass)
                if (checkWin(currentClass)) {
                    won()
                    return gameFinish = true
                }
                if (checkDraw()) {
                    draw()
                    return gameFinish = true
                }
                switchSide()
            } else if (vsAI === true && currentClass === 'x') {
                audioX.play()
                cell.classList.add(currentClass)
                if (checkWin(currentClass)) {
                    won()
                    return gameFinish = true
                }
                if (checkDraw()) {
                    draw()
                    return gameFinish = true
                }
                switchSide()
                aiTurn()
            }
        }
    })
}

const aiTurn = () => {
    let unoccupiedCells = []
    for (i = 0; i < cellElements.length; i++) {
        if (cellElements[i].className === 'cell') {
            unoccupiedCells.push(i)
        }
    }
    let randomIndex = unoccupiedCells[Math.floor(Math.random() * unoccupiedCells.length)]
    cellElements[randomIndex].classList.add(currentClass)
    if (checkWin(currentClass)) {
        won()
        return gameFinish = true
    }
    if (checkDraw()) {
        draw()
        return gameFinish = true
    }
    switchSide()
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
    localStorage.setItem('player1Score', player1Score)
    localStorage.setItem('player2Score', player2Score)
    setTimeout(() => {
        audioDraw.play()
        setTimeout(() => {
            audioDraw.pause()
            audioDraw.currentTime = 0
        }, 2000)
    }, 500)
    winAnimation()
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
    localStorage.setItem('tieScore', drawScore)
    setTimeout(() => {
        audioDraw.play()
    }, 300)
    drawAnimation()
    keepScore()
    resetBtn.style.display = 'flex'
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

const clearLocalBtn = navBtns.children[0]
clearLocalBtn.addEventListener('click', () => {
    audioBtn.play()
    clearLocal()
})
const clearLocal = () => {
    localStorage.setItem('player1', 'PLAYER 1')
    vsAI === true ? localStorage.setItem('player2', 'COMPUTER') : localStorage.setItem('player2', 'PLAYER 2')
    localStorage.setItem('player1Score', 0)
    localStorage.setItem('player2Score', 0)
    localStorage.setItem('tieScore', 0)
    cellElements.forEach(cell => {
        cell.className = 'cell'
    })
    gameFinish = true
    setupGame()
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
            audioDraw.muted = true
            audioBtn.muted = true
        } else if (soundMuted === true) {
            muteIcon.style.display = 'none'
            soundIcon.style.display = 'flex'
            soundMuted = false
            audioX.muted = false
            audioO.muted = false
            audioDraw.muted = false
            audioBtn.muted = false
        }
    })
}

const winAnimation = () => {
    for (i = 0; i < cellElements.length; i++) {
        if (cellElements[i].classList.contains(currentClass)) {
            currentArray.push(i)
        }
    }
    winCon.forEach(combination => {
        if (combination.every(index => currentArray.includes(index))) {
            winArray = combination
        }
    })
    winArray.forEach(index => {
        cellElements[index].style.animation = 'blink 0.5s linear 3'
    })
}

const drawAnimation = () => {
    for (i = 0; i < cellElements.length; i++) {
        cellElements[i].style.animation = 'blink 0.5s linear 3'
    }
}

const toggleAI = () => {
    const aiBtn = navBtns.children[1]
    const aiIcon = aiBtn.children[1]
    const userIcon = aiBtn.children[0]
    aiBtn.addEventListener('click', () => {
        audioBtn.play()
        if (vsAI === false) {
            userIcon.style.display = 'none'
            aiIcon.style.display = 'flex'
            vsAI = true
            console.log('AI on')
            clearLocal()
        } else if (vsAI === true) {
            aiIcon.style.display = 'none'
            userIcon.style.display = 'flex'
            vsAI = false
            console.log('AI off')
            clearLocal()
        }
    })
}

const changeTheme = (theme) => {
    themeChoice.dataset.theme = theme
    nav.dataset.theme = theme
    mainContent.dataset.theme = theme
    cellElements.forEach(cell => {
        cell.dataset.theme = theme
    })
    scoreboard.dataset.theme = theme
    banner.dataset.theme = theme
    document.body.dataset.theme = theme
    themeChoice.style.opacity = 0
}

const changeColour = () => {
    const themeChange = document.querySelector('.palette')
    const blueBtn = document.querySelector('.blueTheme')
    const redBtn = document.querySelector('.redTheme')
    const beigeBtn = document.querySelector('.beigeTheme')
    const darkBtn = document.querySelector('.darkTheme')
    themeChange.addEventListener('click', (ev) => {
        audioBtn.play()
        if (themeChoice.style.opacity === '1') {
            themeChoice.style.opacity = 0
            themeChoice.style.animation = null
        } else {
            themeChoice.style.opacity = 1
            themeChoice.style.animation = 'slide 0.3s linear 1'
        }
    })

    blueBtn.addEventListener('click', () => {
        audioBtn.play()
        changeTheme('blueTheme')
        document.body.style.backgroundColor = '#FEF9EF'
    })
    redBtn.addEventListener('click', () => {
        audioBtn.play()
        changeTheme('')
        document.body.style.backgroundColor = 'white'
    })
    beigeBtn.addEventListener('click', () => {
        audioBtn.play()
        changeTheme('beigeTheme')
        document.body.style.backgroundColor = '#FFFBE9'
    })
    darkBtn.addEventListener('click', () => {
        audioBtn.play()
        changeTheme('darkTheme')
        document.body.style.backgroundColor = 'black'
    })
}

setupGame()

clearBoard()

changeName()

clearLocal()

toggleSound()

changeColour()

toggleAI()