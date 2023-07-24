import { isValid } from "./helpers"

const numberList = ['1', '2', '3', '4', '5' ,'6', '7', '8', '9']

/**
 * @param {Number} difficulty 
 * @returns {[Array<Array<String>>, Array<Array<String>>, Number]}
 */
export function generateFullSudoku(difficulty){
    const grid = generateBoard()
    generateSudoku(grid)
    const solved = grid.map((row) => row.slice())
    while(difficulty > 0){
        let row = getRandomInt(9, 0)
        let col = getRandomInt(9, 0)
        while(grid[row][col] === ''){
            row = getRandomInt(9, 0)
            col = getRandomInt(9, 0)
        }
        grid[row][col] = ''
        difficulty--
    }
    return [grid, solved, 0]
}
/** Function adapted from https://www.101computing.net/sudoku-generator-algorithm/ 
 * @param {Array<Array<String>>} board
*/
function generateSudoku(board){
    let row = 0
    let col = 0
    for(let i = 0; i < 81; i++){
        row = Math.floor(i / 9)
        col = i % 9
        if(board[row][col]===''){
            shuffle(numberList)
            for(const value of numberList){
                if(isValid(row, col, value, board)) {
                    board[row][col] = value
                    
                    if(isSolved(board)){
                        return true
                    }
                    else if(generateSudoku(board)) return true
                }
            }
            break
        }
    }
    board[row][col] = ''
}
/**
* @param {Array<Array<String>>} board
*/
export function isSolved(board){
    for(let i = 0; i < 9; i++){
        for(let j = 0; j < 9; j++){
            if(board[i][j] == '') return false
        }
    }
    return true
}
function generateBoard(){
    const board = []
    for(let i = 0; i < 9; i++){
        const row = []
        for(let j = 0; j < 9; j++){
            row.push('')
        }
        board.push(row)
    }
    return board
}

/**
 * 
 * @param {Number} max
 * @param {Number} min
 */
function getRandomInt(max, min) {
    return Math.floor(Math.random() * (max-min)) + min;
}

/**
* @param {Array<String>} array
*/
function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
      while (currentIndex != 0) {
      
        // Pick a remaining element.
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
        // And swap it with the current element.
          [array[currentIndex], array[randomIndex]] = [
              array[randomIndex], array[currentIndex]];
      }
    
      return array;
  }