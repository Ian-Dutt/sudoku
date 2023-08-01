<script>
    import Cell from "./innercell.svelte";
    import { generateFullSudoku, isSolved } from "./board";

    const count = [0]
    const dif = 1
    let numbers = [9,9,9,9,9,9,9,9,9]
    let [board, solved, mistakes] = generateFullSudoku(dif)
    let notes = false
</script>

<div class="main-div"> 
    <button on:click={() => {
        [board, solved, mistakes] = generateFullSudoku(dif)
    }}>Reset</button>
    <button on:click={() => notes = !notes}> 
        Notes
    </button>
    <div>
        <br> 
        Mistakes: {mistakes}
    </div>
    <div class="sudoku-board">
        {#each board as row, i}
            {#each row as col, j}
            {#if ((i < 3 || i > 5) && (j < 3 || j > 5)) || (i < 6 && i > 2 &&  j > 2 && j < 6)}
            <!-- <input on:change={() => {
                if(validateGuess(i, j, board, solved) && isSolved(board)){
                    alert('You have solved this puzzle')
                }                
            }}
                class="sudoku-cell odd" type="text" id={`${i}-${j}`} bind:value={board[i][j]}> -->
                <Cell {notes} isOdd={true} bind:value={board[i][j]} {board} {solved} ij={[i,j]}/>
            {:else}
                <Cell {notes} isOdd={false} bind:value={board[i][j]} {board} {solved} ij={[i,j]}/>
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
    
    .main-div{
        text-align: center;
        text-size-adjust: 11px;
        font-size: larger;

    }
    input {
        all: unset;
    }

    

</style>