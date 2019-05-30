// Dom element constants
const treeDiv = document.getElementById('treeDiv');
const html = document.querySelector('html');
const body = document.querySelector('body');
const header = document.querySelector('header');

const largeInput = document.querySelector('#largeInput');
const menuBar = document.querySelector('#menuBar');
const editContainer = document.querySelector('#editContainer');
const shader = document.createElement('div');
shader.setAttribute('class', 'shader');

const nodeTitle = document.getElementById("nodeTitle");
const nodeDesc = document.getElementById("nodeDesc");

const doneNode = document.getElementById("doneNode");
const notDoneNode = document.getElementById("notDoneNode");

const deleteNode = document.getElementById("deleteNode");
const refreshNode = document.getElementById("refreshNode");
const saveNode = document.getElementById("saveNode");

//Sets transition on elements
header.style.transition = "0.1s transform ease-in-out";
largeInput.style.transition = "0.1s transform ease-in-out";
menuBar.style.transition = "0.1s transform ease-in-out";
editContainer.style.transition = "0.1s all ease-in-out";
treeDiv.style.transition = "0.1s all ease-in-out";

//Sets position on elements
editContainer.style.left = "0";
editContainer.style.transform = "translate(-100%, 0%)";

//TODO: Make it possible to add task to selected node when pressing enter

//Trigger events base on mouseXY
document.onmousemove = (e) => {

	//Gets mouse position
	let mouseY = e.clientY;
	let mouseX = e.clientX;

	//Lowers header
	if (mouseY < 100)
	{
		header.style.transform = "translate(0%, 0%)";
		menuBar.style.transform = "translate(0, 0%)";
		largeInput.style.transform = "translate(-50%, 100%)";
	}
	//Rises header
	if (mouseY > 200)
	{
		header.style.transform = "translate(0%, -100%)";
		menuBar.style.transform = "translate(0, 100%)";
		largeInput.style.transform = "translate(-50%, -100%)";
	}
	//Hides the editContainer
	if (mouseX > 300)
	{
		editContainer.style.transform = "translate(-100%, 0%)";
		editContainer.style.borderRight = "50px solid black";
		treeDiv.style.width = "95vw";
	}
};

//Displays the editContainer
editContainer.onmouseover = (e) => {
	editContainer.style.transform = "translate(0%, 0%)";
	editContainer.style.borderRight = "1px solid";
	treeDiv.style.width = "80vw";
}

//Warning element
function createWarningElem()
{
	//Module
	const module = document.createElement('div');
	module.dataset.clicked = "true";

	//Title
	const h1 = document.createElement('h1');
	h1.innerText = 'Hold it!';

	//Paragraph in module
	const paragraph = document.createElement('p');
	paragraph.innerText = 'This wil also delete the child nodes. Are you sure you want to delete this?';

	//Button container
	const btnContainer = document.createElement('div');
	btnContainer.setAttribute('class', 'edit-btn-container');

	//Delete button
	const deleteBtn = document.createElement('div');
	deleteBtn.innerText = "Delete anyway";
	btnContainer.appendChild(deleteBtn);

	deleteBtn.onclick = function ()
	{
		selectedNode.removeNode();
		body.removeChild(shader);
	}

	//Cancel button
	const cancelBtn = document.createElement('h4');
	cancelBtn.dataset.btn = "cancel";
	cancelBtn.innerText = "Cancel";
	btnContainer.appendChild(cancelBtn);

	cancelBtn.onclick = function ()
	{
		body.removeChild(shader);
	}

	//Attributes
	module.setAttribute('class', 'module');
	deleteBtn.setAttribute('class', 'red deleteBtn module-btn');
	cancelBtn.setAttribute('class', 'green cancelBtn module-btn');

	module.appendChild(h1);
	module.appendChild(paragraph);
	module.appendChild(btnContainer);
	shader.appendChild(module);
}

deleteNode.onclick = function ()
{
	body.appendChild(shader);
}

refreshNode.onclick = function()
{
	selectedNode.refreshNodeEdit();
}

saveNode.onclick = function()
{
	selectedNode.saveNodeEdit();
}

doneNode.onclick = function()
{
	selectedNode.setDone(true);
}

notDoneNode.onclick = function()
{
	selectedNode.setDone(false);
}

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

// Makes 10 stacks to start with
for (let i = 0; i < 10; i++)
	newTreeStack();

const root = getTreeData();
root.newAddBtnRec();

createWarningElem();

var selectedNode = root.childs[0];

firstDraw();
