/* Makes stacks inside "treeDiv", causing displayArray to become
 * a two-dimentional array
*/
function newTreeStack()
{
	displayArray.push([]);
	const treeDiv = document.getElementById("treeDiv");

	// Each stack holds divs representing nodes
	const stackDiv = document.createElement("div");

	treeDiv.appendChild(stackDiv);
}

// class to instantiate nodes on the tree
function treeNodeClass(level)
{
	this.childs = [];
	this.level = level;

	// todo
	this.remove = function()
	{

	}

	// adds a new instance to "childs" array
	this.newChild = function()
	{
		this.childs.push(new treeNodeClass(this.level + 1));
	}

	// test method
	this.printText = function()
	{
		console.log("hello");
	}

	this.draw = function()
	{
		
	}
}

// Makes the root node, meant to be invisible to the user
var root = new treeNodeClass(0);

// test child node
root.newChild();
root.childs[0].printText();

var displayArray = [];

// Makes 10 stacks to start with
for (let i = 0; i < 10; i++)
{
	newTreeStack();
}

// Example for drawing nodes
/*for (let i = 0; i < displayArray.length; i++)
{
	for (let j = 0; j < displayArray[i].length; j++)
	{
		displayArray[i][j].draw();
	}
}*/
