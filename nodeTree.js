// Dom element constants
const treeDiv = document.getElementById("treeDiv");
const html = document.querySelector("html");
const body = document.querySelector("body");
const header = document.querySelector("header");

const largeInput = document.querySelector("#largeInput");
const backBtn = document.querySelector("#backBtn");
const editContainer = document.querySelector("#editContainer");
const shader = document.createElement("div");
shader.setAttribute("class", "shader");

const nodeTitle = document.getElementById("nodeTitle");
const nodeDesc = document.getElementById("nodeDesc");

const doneNode = document.getElementById("doneNode");
const inProgNode = document.getElementById("inProgNode");
const notDoneNode = document.getElementById("notDoneNode");

const deleteNode = document.getElementById("deleteNode");
const refreshNode = document.getElementById("refreshNode");
const saveNode = document.getElementById("saveNode");

const quickAddInput = document.getElementById("quickAddInput");
const quickAddPlus = document.getElementById("quickAddPlus");

// used toggle elements on and off with keyboard shortcuts
var toggleQuickAdd = false;
var toggleEditCont = false;

var delPromptActive = false;
var canEdit = false;

// Sets transition on elements
header.style.transition = "0.1s transform ease-in-out";
largeInput.style.transition = "0.1s transform ease-in-out";
backBtn.style.transition = "0.1s transform ease-in-out";
editContainer.style.transition = "0.1s all ease-in-out";
treeDiv.style.transition = "0.1s all ease-in-out";

// Sets position on elements
editContainer.style.left = "0";
editContainer.style.transform = "translate(-100%, 0%)";
moveQuickAdd(false);

document.onkeydown = function(event)
{
	var keyPressed = event.which || event.keycode;

	if (delPromptActive)
	{
		if (keyPressed === 13)
		{
			selectedNode.removeNode();
			body.removeChild(shader);
			delPromptActive = false;
			return;
		}
	}

	// open node editor with ctrl-z
	if ( (event.ctrlKey) && (keyPressed === 90) )
	{
		moveEditContainer(!toggleEditCont);
		return;
	}

	// open quickAdd with ctrl-q
	if ( (event.ctrlKey) && (keyPressed === 81) )
	{
		moveQuickAdd(!toggleQuickAdd);

		if (!toggleQuickAdd)
			nodeTitle.focus(); // only fix to get rid of focus

		return;
	}

	// make sure elements are closed, as arrows are used when typing
	if ( (toggleEditCont) || (toggleQuickAdd) ) return;

	const selectedParent = selectedNode.parent;

	// arrow left
	if ( (keyPressed === 37) && (selectedNode.indexOfThis > 0) )
	{
		selectedParent.getChilds()[selectedParent.selectedChild - 1].setSelectedNode();
		return;
	}

	// arrow right
	if ( (keyPressed === 39) && (selectedNode.indexOfThis < (selectedParent.getChilds().length - 2)) )
	{
		selectedParent.getChilds()[selectedParent.selectedChild + 1].setSelectedNode();
		return;
	}

	// arrow up
	if ( (keyPressed === 38) && (selectedNode.getChilds().length > 1) )
	{
		const childIndex = (selectedNode.selectedChild > -1) ? selectedNode.selectedChild : 0;

		selectedNode.getChilds()[childIndex].setSelectedNode();
		return;
	}

	// arrow down
	if ( (keyPressed === 40) && (selectedNode.getLevel() > 1) )
	{
		selectedParent.setSelectedNode();
		return;
	}
}

quickAddInput.onkeydown = function(event)
{
	var keyPressed = event.which || event.keycode;

	// enter tries to make a new node
	if (keyPressed === 13)
		quickNodeAdd();
}

quickAddPlus.onclick = function()
{
	quickNodeAdd();
}

function quickNodeAdd()
{
	// always check if input is empty first, then also check authorization
	if ( (quickAddInput.value == "") || (!selectedNode.recAccessCheck()) ) return;

	selectedNode.getChilds().splice(selectedNode.getChilds().length - 1, 1);
	selectedNode.newChild(quickAddInput.value, "Sample Desc");
	quickAddInput.value = "";
	selectedNode.newAddBtnRec();
	selectedNode.draw();
}

// Trigger events based on mouseXY
document.onmousemove = (e) => {

	if (delPromptActive) return;

	// Gets mouse position
	const mouseY = e.clientY;
	const mouseX = e.clientX;

	// Closes header
	if ( (mouseY < 200) && (!toggleQuickAdd) )
	{
		moveQuickAdd(true);
		return;
	}

	// Opens header
	if ( (mouseY > 270) && (toggleQuickAdd) )
	{
		moveQuickAdd(false);
	}

	// Hides the editContainer
	if ( (mouseX > 350) && (toggleEditCont) )
		moveEditContainer(false);

	// Opens the editContainer
	if ( (mouseX < 100) && (mouseY > 200) && (!toggleEditCont) )
		moveEditContainer(true);
}

function moveQuickAdd(downOrUp)
{
	if (downOrUp)
	{
		header.style.transform = "translate(0%, 0%)";
		backBtn.style.transform = "translate(0, 0%)";
		largeInput.style.transform = "translate(-50%, 100%)";
		quickAddInput.focus();
		toggleQuickAdd = true;
	}
	else {
		header.style.transform = "translate(0%, -100%)";
		backBtn.style.transform = "translate(0, -100%)";
		largeInput.style.transform = "translate(-50%, -100%)";
		toggleQuickAdd = false;
	}
}

function moveEditContainer(rightOrleft)
{
	if (rightOrleft)
	{
		// only update content when opening or refreshing, to reduce processing of authorization
		selectedNode.refreshNodeEdit();

		editContainer.style.transform = "translate(0%, 0%)";
		editContainer.style.borderRight = "1px solid";
		treeDiv.style.width = "80vw";

		nodeTitle.focus();
		toggleEditCont = true;
	}
	else {
		editContainer.style.transform = "translate(-105%, 0%)";
		editContainer.style.borderRight = "10px solid #9c9c9c";

		treeDiv.style.width = "95vw";
		toggleEditCont = false;
	}
}

// Warning element
function createWarningElem()
{
	// Module
	const module = document.createElement("div");
	module.dataset.clicked = "true";

	// Title
	const h1 = document.createElement("h1");
	h1.innerText = "Hold it!";

	// Paragraph in module
	const paragraph = document.createElement("p");
	paragraph.innerText = "This will also delete the child nodes. Are you sure you want to delete this?";

	// Button container
	const btnContainer = document.createElement("div");
	btnContainer.setAttribute("class", "edit-btn-container");

	// Delete button
	const deleteBtn = document.createElement("div");
	deleteBtn.innerText = "Delete anyway";
	btnContainer.appendChild(deleteBtn);

	deleteBtn.onclick = function()
	{
		selectedNode.removeNode();
		body.removeChild(shader);
		delPromptActive = false;
	}

	// Cancel button
	const cancelBtn = document.createElement("h4");
	cancelBtn.dataset.btn = "cancel";
	cancelBtn.innerText = "Cancel";
	btnContainer.appendChild(cancelBtn);

	cancelBtn.onclick = function()
	{
		body.removeChild(shader);
		delPromptActive = false;
	}

	// Attributes
	module.setAttribute("class", "module");
	deleteBtn.setAttribute("class", "red deleteBtn module-btn");
	cancelBtn.setAttribute("class", "green cancelBtn module-btn");

	module.appendChild(h1);
	module.appendChild(paragraph);
	module.appendChild(btnContainer);
	shader.appendChild(module);
}

deleteNode.onclick = function()
{
	if (!canEdit) return;

	body.appendChild(shader);
	delPromptActive = true;
}

refreshNode.onclick = function()
{
	selectedNode.refreshNodeEdit();
}

saveNode.onclick = function()
{
	if (!canEdit) return;

	selectedNode.saveNodeEdit();
}

doneNode.onclick = function()
{
	selectedNode.tryStatus(2);
}

inProgNode.onclick = function()
{
	selectedNode.tryStatus(1);
}

notDoneNode.onclick = function()
{
	selectedNode.tryStatus(0);
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
			treeDiv.children[i].appendChild(displayArray[i][j].domElem);
	}
}

// draw all the nodes from root the first time
function firstDraw()
{
	// fill in the displayArray from root
	for (childIndex in root.getChilds())
		root.getChilds()[childIndex].addToDisplay(childIndex == root.selectedChild);

	drawNodes(0);
}

// Makes 10 stacks to start with
for (let i = 0; i < 10; i++)
	newTreeStack();

const root = getTreeData();
root.newAddBtnRec();
root.selectedChild = 0;

createWarningElem();

var selectedNode = root.getChilds()[0];
selectedNode.domBody.style.backgroundColor = "#CCFFCC";
selectedNode.refreshNodeEdit();

// todo: add process of getting user from login
var activeUser = usersArr[0];
document.getElementById("userText").innerText = "Username: " + activeUser.username;

firstDraw();
