function addNodeBtnClass(level, parent, index)
{
	this.level = level;
	this.parent = parent;
	this.indexOfThis = index;

	this.addToDisplay = function (isSelected)
	{
		displayArray[this.level - 1].push(this);
	}

	// same as in treeNodeClass()
	this.draw = function ()
	{
		for (let i = this.level - 1; i < displayArray.length; i++)
			displayArray[i] = [];

		parent.addToDisplay(true, true);
		drawNodes(this.level - 1);
	}

	this.setLevelRec = function()
	{
		this.level = this.parent.level + 1;
	}

	///////////////////////////////
	// Dom element

	this.domElem = document.createElement("i");
	this.domElem.className = "addButton fas fa-plus";
	this.domElem.treeNode = this;

	this.domElem.onclick = function ()
	{
		selectedNode.domBody.style.backgroundColor = "#CCCCFF";

		parent.childs.splice(this.treeNode.indexOfThis, 1);
		parent.newChild("Sample Text", "Sample Desc");
		parent.childs[this.treeNode.indexOfThis].newAddBtnRec();

		selectedNode = parent.childs[this.treeNode.indexOfThis];
		selectedNode.refreshNodeEdit();
		selectedNode.domBody.style.backgroundColor = "#CCFFCC";

		selectedNode.setDone(false);

		parent.selectedChild = this.treeNode.indexOfThis++;
		parent.childs.push(this.treeNode);

		this.treeNode.draw();
	}
}
