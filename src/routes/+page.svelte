<script>
    import Innercell from "./innercell.svelte";
    import {chars, validateGuess, isValid } from "./helpers";
    import { generateFullSudoku, isSolved } from "./board";

    const numberList = ['1', '2', '3', '4', '5' ,'6', '7', '8', '9']
    const count = [0]
    const dif = 51
    let numbers = [9,9,9,9,9,9,9,9,9]
    let [board, solved, mistakes] = generateFullSudoku(dif)

</script>

<div class="main-div"> 
    <button on:click={() => {
        [board, solved, mistakes] = generateFullSudoku(dif)
    }}>Reset</button>
    <div>
        <!-- {#each numbers as count, i}
            |{count} {i+1}'s| &nbsp;
        {/each} -->
        <br> 
        Mistakes: {mistakes}
    </div>
    <div class="sudoku-board">
        {#each board as row, i}
            {#each row as col, j}
            {#if ((i < 3 || i > 5) && (j < 3 || j > 5)) || (i < 6 && i > 2 &&  j > 2 && j < 6)}
            <input on:change={() => {
                if(validateGuess(i, j, board, solved) && isSolved(board)){
                    alert('You have solved this puzzle')
                }                
            }}
                class="sudoku-cell odd" type="text" id={`${i}-${j}`} bind:value={board[i][j]}>
            {:else}
            <input on:change={() => {
                if(validateGuess(i, j, board, solved) && isSolved(board)){
                    alert('You have solved this puzzle')
                }                
            }}
                class="sudoku-cell even" type="text" id={`${i}-${j}`} bind:value={board[i][j]}>
                {/if}
            {/each}
        {/each}
    </div>
    <!-- <Innercell id={"c4"} subVal={"5"} /> -->
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

    

</style>