<script>
    const chars = ['1', '2', '3', '4', '5' ,'6', '7', '8', '9']
    const numberList = ['1', '2', '3', '4', '5' ,'6', '7', '8', '9']
    const count = [0]
    const dif = 5
    let mistakes = 0
    let numbers = [9,9,9,9,9,9,9,9,9]
    let [board, solved] = generateFullSudoku(dif)

    function reset(){
        for(const i in numbers){
            numbers[i] = 9
        }
        const [nboard, nsolved] = generateFullSudoku(dif)
        board = nboard
        solved = nsolved
    }

    function generateFullSudoku(difficulty){
        const grid = generateBoard()
        generateSudoku(grid)
        const solved = grid.map((row) => row.slice())
        count[0] = 1
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
        updateCounts(grid)
        return [grid, solved]
    }
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
    function isSolved(board){
        for(let i = 0; i < 9; i++){
            for(let j = 0; j < 9; j++){
                if(board[i][j] == '') return false
            }
        }
        return true
    }

    function validateGuess(i, j){
        const currChange = board[i][j]
        if(currChange !== solved[i][j] || !isValid(i, j, currChange, board)){
            board[i][j] = ''
            mistakes++
            return false
        }
        numbers[chars.indexOf(currChange)]--
        return true
    }

    function isValid(i, j, move, board){
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
                if(newI !== i && newJ !== j && board[newI][newJ] === move) return false
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

    function updateCounts(board){
        for(let i = 0; i < 9; i++){
            for(let j = 0; j < 9; j++){
                if(board[i][j] !== ''){
                    numbers[chars.indexOf(board[i][j])]--
                }
            }
        }
    }
    
    function getRandomInt(max, min) {
      return Math.floor(Math.random() * (max-min)) + min;
    }

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
</script>

<div class="main-div"> 
    <button on:click={() => {
        reset()
    }}>Reset</button>
    <div>
        {#each numbers as count, i}
            |{count} {i+1}'s| &nbsp;
        {/each}
        <br> 
        Mistakes: {mistakes}
    </div>
    <div class="sudoku-board">
        
        {#each board as row, i}
            {#each row as col, j}
            {#if ((i < 3 || i > 5) && (j < 3 || j > 5)) || (i < 6 && i > 2 &&  j > 2 && j < 6)}
            <input on:change={() => {
                if(validateGuess(i, j) && isSolved(board)){
                    alert('You have solved this puzzle')
                }                
            }}
                class="sudoku-cell odd" type="text" id={`${i}-${j}`} bind:value={board[i][j]}>
            {:else}
            <input on:change={() => {
                if(validateGuess(i, j) && isSolved(board)){
                    alert('You have solved this puzzle')
                }                
            }}
                class="sudoku-cell even" type="text" id={`${i}-${j}`} bind:value={board[i][j]}>
                {/if}
            {/each}
        {/each}
    </div>
</div>


<style>
    .sudoku-board{
        display: flex;
        flex-wrap: wrap;
        width: 75vh;
        height: 75vh;
        border: 3px solid green;
        margin: auto;

    }
    .sudoku-cell{
        width: 10%;
        height: 10%;
        border: 2px solid black;
        text-align: center;
        margin: auto;
    }
    .main-div{
        text-align: center;
        text-size-adjust: 11px;
        font-size: larger;

    }
    input {
        all: unset;
    }
    .even{
        background-color: grey;
    }
    .odd{
        background-color: lightgray;
    }
    /* input[type="text"]
    {
        font-size:60px;
    } */

</style>