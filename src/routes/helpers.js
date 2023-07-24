export const chars = ['1', '2', '3', '4', '5' ,'6', '7', '8', '9']
/**
 * Validates the sudoke move
 * @param {Number} i
 * @param {Number} j
 * @param {Array<Array<String>>} board 
 * @param {Array<Array<String>>} solved 
 */
export function validateGuess(i, j, board, solved){
    const currChange = board[i][j]
    if(currChange !== solved[i][j] || !isValid(i, j, currChange, board)){
        board[i][j] = ''
        return false
    }
    return true
}

/**
* Function adapted from https://www.youtube.com/watch?v=G_UYXzGuqvM&t=169s&ab_channel=Computerphile
* @param {Array<Array<String>>} board
* @param {Number} i
* @param {Number} j
* @param {String} move
*/
export function isValid(i, j, move, board){
    if( !chars.includes(move) ) {
        return false
    }
    for(let k = 0; k < 9; k++){
        if(k !== j && board[i][k] === move) return false
    }
    for(let k = 0; k < 9; k++){
        if(k !== i && board[k][j] === move) return false
    }
    const j0 = Math.floor(j/3)*3
    const i0 = Math.floor(i/3)*3
    for(let k = 0; k < 3; k++){
        for(let l = 0; l < 3; l++){
            const newI = i0+k
            const newJ = j0+l
            if(newI !== i && newJ !== j && correct(newI, newJ, move, board)) return false
        }
    }
    return true
}

/**
 * @param {Number} i
 * @param {Number} j
 * @param {String} move  
 * @param {Array<Array<String>>} board
 */
function correct(i, j, move, board){
    return board[i][j] === move
}



