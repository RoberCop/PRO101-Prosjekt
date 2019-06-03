// becomes two-dimentional array, holds objects meant to be displayed
const displayArray = [];

// used instead of dataTransfer, because all we need is a object reference
var currentDragObj;

// class to instantiate nodes on the tree
function treeNodeClass(level, parent, index, title, desc, status)
{
	// used when this gets replaced, alternative to adding properties to dom
	var self = this;
	var user;
	var childs = [];

	this.parent = parent;
	this.selectedChild = -1;
	this.indexOfThis = index;
	this.status = status;

	if (title === undefined) title = "";

	if (desc === undefined) desc = "";

	// adds a new instance to "childs" array
	this.newChild = function(newTitle, newDesc, newUser)
	{
		const preLength = childs.length;

		// create a child based on own variables, and current arguments
		childs.push(new treeNodeClass(level + 1, this, preLength, newTitle, newDesc, 0));

		if (newUser !== undefined) childs[preLength].setUser(newUser);

		if (level > 0) this.setStatusRec();
	}

	this.newAddBtnRec = function()
	{
		for (child of childs)
			if (child.selectedChild !== undefined)
				child.newAddBtnRec();

		const checkIndex = childs.length - 1;

		if ( (checkIndex === -1) || (childs[checkIndex].selectedChild !== undefined) )
			childs.push(new addNodeBtnClass(level + 1, this, childs.length));
	}

	this.addToDisplay = function(isSelected, isStart)
	{
		// add this node to the displayArray if its not the starter object
		if (!isStart) displayArray[level - 1].push(this);

		const statusColor = (this.status > 0) ? ( (this.status > 1) ? "#0F0" : "#FF0" ) : "#F00";
		this.domElem.style.borderColor = statusColor;

		if (isSelected)
		{
			// if selected, call this same method on child objects
			for (childIndex in childs)
				childs[childIndex].addToDisplay(childIndex == this.selectedChild, false);
		}
		else {
			// style for when node is unselected
			this.domBody.style.backgroundColor = "#FFF";
		}
	}

	this.draw = function()
	{
		// clear this stack and outwards in the display array
		for (let i = level - 1; i < displayArray.length; i++) displayArray[i] = [];

		/* recursively add to display based on selected nodes 
		 * from parent node, and draw the new nodes
		 */
		this.parent.addToDisplay(true, true);
		drawNodes(level - 1);
	}

	// only used when removing with remove button
	this.removeNode = function()
	{
		// remove selected node
		this.parent.getChilds().splice(this.indexOfThis, 1);

		// update indicies on other nodes to the right of deleted node(reference members)
		for (let i = this.indexOfThis; i < this.parent.getChilds().length; i++)
			this.parent.getChilds()[i].indexOfThis--;

		let newIndex = this.indexOfThis;

		if (this.parent.getChilds()[newIndex].selectedChild === undefined) newIndex--;

		if (newIndex < 0)
			selectedNode = this.parent;
		else {
			this.parent.setStatusRec();
			selectedNode = this.parent.getChilds()[newIndex];
		}

		this.parent.selectedChild = newIndex;
		selectedNode.domBody.style.backgroundColor = "#CCFFCC";

		this.parent.refreshNodeEdit();
		this.draw();
	}

	this.setSelectedNode = function()
	{
		selectedNode.domBody.style.backgroundColor = "#CCCCFF";

		// set this node to be the selected child, on the parent
		this.parent.selectedChild = this.indexOfThis;
		selectedNode = this;

		this.domBody.style.backgroundColor = "#CCFFCC";

		this.draw();
	}

	this.refreshNodeEdit = function()
	{
		nodeTitle.value = title;
		nodeDesc.value = desc;

		if (this.recAccessCheck())
		{
			if (!canEdit)
			{
				doneNode.style.visibility = "visible";
				inProgNode.style.visibility = "visible";
				notDoneNode.style.visibility = "visible";

				deleteNode.style.filter = "grayscale(0%)";
				refreshNode.style.filter = "grayscale(0%)";
				saveNode.style.filter = "grayscale(0%)";

				canEdit = true;
				nodeTitle.disabled = false;
				nodeDesc.disabled = false;
			}
		}
		else if (canEdit)
		{
			doneNode.style.visibility = "hidden";
			inProgNode.style.visibility = "hidden";
			notDoneNode.style.visibility = "hidden";

			deleteNode.style.filter = "grayscale(100%)";
			refreshNode.style.filter = "grayscale(100%)";
			saveNode.style.filter = "grayscale(100%)";

			canEdit = false;
			nodeTitle.disabled = true;
			nodeDesc.disabled = true;
		}

	}

	this.saveNodeEdit = function()
	{
		title = nodeTitle.value;
		desc = nodeDesc.value;

		this.childH4.innerText = (title != "") ? title : "-No Title-";

		// todo: add saving of owner
	}

	this.tryStatus = function(newStatus)
	{
		if ( (childs.length > 1) || (this.status === newStatus) ) return;

		this.setStatus(newStatus);
	}

	this.setStatus = function(newStatus)
	{
		// setting to newStatus allowed
		this.status = newStatus;

		const statusColor = (newStatus > 0) ? ( (newStatus > 1) ? "#0F0" : "#FF0" ) : "#F00";
		this.domElem.style.borderColor = statusColor;

		if (level > 1) this.parent.setStatusRec();
	}

	this.setStatusRec = function()
	{
		var canBeGreen = true;

		for (child of childs)
		{
			if ( (child.status < 2) &&
				 (child.selectedChild !== undefined) )
			{
				if (child.status === 1)
				{
					this.setStatus(1);
					return;
				}
				else canBeGreen = false;
			}
		}

		this.setStatus((canBeGreen) ? 2 : 0);
	}

	this.setLevelRec = function()
	{
		level = this.parent.getLevel() + 1;

		for (child of childs) child.setLevelRec();
	}

	// returns if active user is allowed to modify node
	this.recAccessCheck = function()
	{
		if (user == activeUser) return true;

		// return true recursivly when autorized
		if (level > 1)
			if (this.parent.recAccessCheck()) return true;

		// return false, over and over to make statement fail
		return false;
	}

	this.setUser = function(newUser)
	{
		user = newUser;
	}

	this.getChilds = function()
	{
		return childs;
	}

	this.getLevel = function()
	{
		return level;
	}

	// ! test method !
	this.getUser = function()
	{
		return user;
	}

	////////////////////////////////////
	// Dom element
	
	// public elements
	this.domElem = document.createElement("div");
	this.domHeader = document.createElement("div");
	this.childH4 = document.createElement("h4");
	this.domBody = document.createElement("div");

	this.domElem.className = "treeNode";
	this.domElem.draggable = "true";

	this.domElem.style.borderWidth = "2px";
	this.domElem.style.borderStyle = "solid";
	this.domElem.style.borderColor = "red";
	this.domElem.style.boxShadow = "0px 0px 4px";

	this.domHeader.className = "node-header";

	this.childH4.innerText = title;

	this.domBody.className = "node-body";

	// private elements
	const icon = document.createElement("i");
	const light = document.createElement("div");

	icon.className = "fas fa-user";

	light.className = "light";
	light.style.visibility = "hidden";

	// append to set structure
	this.domHeader.appendChild(this.childH4);

	this.domBody.appendChild(icon);
	this.domBody.appendChild(light);

	this.domElem.appendChild(this.domHeader);
	this.domElem.appendChild(this.domBody);

	/* Prevents mouse events from occuring on child elements,
	 * neccessary due to how drag and drop works.
	 */
	for (let i = 0; i < this.domElem.childNodes.length; i++)
		this.domElem.childNodes[i].style.pointerEvents = "none";

	this.domElem.onclick = function()
	{
		self.setSelectedNode();
	}

	this.domElem.ondragstart = function()
	{
		currentDragObj = self;
	}

	this.domElem.ondragover = function(event)
	{
		event.preventDefault();
	}

	this.domElem.ondrop = function()
	{
		dragDropMove(self);
	}
}

// used by both node classes to move dragged node
function dragDropMove(targetObj)
{
	// at least dont allow dropping on the same node
	if (targetObj == currentDragObj) return;

	/* dont allow dropping parent into it's own layers,
	 * still allow moving unselected nodes upwards,
	 * using 'and' condition makes moving nodes backwards allowed
	 */
	if ( (targetObj.getLevel() > currentDragObj.getLevel()) && 
		 (currentDragObj.parent.selectedChild === currentDragObj.indexOfThis) ) return;

	// only allow if user has access to both nodes
	if ( (!currentDragObj.parent.recAccessCheck()) || (!targetObj.parent.recAccessCheck()) ) return;

	currentDragObj.parent.getChilds().splice(currentDragObj.indexOfThis, 1);

	if (currentDragObj.indexOfThis == currentDragObj.parent.selectedChild)
	{
		// if moving the selectedChild
		let newIndex = currentDragObj.indexOfThis - 1;

		if (newIndex < 0) 
			newIndex = 0;
		else {
			// in this case, backgroundColor needs changes, not else
			currentDragObj.parent.getChilds()[newIndex].domBody.style.backgroundColor = "#CCCCFF";
		}

		currentDragObj.parent.selectedChild = newIndex;
	}

	/* update indicies on other nodes to the right of currentDragObj,
	 * and possibly fix parent's selected child, when to the right of currentDragObj
	 */
	for (let i = currentDragObj.indexOfThis; i < currentDragObj.parent.getChilds().length; i++)
	{
		currentDragObj.parent.getChilds()[i].indexOfThis--;

		if ((i + 1) === currentDragObj.parent.selectedChild)
			currentDragObj.parent.selectedChild--;
	}

	targetObj.parent.getChilds().splice(targetObj.indexOfThis, 0, currentDragObj);

	oldTargetIndex = targetObj.indexOfThis;

	// update indicies on other nodes to the right of targetObj
	for (let i = targetObj.indexOfThis; i < targetObj.parent.getChilds().length; i++)
		targetObj.parent.getChilds()[i].indexOfThis = i;

	// update dragged objects instance variables
	currentDragObj.parent = targetObj.parent;
	currentDragObj.indexOfThis = oldTargetIndex;
	
	currentDragObj.parent.selectedChild = currentDragObj.indexOfThis;

	selectedNode.domBody.style.backgroundColor = "#CCCCFF";

	// set the dragged node to the new selectedNode
	selectedNode = currentDragObj;
	currentDragObj.domBody.style.backgroundColor = "#CCFFCC";

	currentDragObj.setLevelRec();
	currentDragObj.draw();
	currentDragObj.setStatus(currentDragObj.status);
}
