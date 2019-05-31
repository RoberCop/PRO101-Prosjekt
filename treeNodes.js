// becomes two-dimentional array, holds objects meant to be displayed
const displayArray = [];

// class to instantiate nodes on the tree
function treeNodeClass(level, parent, index, title, desc)
{
	this.childs = [];

	this.selectedChild = -1;
	this.indexOfThis = index;

	this.desc = (desc !== undefined) ? desc : "";

	this.isDone = false;

	// adds a new instance to "childs" array
	this.newChild = function(newTitle, newDesc)
	{
		this.childs.push(new treeNodeClass(level + 1, this, this.childs.length, newTitle, newDesc));
	}

	this.newAddBtnRec = function()
	{
		for (child of this.childs)
			if (child.selectedChild !== undefined)
				child.newAddBtnRec();

		const checkIndex = this.childs.length - 1;

		if ( (checkIndex === -1) || (this.childs[checkIndex].selectedChild !== undefined) )
			this.childs.push(new addNodeBtnClass(level + 1, this, this.childs.length));
	}

	this.addToDisplay = function(isSelected, isParent)
	{
		// add this node to the displayArray if its not root
		if (!isParent)
			displayArray[level - 1].push(this);

		this.domElem.style.left = (151 * this.indexOfThis);
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
		for (let i = level - 1; i < displayArray.length; i++)
			displayArray[i] = [];

		// recursively add to display based on selected nodes from parent node, and draw the new nodes
		parent.addToDisplay(true, true);
		drawNodes(level - 1);
	}

	this.removeNode = function()
	{
		// remove selected node
		parent.childs.splice(this.indexOfThis, 1);

		// update indicies on other nodes to the right of deleted node(reference members)
		for (let i = this.indexOfThis; i < parent.childs.length; i++)
			parent.childs[i].indexOfThis = i;

		let newIndex = this.indexOfThis;

		if (parent.childs[newIndex].selectedChild === undefined)
			newIndex--;

		if (newIndex < 0)
			selectedNode = parent;
		else
			selectedNode = parent.childs[newIndex];
		
		selectedNode.refreshNodeEdit();
		parent.selectedChild = newIndex;
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
			this.isDone = false;
			this.domElem.style.borderColor = "#FF0000";
			
			parent.isDone = false;
			parent.domElem.style.borderColor = "#FF0000";

			return;
		}

		// return if not allowed to set to "done"
		for (let i = 0; i < this.childs.length; i++)
		{
			if ( (!this.childs[i].isDone) &&
				 (this.childs[i].selectedChild !== undefined) ) return;
		}

		// setting to "done" allowed
		this.isDone = true;
		this.domElem.style.borderColor = "#00FF00";
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

	this.domElem.onclick = function()
	{
		selectedNode.domBody.style.backgroundColor = "#CCCCFF";

		// set this node to be the selected child, on the parent
		parent.selectedChild = this.treeNode.indexOfThis;
		selectedNode = this.treeNode;

		selectedNode.domBody.style.backgroundColor = "#CCFFCC";

		this.treeNode.refreshNodeEdit();
		this.treeNode.draw();
	}
}
