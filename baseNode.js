function baseNodeClass(level, parent, index)
{
	var self = this;
	var owner;

	this.childs = [];
	this.parent = parent;
	this.indexOfThis = index;
	this.selectedChild = -1;

	// adds a new instance to "childs" array
	this.newChild = function(newTitle, newDesc, newUser)
	{
		const preLength = this.childs.length;

		// create a child based on own variables, and current arguments
		this.childs.push(new treeNodeClass(level + 1, this, preLength, newTitle, newDesc, 0));

		if (newUser !== undefined) this.childs[preLength].setUser(newUser);
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

	this.addToDisplay = function(isSelected, isStart)
	{
		// if selected, call this same method on child objects
		for (childIndex in this.childs)
			this.childs[childIndex].addToDisplay(childIndex == this.selectedChild, false);
	}

	this.draw = function()
	{
		for (let i = level - 1; i < displayArray.length; i++)
			displayArray[i] = [];

		this.parent.addToDisplay(true, true);
		drawNodes(level - 1);
	}

	this.recAccessCheck = function()
	{
		// return false, as noen owns base nodes, causing check to fail when reached
		return (owner == activeUser);
	}

	this.setLevelRec = function()
	{
		level = this.parent.getLevel() + 1;

		for (child of this.childs) this.child.setLevelRec();
	}

	this.setOwner = function(newOwner)
	{
		owner = newOwner;
	}

	this.getLevel = function()
	{
		return level;
	}

}
