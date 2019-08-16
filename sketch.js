//function to create a 2d array
//this function is identical to the one that Daniel used in his video

function make2dArray(cols, rows){
	let arr = new Array(cols);
	for(let i = 0; i < arr.length; i++){
		arr[i] = new Array(rows);
	}
	
	return arr;

}
//width and height of each square
var res = 20;
//array that stores the information of the cells
var grid;
//number os columns
var cols;
//number of rows
var rows;
//boolean variable that states if the animation is running or paused
var paused;


function setup() {
	createCanvas(1600, 800);
	frameRate(60);
	cols = width / res;
	rows = height / res;
	grid = make2dArray(cols, rows);
	paused = true;
	background(0);
	//initializing the grid
	for (let i = 0; i < cols; i++) {
		for (let j = 0; j < rows; j++) {
		  grid[i][j] = 0;
		}
	}
	  
}



function displayGrid(grid){
	fill(255); //change the fill to white
	for(let i = 0; i < grid.length; i++){ //looping through the 2d array
		for(let j = 0; j < grid[i].length; j++){
			if(grid[i][j] == 1){
				rect(i*res, j*res, res, res);
			}
		}
	}
}

//funcition to count how many cells are alive relative to some point in the array
function countAliveNeighbours(x, y, table){
	let alive = 0;
	//loop through the grid and add the value of each cell
	//1 means the cell is alive and 0 that it is dead
  	for (let i = -1; i < 2; i++) {
    	for (let j = -1; j < 2; j++) {
      		let col = (x + i + cols) % cols;
      		let row = (y + j + rows) % rows;
      		alive += table[col][row];
    	}
  	}
	alive -= table[x][y]; //if the center cell was one, subtracts itself 
	//from the count since it wasn't meant to be considered in the sum
	return alive;
}
	

//implements the rules of the Game of Life
//https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life
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
//function to set some cell's value to 1, that is, bring some cell to life
function bringLife(tabela){
	if(mouseIsPressed){
		tabela[(int) (mouseX / res)][(int) (mouseY / res)] = 1;
	}
	//displayGrid(tabela)
	return tabela;
}

//main loop
function draw() {
	if(!paused){
		background(0);
		displayGrid(grid);
		grid = updateGrid(grid);
		if(keyIsPressed){
			paused = true;
		}
	} else {
		background(0);
		frameRate(60);
		grid = bringLife(grid);
		displayGrid(grid);
		if(keyIsPressed){
			console.log("Que os jogos comecem");
			frameRate(10);
			paused = false;
		}
	}
}