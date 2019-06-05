// Dom element constants
const treeDiv = document.getElementById("treeDiv");
const html = document.querySelector("html");
const body = document.querySelector("body");
const header = document.querySelector("header");
const section = document.getElementById("gridSection");

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

const nodeOwnerSelect = document.getElementById("ownerSelect");

// used toggle elements on and off with keyboard shortcuts
var toggleQuickAdd = false;
var toggleEditCont = false;

var delPromptActive = false;
var canEdit = true;

// false when overview, true when treeview
var currentPage = false;

// Sets transition on elements
header.style.transition = "0.1s transform ease-in-out";
largeInput.style.transition = "0.1s transform ease-in-out";
backBtn.style.transition = "0.1s transform ease-in-out";
editContainer.style.transition = "0.1s all ease-in-out";
treeDiv.style.transition = "0.1s all ease-in-out";

// Sets position on elements
editContainer.style.left = "0";
editContainer.style.transform = "translate(-100%, 0%)";

const editCntrImg = document.createElement('div');
editCntrImg.setAttribute('class', 'editCntrImg');
section.appendChild(editCntrImg);

moveQuickAdd(false);

document.onkeydown = function(event)
{
	if (!currentPage) return;

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
		selectedParent.childs[selectedParent.selectedChild - 1].setSelectedNode();
		return;
	}

	// arrow right
	if ( (keyPressed === 39) && (selectedNode.indexOfThis < (selectedParent.childs.length - 2)) )
	{
		selectedParent.childs[selectedParent.selectedChild + 1].setSelectedNode();
		return;
	}

	// arrow up
	if ( (keyPressed === 38) && (selectedNode.childs.length > 1) )
	{
		const childIndex = (selectedNode.selectedChild > -1) ? selectedNode.selectedChild : 0;

		selectedNode.childs[childIndex].setSelectedNode();
		return;
	}

	// arrow down
	if ( (keyPressed === 40) && (selectedNode.level > 2) )
	{
		selectedParent.setSelectedNode();
		return;
	}
}

quickAddInput.onkeydown = function(event)
{

	if (!currentPage) return;

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

	selectedNode.childs.splice(selectedNode.childs.length - 1, 1);
	selectedNode.newChild(quickAddInput.value, "Sample Desc", activeUser);
	quickAddInput.value = "";
	selectedNode.newAddBtnRec();
	selectedNode.draw();
}

// Trigger events based on mouseXY
document.onmousemove = (e) => {

	if ( (delPromptActive) || (!currentPage) ) return;

	// Gets mouse position
	const mouseY = e.clientY;
	const mouseX = e.clientX;

	// Opens header
	if ( (mouseY < 70) && (!toggleQuickAdd) )
	{
		moveQuickAdd(true);
		return;
	}

	// Closes header
	if ( (mouseY > 270) && (toggleQuickAdd) )
	{
		moveQuickAdd(false);
	}

	// Opens the editContainer
	if ( (mouseX < 100) && (mouseY > 200) && (!toggleEditCont) )
		moveEditContainer(true);
}

function moveQuickAdd(downOrUp)
{
	if (downOrUp)
	{
		header.style.transform = "translate(0%, 0%)";
		largeInput.style.transform = "translate(-50%, 100%)";
		quickAddInput.focus();
		toggleQuickAdd = true;
	}
	else {
		header.style.transform = "translate(0%, -100%)";
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
		editContainer.style.transform = "translate(-100%, 0%)";
		//editContainer.style.borderRight = "10px solid #9c9c9c";

		treeDiv.style.width = "95vw";
		toggleEditCont = false;
	}
}

backBtn.onclick = function()
{
	gridSection.style.display = "none";
	editContainer.style.display = "none";
	wrapper.style.display = "block";
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
	stackDiv.style.position = "relative";

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
	const currentChilds = root.childs[root.selectedChild];

	for (i in displayArray)
	{
		displayArray[i] = [];
		treeDiv.children[i].innerHTML = "";
	}

	// fill in the displayArray from root
	for (childIndex in currentChilds.childs)
		currentChilds.childs[childIndex].addToDisplay(childIndex == currentChilds.selectedChild);

	drawNodes(0);
}

function makeUserSelection()
{
	for (let i = 0; i < usersArr.length; i++)
	{
		let newOption = document.createElement("option");
		newOption.innerText = usersArr[i].username;
		nodeOwnerSelect.appendChild(newOption);
	}
}

// Makes 10 stacks to start with
for (let i = 0; i < 10; i++)
	newTreeStack();

createWarningElem();
makeUserSelection();
