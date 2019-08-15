function make2dArray(cols, rows){
	let arr = new Array(cols);
	for(let i = 0; i < arr.length; i++){
		arr[i] = new Array(rows);
	}
	
	return arr;

}
var res = 20;
var grid;
var cols;
var rows;
var ready;

function setup() {
	createCanvas(1600, 800);
	//let array = make2dArray(4, 6);
	//console.log(array);
	//console.table(grid);
	frameRate(60);
	cols = width / res;
	rows = height / res;
	grid = make2dArray(cols, rows);
	ready = false;
	background(0);
	
	for (let i = 0; i < cols; i++) {
		for (let j = 0; j < rows; j++) {
		  grid[i][j] = 0;
		}
	}
	  
}



function displayGrid(grid){

	fill(255);
	for(let i = 0; i < grid.length; i++){
		for(let j = 0; j < grid[i].length; j++){
			if(grid[i][j] == 1){
				rect(i*res, j*res, res, res);
			}
		}
	}
}

function countAliveNeighbours(x, y, table){
	let alive = 0;
	
  	for (let i = -1; i < 2; i++) {
    	for (let j = -1; j < 2; j++) {
      		let col = (x + i + cols) % cols;
      		let row = (y + j + rows) % rows;
      		alive += table[col][row];
    	}
  	}
	alive -= table[x][ y];
	return alive;
}
	


function updateGrid(next){
	let aliveNeighbours = 0;
	for(let i = 0; i < next.length; i++){
		for(let j = 0; j < next.length; j++){
			aliveNeighbours = countAliveNeighbours(i, j, next);
			if(next[i][j]){
				if(aliveNeighbours < 2){
					next[i][j] = 0;
				}else if(aliveNeighbours > 3){
					next[i][j] = 0;
				}
			} else {
				if(aliveNeighbours === 3){
					next[i][j] = 1;
				}
			}
		}
	}
	return next;

}
function bringLife(tabela){
	if(mouseIsPressed){
		tabela[(int) (mouseX / res)][(int) (mouseY / res)] = 1;
	}
	//displayGrid(tabela)
	return tabela;
}

function draw() {
	if(ready){
		background(0);
		displayGrid(grid);
		grid = updateGrid(grid);
		if(keyIsPressed){
			ready = false;
		}
		//console.log("dale");
	} else {
		background(0);
		frameRate(60);
		grid = bringLife(grid);
		displayGrid(grid);
		if(keyIsPressed){
			console.log("Que os jogos comecem");
			//console.table(grid);
			frameRate(10);
			ready = true;
		}
	}
}