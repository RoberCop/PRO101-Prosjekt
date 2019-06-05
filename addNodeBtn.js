function addNodeBtnClass(level, parent, index)
{
	// extends baseNodeClass()
	baseNodeClass.call(this, level, parent, index);

	var self = this;

	this.addToDisplay = function(isSelected)
	{
		displayArray[this.level - 2].push(this);
		this.domElem.style.color = (this.parent.recAccessCheck()) ? "#0F0" : "#F00";
	}

	this.setLevelRec = function()
	{
		this.level = this.parent.level + 1;
	}

	///////////////////////////////
	// Dom element

	this.domElem = document.createElement("i");
	this.domElem.className = "addButton far fa-plus-square fa-2x";

	this.domElem.onclick = function()
	{
		if (!self.parent.recAccessCheck()) return;

		if (!(selectedNode instanceof baseNodeClass))
			selectedNode.domBody.style.backgroundColor = "#CCF";

		self.parent.childs.splice(self.indexOfThis, 1);
		self.parent.newChild("Sample Text", "Sample Desc", activeUser);

		if (this.level !== 7)
			self.parent.childs[self.indexOfThis].newAddBtnRec();

		selectedNode = self.parent.childs[self.indexOfThis];
		selectedNode.domBody.style.backgroundColor = "#CFC";

		self.parent.selectedChild = self.indexOfThis++;
		self.parent.childs.push(self);

		moveEditContainer(true);

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
