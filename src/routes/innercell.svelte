<script>

    export let subVal = "";
    export let id = "c";
    
    
    let value ="";
    const chars = ['1','2','3','4','5','6','7','8','9']
    let state = true;
    /**
    * Function adapted from https://www.youtube.com/watch?v=G_UYXzGuqvM&t=169s&ab_channel=Computerphile
    * @param {String} move
    */
    function isValid(move){
        return chars.includes(move) && subVal !== ""
    }

    function check(val){
        return val === "1"
    }

</script>

<div class="cell" id={`${id}`}>
    <div class="inner" id={`${id}-1`}></div>
    <div class="inner" id={`${id}-2`}></div>
    <div class="inner" id={`${id}-3`}></div>
    <div class="inner" id={`${id}-4`}></div>
    <div class="inner" id={`${id}-5`}></div>
    <div class="inner" id={`${id}-6`}></div>
    <div class="inner" id={`${id}-7`}></div>
    <div class="inner" id={`${id}-8`}></div>
    <div class="inner" id={`${id}-9`}></div>
    <div class="val">{subVal}</div>
    <input id={`${id}-input`} type="text" bind:value={value} on:input={(e) => {
        value = value.charAt(value.length -1)
        if(isValid(value)){
            const innerCell = document.getElementById(id + "-" + value)
            if(!innerCell) return;

            if(innerCell.innerHTML === value) innerCell.innerHTML = ""
            else innerCell.innerHTML = value
        }

    }}
    on:focusout={() => {
        if(!state){
            subVal = value
        }
        value = ""
        
        state = true
    }}
    on:keydown={(e) =>{
        if(e.key === 'Enter'){
            if(check(value)){
                subVal = value
                for(let i = 1; i < 10; i++){
                    const element = document.getElementById(id+"-"+i)
                    if(element && element.innerHTML !== "") element.innerHTML = ""
                }
            }
            value = ""
        }else if(e.key === 'Backspace'){
                for(let i = 9; i > 0; i--){
                    const element = document.getElementById(id+"-"+i)
                    if(element && element.innerHTML !== ""){
                        element.innerHTML = ""
                        return
                    }
                }
                subVal = ""
            }
        }
    }>

</div>

<style>
    .cell{
        width: calc(75vh);
        height: calc(75vh);
        background: pink;
        display: flex;
        flex-wrap: wrap;
    }
    .inner{
        width: 30%;
        height: 30%;
        margin: 1.6%;
        background-color: lightblue;
    }
    input{
        margin: 0;
        all: unset;
        width: 100%;
        height: 100%;
        position: relative;
        top: calc(-2 * 75vh);
    }
    .val{
        display: flex;
        position: relative;
        width: 100%;
        height: 100%;
        justify-content: center;
        align-items: center;
        top: calc(-75vh);
    }
    .even{
        background-color: grey;
    }
    .odd{
        background-color: lightgray;
    }
</style>