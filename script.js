// Dom element constants
const treeDiv = document.getElementById("treeDiv"); 

/* Makes stacks inside "treeDiv", causing displayArray to become
 * a two-dimentional array
*/
function newTreeStack()
{
	displayArray.push([]);

	// Each stack holds divs representing nodes
	const stackDiv = document.createElement("div");
	stackDiv.className = "treeStack";

	treeDiv.appendChild(stackDiv);
}

// class to instantiate nodes on the tree
function treeNodeClass(level, parent, index, text)
{
	this.childs = [];

	this.level = level;
	this.parent = parent;
	
	this.selectedChild = 0;

	let indexOfThis = index;

	// adds a new instance to "childs" array
	this.newChild = function(newText)
	{
		this.childs.push(new treeNodeClass(this.level + 1, this, this.childs.length, newText));
	}

	this.addToDisplay = function(isSelected)
	{
		displayArray[this.level - 1].push(this);

		if (isSelected)
			for (childIndex in this.childs)
				this.childs[childIndex].addToDisplay(childIndex == this.selectedChild);
	}

	////////////////////////////////////
	// Dom element
	
	this.domElem = document.createElement("div");
	this.domElem.className = "treeNode";
	this.domElem.treeNode = this;

	this.childPar = document.createElement("p");
	this.childPar.innerText = text;

	this.domElem.appendChild(this.childPar);

	this.domElem.onclick = function()
	{
		for (let i = this.treeNode.level - 1; i < displayArray.length; i++)
			displayArray[i] = [];

		this.treeNode.parent.selectedChild = indexOfThis;
		this.treeNode.parent.addToDisplay(true);
		drawNodes(this.treeNode.level - 1);
	}

	this.domElem.draw = function(nodeIndex)
	{
		this.style.left = (101 * nodeIndex);
		this.style.backgroundColor = (this.treeNode.parent.selectedChild == indexOfThis) ? "#CCCCFF" : "#FFFFFF";

	}
}

// Example for drawing nodes
function drawNodes(level)
{
	for (let i = level; i < displayArray.length; i++)
	{
		treeDiv.children[i].innerHTML = "";

		for (let j = 0; j < displayArray[i].length; j++)
		{
			displayArray[i][j].domElem.draw(j);
			treeDiv.children[i].appendChild(displayArray[i][j].domElem);
		}
	}
}

// draw all the nodes from root the first time
function firstDraw()
{
	for (childIndex in root.childs)
		root.childs[childIndex].addToDisplay(childIndex == root.selectedChild);

	drawNodes(0);
}

// Makes the root node, meant to be invisible to the user
const root = new treeNodeClass(0, null, null);

const displayArray = [];

// Makes 10 stacks to start with
for (let i = 0; i < 10; i++)
	newTreeStack();

// Hard code sample nodes for testing
root.newChild("Project");

root.childs[0].newChild("Make a house");
root.childs[0].newChild("Make a car");
root.childs[0].newChild("Make a computer");

root.childs[0].childs[0].newChild("Make a foundation");
root.childs[0].childs[0].newChild("Make walls");
root.childs[0].childs[0].newChild("Make a roof");
root.childs[0].childs[0].newChild("Make windows");
root.childs[0].childs[0].newChild("Make a door");

root.childs[0].childs[0].childs[1].newChild("Get some wood");

root.childs[0].childs[1].newChild("Make a engine");
root.childs[0].childs[1].newChild("Make a frame");
root.childs[0].childs[1].newChild("Make some wheels");

firstDraw();
