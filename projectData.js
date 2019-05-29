function getTreeData()
{
	const root = new treeNodeClass(0, null, 0, null, null);
	
	// Hard code sample nodes for testing
	root.newChild("Project", "Prosjekt description");

	root.childs[0].newChild("Make a house", "I need a house asap :)");
	root.childs[0].newChild("Make a car", "Custom made supercar");
	root.childs[0].newChild("Make a computer", "njljnjklkn");

	//House
	root.childs[0].childs[0].newChild("Make a foundation", "Description of making a foundation");
	root.childs[0].childs[0].newChild("Make walls");
	root.childs[0].childs[0].newChild("Make a roof");
	root.childs[0].childs[0].newChild("Make windows");
	root.childs[0].childs[0].newChild("Make a door");
	root.childs[0].childs[0].newChild("test");
	root.childs[0].childs[0].newChild("test");
	root.childs[0].childs[0].newChild("test");
	root.childs[0].childs[0].newChild("test");
	root.childs[0].childs[0].newChild("test");

	root.
		childs[0].
		childs[0].
		childs[0].
	newChild("Get some concrete");
	root.
		childs[0].
		childs[0].
		childs[0].
		childs[0].
	newChild("test");
	root.
		childs[0].
		childs[0].
		childs[0].
		childs[0].
		childs[0].
	newChild("test");
	root.
		childs[0].
		childs[0].
		childs[0].
		childs[0].
		childs[0].
		childs[0].
	newChild("test");
	root.
		childs[0].
		childs[0].
		childs[1].
	newChild("Get some wood");

	//Car
	root.childs[0].childs[1].newChild("Make a engine");
	root.childs[0].childs[1].newChild("Make a frame");
	root.childs[0].childs[1].newChild("Make some wheels");

	return root;
}
