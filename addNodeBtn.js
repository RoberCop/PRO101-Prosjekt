function addNodeBtnClass(level, parent, index)
{
	var self = this;

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

	this.domElem.onclick = function()
	{
		if (!self.parent.recAccessCheck()) return;

		selectedNode.domBody.style.backgroundColor = "#CCCCFF";

		self.parent.getChilds().splice(self.indexOfThis, 1);
		self.parent.newChild("Sample Text", "Sample Desc");
		self.parent.getChilds()[self.indexOfThis].newAddBtnRec();

		selectedNode = self.parent.getChilds()[self.indexOfThis];
		selectedNode.domBody.style.backgroundColor = "#CCFFCC";

		self.parent.selectedChild = self.indexOfThis++;
		self.parent.getChilds().push(self);

		self.draw();
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
