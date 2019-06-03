function getTreeData()
{
	const root = new treeNodeClass(0, null, 0, null, null, 0);
	
	// Hard code sample nodes for testing
	root.newChild("Project", "Prosjekt description");

	root.getChilds()[0].newChild("Make a house", "I need a house asap :)");
	root.getChilds()[0].newChild("Make a car", "Custom made supercar", usersArr[1]);
	root.getChilds()[0].newChild("Make a computer", "njljnjklkn");

	//House
	root.getChilds()[0].getChilds()[0].newChild("Make a foundation", "Description of making a foundation");
	root.getChilds()[0].getChilds()[0].newChild("Make walls");
	root.getChilds()[0].getChilds()[0].newChild("Make a roof");
	root.getChilds()[0].getChilds()[0].newChild("Make windows");
	root.getChilds()[0].getChilds()[0].newChild("Make a door");

	root.getChilds()[0].getChilds()[0].getChilds()[0].newChild("Get some concrete");

	root.getChilds()[0].getChilds()[0].getChilds()[1].newChild("Get some wood");

	//Car
	root.getChilds()[0].getChilds()[1].newChild("Make an engine", "", usersArr[0]);
	root.getChilds()[0].getChilds()[1].newChild("Make a frame");
	root.getChilds()[0].getChilds()[1].newChild("Make some wheels");

	return root;
}
