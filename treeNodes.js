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

	this.selectedChild = 0;
	this.indexOfThis = index;

	// adds a new instance to "childs" array
	this.newChild = function(newText)
	{
		this.childs.push(new treeNodeClass(level + 1, this, this.childs.length, newText));
	}

	this.addToDisplay = function(isSelected)
	{
		// add this node to the displayArray if its not root
		if (level > 0)
			displayArray[level - 1].push(this);

		this.domElem.style.left = (151 * this.indexOfThis);

		if (isSelected)
		{
			// style for when node is selected
			this.removeBtn.style.visibility = "visible";
			this.domElem.style.backgroundColor = "#CCCCFF";

			// if selected, call this same method on child objects
			for (childIndex in this.childs)
				this.childs[childIndex].addToDisplay(childIndex == this.selectedChild);
		}
		else {
			// style for when node is unselected
			this.removeBtn.style.visibility = "hidden";
			this.domElem.style.backgroundColor = "#FFFFFF";
		}
	}

	////////////////////////////////////
	// Dom element
	
	this.domElem = document.createElement("div");
	this.domElem.className = "treeNode";
	this.domElem.treeNode = this;

	this.childPar = document.createElement("p");
	this.childPar.innerText = text;

	this.removeBtn = document.createElement("button");
	this.removeBtn.innerText = "X";
	this.removeBtn.style.right = 0;
	this.removeBtn.style.top = 0;
	this.removeBtn.style.visibility = "hidden";
	this.removeBtn.treeNode = this;

	this.domElem.appendChild(this.childPar);
	this.domElem.appendChild(this.removeBtn);

	this.domElem.onclick = function()
	{
		// clear this stack and outwards in the display array
		for (let i = level - 1; i < displayArray.length; i++)
			displayArray[i] = [];

		// set this node to be the selected child, on the parent
		parent.selectedChild = this.treeNode.indexOfThis;

		// recursively add to display based on selected nodes from parent node, and draw the new nodes
		parent.addToDisplay(true);
		drawNodes(level - 1);
	}

	this.removeBtn.onclick = function()
	{
		const treeNodeIndex = this.treeNode.indexOfThis;

		// remove selected node, and fill inn from the right
		parent.childs.splice(treeNodeIndex, 1);

		// update indicies on other nodes to the right(reference members)
		for (let i = treeNodeIndex; i < parent.childs.length; i++)
			parent.childs[i].indexOfThis = i;
	}
}

// Redraw all nodes from a stack and outward
function drawNodes(level)
{
	for (let i = level; i < displayArray.length; i++)
	{
		// clear dom elements in the stack
		treeDiv.children[i].innerHTML = "";

		// add each node to the stack
		for (let j = 0; j < displayArray[i].length; j++)
		{
			treeDiv.children[i].appendChild(displayArray[i][j].domElem);
		}
	}
}

// draw all the nodes from root the first time
function firstDraw()
{
	// fill in the displayArray from root
	for (childIndex in root.childs)
		root.childs[childIndex].addToDisplay(childIndex == root.selectedChild);

	drawNodes(0);
}

// Makes the root node, meant to be invisible to the user
const root = new treeNodeClass(0, this, 0, null);

// becomes two-dimentional array, holds objects meant to be displayed
const displayArray = [];

// Makes 10 stacks to start with
for (let i = 0; i < 30; i++)
	newTreeStack();

// Hard code sample nodes for testing
root.newChild("Project");

root.childs[0].newChild("Make a house");
root.childs[0].newChild("Make a car");
root.childs[0].newChild("Make a computer");

//House
root.childs[0].childs[0].newChild("Make a foundation");
root.childs[0].childs[0].newChild("Make walls");
root.childs[0].childs[0].newChild("Make a roof");
root.childs[0].childs[0].newChild("Make windows");
root.childs[0].childs[0].newChild("Make a door");
root.childs[0].childs[0].newChild("test");
root.childs[0].childs[0].newChild("test");

root.childs[0].childs[0].childs[0].newChild("Get some concrete");
root.childs[0].childs[0].childs[1].newChild("Get some wood");

//Car
root.childs[0].childs[1].newChild("Make a engine");
root.childs[0].childs[1].newChild("Make a frame");
root.childs[0].childs[1].newChild("Make some wheels");

firstDraw();

const html = document.querySelector('html');
document.addEventListener('click', e => {
	if (e.target.dataset.btn == 'addProject'){
		console.log('Add btn clicked');
		const el = document.createElement('div');
		el.setAttribute('class', 'projectDetails');
		el.innerText = 'Create new project';
		html.style.backgroundColor = "rgba(0, 0, 0, 0.5)"
		treeDiv.appendChild(el);

	}
})
