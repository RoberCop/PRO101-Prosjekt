function getTreeData()
{
	const root = new treeNodeClass(0, null, 0, null);
	
	// Hard code sample nodes for testing
	root.newChild("Project");

	root.childs[0].newChild("Make a house");
	root.childs[0].newChild("Make a car");
	root.childs[0].newChild("Make a computer");

	//House
	root.childs[0].childs[0].newChild("Make a foundation");
	root.childs[0].childs[0].newChild("Make walls");
	root.childs[0].childs[0].newChild("Make a roof");
	root.childs[0].childs[0].newChild("Make windows");
	root.childs[0].childs[0].newChild("Make a door");

	for (let i = 2; i < 30; i++) {

	}

	//Car
	root.childs[0].childs[1].newChild("Make a engine");
	root.childs[0].childs[1].newChild("Make a frame");
	root.childs[0].childs[1].newChild("Make some wheels");

	return root;
}
