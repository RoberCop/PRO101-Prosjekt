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
for (let i = 0; i < 30; i++)
	newTreeStack();

const root = getTreeData();
firstDraw();

//Eventlistener for the add button
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
