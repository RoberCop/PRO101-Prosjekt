// becomes two-dimentional array, holds objects meant to be displayed
const displayArray = [];

// used instead of dataTransfer, because all we need is a object reference
var currentDragObj;

// class to instantiate nodes on the tree
function treeNodeClass(level, parent, index, title, desc, status)
{
	// extends baseNodeClass()
	baseNodeClass.call(this, level, parent, index);

	// used when 'this' gets replaced, alternative to adding properties to dom
	var self = this;
	var user;

	this.status = status;

	if (title === undefined) title = "";

	if (desc === undefined) desc = "";

	// adds a new instance to "this.childs" array
	this.newChild = function(newTitle, newDesc, newUser)
	{
		const preLength = this.childs.length;

		// create a child based on own variables, and current arguments
		this.childs.push(new treeNodeClass(this.level + 1, this, preLength, newTitle, newDesc, 0));

		if (newUser !== undefined) this.childs[preLength].setUser(newUser);

		this.setStatusRec();
	}

	this.addToDisplay = function(isSelected, isStart)
	{
		// add this node to the displayArray if its not the starter object
		if (!isStart) displayArray[this.level - 2].push(this);

		const statusColor = (this.status > 0) ? ( (this.status > 1) ? "#0F0" : "#FF0" ) : "#F00";
		this.domElem.style.backgroundColor = statusColor;

		if (user !== undefined)
			this.childPar.innerText = user.username;

		if (this === selectedNode)
			this.domElem.style.transform = "scale(1.1)";
		else
			this.domElem.style.transform = "scale(1.0)";

		if (isSelected)
		{
			// style for when node is selected, excluding styling of domBody backgroundColor
			this.domHeader.style.backgroundColor = "#FFCA28";
			this.childH4.style.color = "#000";

			// if selected, call this same method on child objects
			for (childIndex in this.childs)
				this.childs[childIndex].addToDisplay(childIndex == this.selectedChild, false);
		}
		else {
			// style for when node is unselected
			this.domBody.style.backgroundColor = "#FFF";

			this.domHeader.style.backgroundColor = "#888";
			this.childH4.style.color = "#FFF";
		}
	}

	// only used when removing with remove button
	this.removeNode = function()
	{
		// remove selected node
		this.parent.childs.splice(this.indexOfThis, 1);

		// update indicies on other nodes to the right of deleted node(reference members)
		for (let i = this.indexOfThis; i < this.parent.childs.length; i++)
			this.parent.childs[i].indexOfThis--;

		let newIndex = this.indexOfThis;

		if (this.parent.childs[newIndex] instanceof addNodeBtnClass) newIndex--;

		if (newIndex < 0)
			selectedNode = this.parent;
		else {
			if (this.level > 2)
				this.parent.setStatusRec();

			selectedNode = this.parent.childs[newIndex];
		}

		if (!(selectedNode instanceof baseNodeClass))
		{
			selectedNode.domBody.style.backgroundColor = "#AFA";

			if (this.level > 1)
			{
				this.parent.selectedChild = newIndex;
				selectedNode.refreshNodeEdit();
			}
		}
		else selectedNode = undefined;

		moveEditContainer(false);
		this.draw();
	}

	this.setSelectedNode = function()
	{
		selectedNode.domBody.style.backgroundColor = "#AAF";

		// set this node to be the selected child, on the parent
		this.parent.selectedChild = this.indexOfThis;
		selectedNode = this;

		this.domBody.style.backgroundColor = "#AFA";

		this.draw();
	}

	this.refreshNodeEdit = function()
	{
		nodeTitle.value = title;
		nodeDesc.value = desc;
		nodeOwnerSelect.selectedIndex = usersArr.indexOf(user).toString();

		if (this.recAccessCheck())
		{
			if (!canEdit)
			{
				deleteNode.style.filter = "grayscale(0%)";
				refreshNode.style.filter = "grayscale(0%)";
				saveNode.style.filter = "grayscale(0%)";

				canEdit = true;
				nodeTitle.disabled = false;
				nodeDesc.disabled = false;
				nodeOwnerSelect.disabled = false;
			}

			const visState = (this.childs.length === 1) ? "visible" : "hidden";

			doneNode.style.visibility = visState;
			inProgNode.style.visibility = visState;
			notDoneNode.style.visibility = visState;
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
			nodeOwnerSelect.disabled = true;
		}
	}

	this.saveNodeEdit = function()
	{
		title = nodeTitle.value;
		desc = nodeDesc.value;

		this.setUser(usersArr[nodeOwnerSelect.selectedIndex]);

		this.childH4.innerText = (title != "") ? title : "-No Title-";

		this.refreshNodeEdit();
		this.draw();
		savedMsg.style.display = "flex";
	}

	this.tryStatus = function(newStatus)
	{
		if ( (this.childs.length > 1) || (this.status === newStatus) ) return;

		this.setStatus(newStatus);
	}

	this.setStatus = function(newStatus)
	{
		// setting to newStatus allowed
		this.status = newStatus;

		const statusColor = (newStatus > 0) ? ( (newStatus > 1) ? "#4caf50" : "#fff13b" ) : "#ff4e44";
		this.domElem.style.borderColor = statusColor;

		if (this.level > 2) this.parent.setStatusRec();
	}

	this.setStatusRec = function()
	{
		var canBeGreen = true;

		for (child of this.childs)
		{
			if ( (child.status < 2) &&
				 (child instanceof treeNodeClass) )
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

	// returns if active user is allowed to modify node
	this.recAccessCheck = function()
	{
		if (user == activeUser) return true;

		// return true recursivly when autorized
		if (this.parent.recAccessCheck())
			return true;
		else {
			// return false, over and over to make statement fail
			return false;
		}
	}

	this.setUser = function(newUser)
	{
		user = newUser;
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

	this.domElem.style.borderWidth = "5px";
	this.domElem.style.borderStyle = "solid";
	this.domElem.style.borderColor = "#ff4e44";
	this.domElem.style.boxShadow = "0px 0px 4px";

	this.domHeader.className = "node-header";

	this.childH4.innerText = title;

	this.domBody.className = "node-body";

	const icon = document.createElement("i");
	this.childPar = document.createElement("p");
	this.childPar.innerText = "";

	icon.className = "fas fa-user";

	// append to set structure
	this.domHeader.appendChild(this.childH4);

	this.domBody.appendChild(icon);
	this.domBody.appendChild(this.childPar);

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
		moveEditContainer(false);
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
	if ( (targetObj.level > currentDragObj.level) && 
		 (currentDragObj.parent.selectedChild === currentDragObj.indexOfThis) ) return;

	// only allow if user has access to both nodes
	if ( (!currentDragObj.parent.recAccessCheck()) || (!targetObj.parent.recAccessCheck()) ) return;

	currentDragObj.parent.childs.splice(currentDragObj.indexOfThis, 1);

	if (currentDragObj.indexOfThis == currentDragObj.parent.selectedChild)
	{
		// if moving the selectedChild
		let newIndex = currentDragObj.indexOfThis - 1;

		if (newIndex < 0) 
			newIndex = 0;
		else {
			// in this case, backgroundColor needs changes, not else
			currentDragObj.parent.childs[newIndex].domBody.style.backgroundColor = "#AAF";
		}

		currentDragObj.parent.selectedChild = newIndex;
	}

	/* update indicies on other nodes to the right of currentDragObj,
	 * and possibly fix parent's selected child, when to the right of currentDragObj
	 */
	for (let i = currentDragObj.indexOfThis; i < currentDragObj.parent.childs.length; i++)
	{
		currentDragObj.parent.childs[i].indexOfThis--;

		if ((i + 1) === currentDragObj.parent.selectedChild)
			currentDragObj.parent.selectedChild--;
	}

	targetObj.parent.childs.splice(targetObj.indexOfThis, 0, currentDragObj);

	oldTargetIndex = targetObj.indexOfThis;

	// update indicies on other nodes to the right of targetObj
	for (let i = targetObj.indexOfThis; i < targetObj.parent.childs.length; i++)
		targetObj.parent.childs[i].indexOfThis = i;

	// update dragged objects instance variables
	currentDragObj.parent = targetObj.parent;
	currentDragObj.indexOfThis = oldTargetIndex;
	
	currentDragObj.parent.selectedChild = currentDragObj.indexOfThis;

	selectedNode.domBody.style.backgroundColor = "#AAF";

	// set the dragged node to the new selectedNode
	selectedNode = currentDragObj;

	currentDragObj.domBody.style.backgroundColor = "#AAF";

	currentDragObj.setLevelRec();
	currentDragObj.draw();
	currentDragObj.setStatus(currentDragObj.status);
}
