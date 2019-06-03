function addNodeBtnClass(level, parent, index)
{
	this.parent = parent;
	this.indexOfThis = index;

	this.addToDisplay = function(isSelected)
	{
		displayArray[level - 1].push(this);
	}

	// same as in treeNodeClass()
	this.draw = function()
	{
		for (let i = level - 1; i < displayArray.length; i++)
			displayArray[i] = [];

		this.parent.addToDisplay(true, true);
		drawNodes(level - 1);
	}

	this.setLevelRec = function()
	{
		level = this.parent.getLevel() + 1;
	}

	this.getLevel = function()
	{
		return level;
	}

	///////////////////////////////
	// Dom element

	this.domElem = document.createElement("i");
	this.domElem.className = "addButton fas fa-plus";
	this.domElem.treeNode = this;

	this.domElem.onclick = function ()
	{
		if (!this.treeNode.parent.recAccessCheck()) return;

		selectedNode.domBody.style.backgroundColor = "#CCCCFF";

		this.treeNode.parent.childs.splice(this.treeNode.indexOfThis, 1);
		this.treeNode.parent.newChild("Sample Text", "Sample Desc");
		this.treeNode.parent.childs[this.treeNode.indexOfThis].newAddBtnRec();

		selectedNode = this.treeNode.parent.childs[this.treeNode.indexOfThis];
		selectedNode.domBody.style.backgroundColor = "#CCFFCC";

		this.treeNode.parent.selectedChild = this.treeNode.indexOfThis++;
		this.treeNode.parent.childs.push(this.treeNode);

		this.treeNode.draw();
	}

	this.domElem.ondragover = function(event)
	{
		event.preventDefault();
	}

	this.domElem.ondrop = function()
	{
		dragDropMove(this.treeNode);
	}
}
