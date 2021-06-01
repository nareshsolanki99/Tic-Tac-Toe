var count = 0;
var cells = new Array(3);
for(var i=0;i<3;i++){
    cells[i] = new Array(3);
}
var winnerFound = false;
function cellClickHandler(cellno,rowNo,colNo){
    if(winnerFound){
        return
    }

    var cell = document.getElementById("cell"+cellno);
    if(cell.getAttribute("set")=="set"){
        return
    }
    var x = `<i class="fas fa-times x"></i>`;
    var o = `<i class="far fa-circle o"></i>`;
    cell.setAttribute("set","set");
    if(count%2 == 0){
        cell.innerHTML=x;
        cells[rowNo][colNo] = "x";
       var xWinnerRow = checkRowConnect();
       var xWinnerCol = checkColumnConnect();
       var xWinnerDiag = checkDiagConnect();
       if(xWinnerRow || xWinnerCol || xWinnerDiag){
           var newDiv = document.createElement("div");
           newDiv.className = "result-container";
           newDiv.onclick = clearAll;
           newDiv.innerHTML = `<i class="fas fa-times xWinner"></i> <div class="xWinner">Winner</div>`;
           document.getElementsByClassName("game")[0].style.opacity = "0.2";
           document.getElementsByClassName("game-container")[0].appendChild(newDiv);
           winnerFound = true;
       }
       count++;
       if(winnerFound){
           return
       }
       if(count<8){
           setTimeout(function(){
            compTurnHandler();
           },1000);
       }  
    }else{
        cell.innerHTML = o;
        cells[rowNo][colNo] = "o";
        var oWinnerRow = checkRowConnect();
        var oWinnerCol = checkColumnConnect();
        var oWinnerDiag = checkDiagConnect();
        if(oWinnerCol || oWinnerRow || oWinnerDiag){
            console.log("Player2 is winner");
            var newDiv = document.createElement("div");
            newDiv.className = "result-container";
            newDiv.onclick = clearAll;
            newDiv.innerHTML = `<i class="far fa-circle oWinner"></i><div class="oWinner">Winner</div>`
            document.getElementsByClassName("game")[0].style.opacity = "0.2";
            document.getElementsByClassName("game-container")[0].appendChild(newDiv);
            winnerFound = true;
        }
        count++;
        if(winnerFound){
            return
        }
    }

    if(count == 9){
        console.log("Match is draw");
        var newDiv = document.createElement("div");
            newDiv.className = "result-container";
            newDiv.onclick = clearAll;
            newDiv.innerHTML = `<div><i class="fas fa-times xWinner"></i><i class="far fa-circle oWinner"></i></div><div class="xWinner">DRAW!</div>`;
            document.getElementsByClassName("game")[0].style.opacity = "0.2";
            document.getElementsByClassName("game-container")[0].appendChild(newDiv);
            winnerFound = true;
            if(winnerFound){
                return
            }
    }

}

function compTurnHandler(){
    var randNum = 0;
    while(true){
        randNum = Math.floor((Math.random()*9)+1);
        console.log(randNum);
        var cell = document.getElementById("cell"+randNum);
        if(cell.getAttribute("set") != "set"){
            break;
        }
    }
    var row = cell.getAttribute("row");
    var col = cell.getAttribute("col");
    cellClickHandler(randNum,row,col);
}

function checkRowConnect(){
    for(var i=0;i<3;i++){
        if(cells[i][0] == cells[i][1] && cells[i][1] == cells[i][2] && cells[i][0] != undefined){
            return true
        }
    }
    return false
}

function checkColumnConnect(){
    for(var i=0;i<3;i++){
        if(cells[0][i] == cells[1][i] && cells[1][i] == cells[2][i] && cells[0][i] != undefined){
            return true
        }
    }
    return false
}

function checkDiagConnect(){
    if(cells[0][0] == cells[1][1] && cells[1][1] == cells[2][2] && cells[0][0] != undefined){
        return true;
    }
    if(cells[0][2] == cells[1][1] && cells[1][1] == cells[2][0] && cells[0][2] != undefined){
        return true;
    }
    return false;
}

function clearAll(){
    console.log("Inside Clear All");
    winnerFound = false;
    for(var i=0;i<3;i++){
        cells[i] = new Array(3);
    }
    document.getElementsByClassName("result-container")[0].remove();
    document.getElementsByClassName("game")[0].style.opacity = "1";
    var cell = document.getElementsByClassName("cells")
    for(var i=0;i<9;i++){
        cell[i].innerHTML = "";
        cell[i].setAttribute("set","unset");
    }
    count = 0;

}