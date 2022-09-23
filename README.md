# TIC TAC TOE

## Getting Started
- Started with wireframing
- Afted deciding on a basic framework of the layout, started coding the basic html and css
![wireframe](/images/Tictactoe_Wireframe.jpg)
## .container
- A container for all elements
- Used grid for layout
- Used icons from Font-awesome (awesome indeed!)

## nav
- Started coding from the top section of the page - NAV
- Used flexbox for layout

### themeChange
- Used css animation to create a sliding action when clicking on the palette icon to open the div of theme selection

## main-content
- Used flexbox for layout

### .message
- After finishing an early-stage framework of the NAV, I started working on the main-content, which includes a message that shows whose turn it is and result of the game, the board for tic-tac-toe, and a scoreboard

### .board
- Used grid to layout the cells of the board
- Used css pseudo-elements ::before and :: after to create Xs and Os that look nice and are more convenient to change the colours

### .scoreboard
- Used flexbox for layout

## footer
- Added after everything was done
- The buttons don't actually link to anything

## Functionalities

### Placing X and O
- Added eventlistener for clicks on the board
- A class of 'x' or 'o' is added the the targeted cell depending on the currentClass variable
- An X or O is then displayed in the cell using CSS

### Checking for draw and wins
#### Checking for draw:
- Created a function that returns true if all cells in the board contains an 'x' or 'o' in the classList

#### Checking for win:
- Created a function that returns true if one of the combinations in the winCon array contains the currentClass (either 'x' or 'o
') in the classList of every cell in that combination

## Goals checklist:
- -completed- All basic technical requirements 
- -completed- Keep track of multiple game rounds with a win counter
- -(only for name)- Allow players to customize their tokens (X, O, name, picture, etc)
- -completed- Added animations to the game
- -completed- Use LocalStorage to persist data locally to allow games to continue after page refresh
- -completed- Implement a reset button that resets the game without refreshing the whole page
- -completed- Added sound effect to the game
- -completed- Add a simple AI to support one player vs computer mode

## Unsolved problems: 
- Implement a turn timer so that if a player takes too long without making a move, a random move is made for them
- Support custom board sizes: default is 3x3 but you could allow users to choose a larger board