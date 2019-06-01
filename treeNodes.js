// becomes two-dimentional array, holds objects meant to be displayed
const displayArray = [];

// used instead of dataTransfer, because all we need is a object reference
var currentDragObj;

// class to instantiate nodes on the tree
function treeNodeClass(level, parent, index, title, desc)
{
	this.childs = [];

	this.level = level;
	this.parent = parent;

	this.selectedChild = -1;
	this.indexOfThis = index;

	this.desc = (desc !== undefined) ? desc : "";

	this.isDone = false;

	// adds a new instance to "childs" array
	this.newChild = function(newTitle, newDesc)
	{
		this.childs.push(new treeNodeClass(this.level + 1, this, this.childs.length, newTitle, newDesc));
	}

	this.newAddBtnRec = function()
	{
		for (child of this.childs)
			if (child.selectedChild !== undefined)
				child.newAddBtnRec();

		const checkIndex = this.childs.length - 1;

		if ( (checkIndex === -1) || (this.childs[checkIndex].selectedChild !== undefined) )
			this.childs.push(new addNodeBtnClass(this.level + 1, this, this.childs.length));
	}

	this.addToDisplay = function(isSelected, isStart)
	{
		// add this node to the displayArray if its not the starter object
		if (!isStart)
			displayArray[this.level - 1].push(this);

		this.domElem.style.borderColor = (this.isDone) ? "#00FF00" : "#FF0000";

		if (isSelected)
		{
			// if selected, call this same method on child objects
			for (childIndex in this.childs)
				this.childs[childIndex].addToDisplay(childIndex == this.selectedChild, false);
		}
		else {
			// style for when node is unselected
			this.domBody.style.backgroundColor = "#FFFFFF";
		}
	}

	this.draw = function()
	{
		// clear this stack and outwards in the display array
		for (let i = this.level - 1; i < displayArray.length; i++)
			displayArray[i] = [];

		// recursively add to display based on selected nodes from parent node, and draw the new nodes
		this.parent.addToDisplay(true, true);
		drawNodes(this.level - 1);
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

		if (this.parent.childs[newIndex].selectedChild === undefined)
			newIndex--;

		if (newIndex < 0)
			selectedNode = this.parent;
		else
			selectedNode = this.parent.childs[newIndex];
		
		selectedNode.refreshNodeEdit();
		this.parent.selectedChild = newIndex;
		selectedNode.domBody.style.backgroundColor = "#CCFFCC";

		this.draw();
	}

	this.refreshNodeEdit = function()
	{
		nodeTitle.value = this.childH4.innerText;
		nodeDesc.value = this.desc;
	}

	this.saveNodeEdit = function()
	{
		this.childH4.innerText = nodeTitle.value;
		this.desc = nodeDesc.value;
	}

	this.setDone = function(toState)
	{
		// when setting to "not done"
		if (toState == false)
		{
			this.undoneRec();

			return;
		}

		// return if not allowed to set to "done"
		if (!getCanBeDone(this)) return;

		// setting to "done" allowed
		this.isDone = true;
		this.domElem.style.borderColor = "#00FF00";
	}

	this.setLevelRec = function()
	{
		this.level = this.parent.level + 1;

		for (child of this.childs)
			child.setLevelRec();
	}

	this.undoneRec = function()
	{
		this.isDone = false;
		this.domElem.style.borderColor = "#FF0000";

		if (this.level > 1)
			this.parent.undoneRec();
	}

	/////////////////////////////////////
	// Private methods (using 'self' instead of 'this')

	var getCanBeDone = function(self)
	{
		for (let i = 0; i < self.childs.length; i++)
		{
			if ( (!self.childs[i].isDone) &&
				 (self.childs[i].selectedChild !== undefined) ) return false;
		}

		return true;
	}

	////////////////////////////////////
	// Dom element
	
	this.domElem = document.createElement("div");
	this.domHeader = document.createElement("div");
	this.childH4 = document.createElement("h4");
	this.domBody = document.createElement("div");
	this.icon = document.createElement("i");
	this.light = document.createElement("div");

	this.domElem.className = "treeNode";
	this.domElem.borderWidth = "1px";
	this.domElem.borderStyle = "solid";
	this.domElem.borderColor = "red";
	this.domElem.draggable = "true";
	this.domElem.treeNode = this;

	this.domHeader.className = "node-header";

	this.childH4.innerText = title;

	this.domBody.className = "node-body";

	this.icon.className = "fas fa-user";

	this.light.className = "light";
	this.light.style.visibility = "hidden";

	this.domHeader.appendChild(this.childH4);

	this.domBody.appendChild(this.icon);
	this.domBody.appendChild(this.light);

	this.domElem.appendChild(this.domHeader);
	this.domElem.appendChild(this.domBody);

	/* Prevents mouse events from occuring on child elements,
	 * neccessary due to how drag and drop works.
	 */
	for (let i = 0; i < this.domElem.childNodes.length; i++)
	{
		this.domElem.childNodes[i].style.pointerEvents = "none";
	}

	this.domElem.onclick = function()
	{
		selectedNode.domBody.style.backgroundColor = "#CCCCFF";

		// set this node to be the selected child, on the parent
		this.treeNode.parent.selectedChild = this.treeNode.indexOfThis;
		selectedNode = this.treeNode;

		selectedNode.domBody.style.backgroundColor = "#CCFFCC";

		this.treeNode.refreshNodeEdit();
		this.treeNode.draw();
	}

	this.domElem.ondragstart = function()
	{
		currentDragObj = this.treeNode;
	}

	this.domElem.ondragover = function(event)
	{
		event.preventDefault();
	}

	this.domElem.ondrop = function()
	{
		const targetObj = this.treeNode;

		// at least dont allow dropping on the same node
		if (targetObj == currentDragObj) return;

		/* dont allow dropping parent into it's own layers,
		 * still allow moving unselected nodes upwards,
		 * using 'and' condition makes moving nodes backwards allowed
		 */
		if ( (targetObj.level > currentDragObj.level) && 
			 (currentDragObj.parent.selectedChild === currentDragObj.indexOfThis) ) return;

		currentDragObj.parent.childs.splice(currentDragObj.indexOfThis, 1);

		if (currentDragObj.indexOfThis == currentDragObj.parent.selectedChild)
		{
			// if moving the selectedChild
			let newIndex = currentDragObj.indexOfThis - 1;

			if (newIndex < 0) 
				newIndex = 0;
			else {
				// in this case, backgroundColor needs changes, not else
				currentDragObj.parent.childs[newIndex].domBody.style.backgroundColor = "#CCCCFF";
			}

			currentDragObj.parent.selectedChild = newIndex;
		}

		/* update indicies on other nodes to the right of currentDragObj,
		 * and possibly fix parent's selected child, when to the right of currentDragObj
		 */
		for (let i = currentDragObj.indexOfThis; i < currentDragObj.parent.childs.length; i++)
		{
			currentDragObj.parent.childs[i].indexOfThis--;

			if ((i + 1) == currentDragObj.parent.selectedChild)
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

		selectedNode.domBody.style.backgroundColor = "#CCCCFF";

		// set the dragged node to the new selectedNode
		selectedNode = currentDragObj;
		currentDragObj.domBody.style.backgroundColor = "#CCFFCC";

		currentDragObj.setLevelRec();
		currentDragObj.draw();
		currentDragObj.refreshNodeEdit();

		if (!getCanBeDone(currentDragObj.parent))
			currentDragObj.parent.undoneRec();

		// Just because its global, and references an object, nullify it when we are done
		currentDragObj = null;
	}
}
