<script>
    import { isSolved } from "./board";
import {chars, validateGuess, isValid } from "./helpers";
    const guesses = [0,0,0,0,0,0,0,0,0]
    const cont = true
    export let notes = false;
    export let isOdd = false;
    export let value = "";
    export let board = [["s"]];
    export let solved = [["s"]];
    export let ij = [1,1];
    
</script>
<div class={`sudoku-cell ${isOdd ? "odd":"even"}`}>
    <div class="inner"> {guesses[0] !== 0 ? guesses[0] : ""} </div>
    <div class="inner"> {guesses[1] !== 0 ? guesses[1] : ""} </div>
    <div class="inner"> {guesses[2] !== 0 ? guesses[2] : ""} </div>
    <div class="inner"> {guesses[3] !== 0 ? guesses[3] : ""} </div>
    <div class="inner"> {guesses[4] !== 0 ? guesses[4] : ""} </div>
    <div class="inner"> {guesses[5] !== 0 ? guesses[5] : ""} </div>
    <div class="inner"> {guesses[6] !== 0 ? guesses[6] : ""} </div>
    <div class="inner"> {guesses[7] !== 0 ? guesses[7] : ""} </div>
    <div class="inner"> {guesses[8] !== 0 ? guesses[8] : ""} </div>
    
    <input type="string" bind:value={value} on:input={(e) => {
        e.preventDefault()
        if(notes === true){
            if(!chars.includes(value)) value = ""
            else if(guesses[parseInt(value)-1]===0) guesses[parseInt(value)-1] = parseInt(value)
            else guesses[parseInt(value)-1] = 0
            value = ""
        }
    }} 
    on:change={() => {
        if(notes === true) return

        if(!validateGuess(ij[0], ij[1], value, board, solved)) value = ""
        else{
            for(const i in guesses){
                guesses[i] = 0
            }
            if(isSolved(board)) alert("You have solved Sudoku")
        }
    }}>

</div>
<style>
    .sudoku-cell{
        width: 10%;
        height: 10%;
        border: 2px solid black;
        text-align: center;
        margin: auto;
        display: flex;
        flex-wrap: wrap;
    }
    .inner{
        width: 30%;
        height: 30%;
        margin: auto;
        color: blue;
    }
    input{
        margin: 0;
        all: unset;
        width: 100%;
        height: 100%;
        position: relative;
        font-size: 20px;
        transform: translate(0, -90%);

    }
    .even{
        background-color: green;
    }
    .odd{
        background-color: lightgreen;
    }
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
</style>