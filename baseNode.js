function baseNodeClass(level, parent, index)
{
	var self = this;
	var owner;

	this.childs = [];
	this.level = level
	this.parent = parent;
	this.indexOfThis = index;
	this.selectedChild = -1;

	// adds a new instance to "childs" array
	this.newChild = function(newTitle, newDesc, newUser)
	{
		const preLength = this.childs.length;

		// create a child based on own variables, and current arguments
		this.childs.push(new treeNodeClass(this.level + 1, this, preLength, newTitle, newDesc, 0));

		if (newUser !== undefined) this.childs[preLength].setUser(newUser);
	}

	this.newProject = function(newUser)
	{
		const preLength = this.childs.length;

		// create a child based on own variables, and current arguments
		this.childs.push(new baseNodeClass(this.level + 1, this, preLength));

		if (newUser !== undefined) this.childs[preLength].setOwner(newUser);
	}

	this.newAddBtnRec = function()
	{
		for (child of this.childs)
			if (child instanceof treeNodeClass)
				child.newAddBtnRec();

		const checkIndex = this.childs.length - 1;

		if ( (checkIndex === -1) || (this.childs[checkIndex] instanceof treeNodeClass) )
			this.childs.push(new addNodeBtnClass(this.level + 1, this, this.childs.length));
	}

	this.addToDisplay = function(isSelected, isStart)
	{
		// if selected, call this same method on child objects
		for (childIndex in this.childs)
			this.childs[childIndex].addToDisplay(childIndex == this.selectedChild, false);
	}

	this.draw = function()
	{
		for (let i = this.level - 2; i < displayArray.length; i++)
			displayArray[i] = [];

		this.parent.addToDisplay(true, true);
		drawNodes(this.level - 2);
	}

	this.recAccessCheck = function()
	{
		// return false, as noen owns base nodes, causing check to fail when reached
		return (owner == activeUser);
	}

	this.setLevelRec = function()
	{
		this.level = this.parent.level + 1;

		for (child of this.childs) child.setLevelRec();
	}

	this.setOwner = function(newOwner)
	{
		owner = newOwner;
	}
}
