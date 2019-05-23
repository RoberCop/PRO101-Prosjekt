/* Makes stacks inside "treeDiv", causing displayArray to become
 * a two-dimentional array
*/
function newTreeStack()
{
	displayArray.push([]);

	// Each stack holds divs representing nodes
	const stackDiv = document.createElement("div");

	document.getElementById("treeDiv").appendChild(stackDiv);
}

// class to instantiate nodes on the tree
function treeNodeClass(level, text)
{
	this.childs = [];

	this.level = level;

	// adds a new instance to "childs" array
	this.newChild = function()
	{
		this.childs.push(new treeNodeClass(this.level + 1));
	}

	this.addToDisplay = function()
	{
		displayArray[level - 1].push(this);
		for (child of childs) child.addToDisplay();
	}

	this.draw = function()
	{
		// todo
	}

	////////////////////////////////////
	// Dom element
	
	this.domElem = document.createElement("div");
	this.domElem.class = "treeNode";

	let childPar = document.createElement("p");
	childPar.innerText = text;

	this.domElem.appendChild(childPar);

	this.domElem.onclick = function()
	{
		for (let i = level; i < displayArray.length; i++)
		{
			displayArray[i] = null;
		}

		for (child of childs) child.addToDisplay();

		//////////// todo
		// drawNodes();
	}
}

// Makes the root node, meant to be invisible to the user
var root = new treeNodeClass(0);

var displayArray = [];

// Makes 10 stacks to start with
for (let i = 0; i < 10; i++)
{
	newTreeStack();
}

// Example for drawing nodes
/*
function drawNodes()
{
	for (let i = 0; i < displayArray.length; i++)
	{
		for (let j = 0; j < displayArray[i].length; j++)
		{
			displayArray[i][j].draw();
		}
	}
}
*/
