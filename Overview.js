const upcCon = document.getElementById('upcommingContainer');
const impCon = document.getElementById('InprogressContainer');
const compCon = document.getElementById('CompletedContainer');
const form = document.getElementById('projectform');
const deleteElement=document.getElementById("Deleteprojectcont");

const contimp= document.getElementById("IpProject1");
const contcomp= document.getElementById("CompProject1");
const contupc= document.getElementById("UpProject1");

const wrapper = document.getElementById("wrapper");

const inProgressPro=[];
const upcomPro=[];
const completePro=[];

const root = new baseNodeClass(0, null, 0);

window.setInterval(function() 
{
    var elem = document.getElementById('Feedup1');
    elem.scrollTop = elem.scrollHeight;
}, 1000);

form.style.display="none";

function showform() 
{
	var input = document.getElementById("Projectname");


	input.addEventListener("keydown", function(event) 
	{

		if (event.keyCode === 13) 
		{

		event.preventDefault();
		document.getElementById("send").click();
		}
	});
	
	
	input.addEventListener("keydown", function(event) 
	{

		if (event.keyCode === 27) 
		{

		event.preventDefault();
		document.getElementById("close").click();
		}
	});
	
    document.getElementById("send").style.animation="show 0.3s forwards";
    document.getElementById("close").style.animation="show 0.3s forwards";
    document.getElementById("Projectname").style.animation="show 0.3s forwards";
    form.style.display = "block";
    form.style.animation = 'growing 0.2s forwards';
	 document.getElementById("Projectname").focus();
}

function closeform()
{
    form.style.display = "none";
}

function createProject(projectName, skipAddBtn) 
{
    var warning = document.getElementById("warning1");
    var namepro;
    var classget = document.getElementsByClassName("projectdiv");
    var projectTop = document.getElementById("project-top");
	

    if (projectName !== undefined) 
        namepro = projectName;
    else
        namepro = document.getElementById("Projectname").value;
        
    if(namepro == "")
    {
        warning.innerHTML="You must write something!";
        createProject();
    }
	
	for (var i=0; i < classget.length; i++) 
        {
            if (classget[i].id === namepro) 
            {
                warning.innerHTML="Its already a Project named: "+namepro;
                createProject();
            }
        }
	
    var divpro = document.createElement("div");
    var feedpro = document.createElement("div");

	const projectIndex = root.childs.length;
	root.newProject(activeUser);

	if (!skipAddBtn)
		root.childs[projectIndex].newAddBtnRec();

    divpro.innerHTML=namepro;
    divpro.className="projectdiv";
    divpro.setAttribute("id",namepro);
    divpro.setAttribute("draggable",true);
    divpro.setAttribute("ondragstart","drag(event)","ondragend(dragend())");
	
	divpro.onclick = function()
	{
		root.selectedChild = projectIndex;
		wrapper.style.display = "none";
		section.style.display = "grid";
		editContainer.style.display = "flex";
        currentPage = true;
        moveEditContainer(false);

		if (root.childs[projectIndex].childs.length !== 1)
            root.childs[projectIndex].childs[0].setSelectedNode();
        else 
            selectedNode = undefined;

        projectTop.innerText = namepro.name;

		firstDraw();
	}

    feedpro.className="feeddiv";

    var upcs= " Upcoming";
    
    if (activeUser === undefined)
        feedpro.innerHTML= "Default user created Project<br /> Called: " +namepro + "<br />" + " In the: " + upcs + " section.";
    else
        feedpro.innerHTML= activeUser.username + " created Project<br /> Called: "+namepro +"<br />"+" In the: "+ upcs+ " section.";

    document.getElementById("Feedup1").appendChild(feedpro);
    document.getElementById("UpProject1").appendChild(divpro);
 
    namepro={name:namepro}
    upcomPro.push(namepro);

    closeform();   
}

/* drag and drop funtion START*/

function dragleaveComp()
{
    compCon.style.transform="scale(1.0)"; 
}

function dragleaveImp()
{
    impCon.style.transform="scale(1.0)"; 
}

function dragleaveUpc()
{
    upcCon.style.transform="scale(1.0)";     
}

function dragoverComp(ev)
{
    allowDrop(event);
    compCon.style.transform="scale(1.05)"; 
}

function dragoverImp(ev)
{
    allowDrop(event);
    impCon.style.transform="scale(1.05)"; 
}

function dragoverUpc(ev)
{
    allowDrop(event);
    upcCon.style.transform="scale(1.05)"; 
}

function allowDrop(ev) 
{
    if(event.target.className == "projectdiv")
    {
        return;
    }
     
    ev.preventDefault(); 
}

function drag(ev)
{
    ev.dataTransfer.setData("text", ev.target.id);
}

// Drop funtion start
function drop(ev) 
{
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
   
    if(ev.target.id == "CompProject1")
    {
        data={name:data};
        completePro.push(data);
        compCon.style.transform="scale(1.0)"; 
        var feedpro = document.createElement("div");
        feedpro.className="feeddiv";
        console.log(data.name+"was moved to array completePro");
        console.table(completePro);
        document.getElementById(data.name).style.backgroundColor="#c5e1a5";
        feedpro.style.backgroundColor="#c5e1a5";
        
        document.getElementById("Feedup1").appendChild(feedpro);   
        
        if (activeUser === undefined)
            feedpro.innerHTML= "Default user moved <br />Project: "+data.name+ "<br /> to: Complete section";
        else
            feedpro.innerHTML= activeUser.username + " moved <br />Project: "+data.name+ "<br /> to: Complete section";
      
    
        for (var i=0; i < upcomPro.length; i++) 
        {
            if (upcomPro[i].name === data.name) 
            {
                upcomPro.splice(i, 1); 
                console.log(data.name+"was removed from array upcomPro");
                console.table(upcomPro);  
            }
        }
        
        for (var i=0; i < inProgressPro.length; i++) 
        {
            if (inProgressPro[i].name === data.name) 
            {
                inProgressPro.splice(i, 1);
                console.log(data.name+"was removed from array inProgressPro");
                console.table(inProgressPro);
            }
        }
    }
    
    if(ev.target.id == "UpProject1")
    {
        data={name:data};
        upcomPro.push(data);
        console.log(data.name+"was moved from array upcomPro");
        upcCon.style.transform="scale(1.0)"; 
        var feedpro = document.createElement("div");
        feedpro.className="feeddiv";
        document.getElementById(data.name).style.backgroundColor="#f87371";
        
        document.getElementById("Feedup1").appendChild(feedpro); 
        feedpro.style.backgroundColor="#f87371";
    
        if (activeUser === undefined)
            feedpro.innerHTML= "Default user moved <br />Project: "+data.name+ "<br /> to: Upcoming section";
        else
            feedpro.innerHTML= activeUser.username + " moved <br />Project: "+data.name+ "<br /> to: Upcoming section";

        console.table(upcomPro);  
    
        for (var i=0; i < completePro.length; i++) 
        {
            if (completePro[i].name === data.name) 
            {
                completePro.splice(i, 1);
                console.log(data.name+"was removed from array completePro");
                console.table(completePro); 
            }
        }
        
        for (var i=0; i < inProgressPro.length; i++) 
        {
            if (inProgressPro[i].name === data.name) 
            {
                inProgressPro.splice(i, 1); 
                console.log(data.name+"was removed from array inProgressPro");
                console.table(inProgressPro);
            }
        }
    }
    
    if(ev.target.id == "IpProject1")
    {
        data={name:data};
        inProgressPro.push(data);
        impCon.style.transform="scale(1.0)"; 
        console.log(data.name+"was moved to array inProgressPro");
        var feedpro = document.createElement("div");
        feedpro.className="feeddiv";
        
        document.getElementById("Feedup1").appendChild(feedpro);  
        
        document.getElementById(data.name).style.backgroundColor="#fff59d";
        feedpro.style.backgroundColor="#fff59d";
    
        if (activeUser === undefined)
            feedpro.innerHTML= "Default user moved <br />Project: "+data.name+ "<br /> to: In progress section";
        else
            feedpro.innerHTML= activeUser.username + " moved <br />Project: "+data.name+ "<br /> to: In progress section";

        console.table(inProgressPro);
    
        for (var i=0; i < completePro.length; i++) 
        {
            if (completePro[i].name === data.name) 
                {
                    completePro.splice(i, 1); 
                    console.log(data.name+"was removed from array completePro");
                    console.table(completePro);
                }
        }
        
        for (var i=0; i < upcomPro.length; i++) 
        {
            if (upcomPro[i].name === data.name) 
            {
                upcomPro.splice(i, 1);  
                console.log(data.name+"was removed from array upcomPro");
                console.table(upcomPro);  
            }
        }
    }
}
// Drop funtion end


function dragoverdel(ev)
{
    allowDrop(event);
    deldrop(ev);   
}

function deldrop(ev)
{
    
    var feedpro = document.createElement("div");
    feedpro.className="feeddiv";    
    ev.preventDefault();
    var data=ev.dataTransfer.getData("Text");
    var el = document.getElementById(data);
    el.parentNode.removeChild(el);
    feedpro.style.backgroundColor = "red";
    document.getElementById("Feedup1").appendChild(feedpro);   
    
    feedpro.innerHTML="User DELETED Project"+"<br />"+ " Called: "+data;
	
		for (var i=0; i < completePro.length; i++) 
        {
            if (completePro[i].name === el.id) 
                {
                    completePro.splice(i, 1); 
                    console.log(el.id+"was DELETED from array completePro");
                    console.table(completePro);
                }
        }
        
        for (var i=0; i < upcomPro.length; i++) 
        {
            if (upcomPro[i].name === el.id) 
            {
                upcomPro.splice(i, 1);  
                console.log(el.id+"was DELETED from array upcomPro");
                console.table(upcomPro);  
            }
		}	
		for (var i=0; i < inProgressPro.length; i++) 
        {
            if (inProgressPro[i].name === el.id) 
            {
                upcomPro.splice(i, 1);  
                console.log(el.id+"was DELETED from array upcomPro");
                console.table(upcomPro);  
            }
		
		}	
	
}

/* drag and drop funtion END*/
getTreeData();
root.childs[0].newAddBtnRec();
var selectedNode = root.childs[0].childs[0];

const userIndex = parseInt(sessionStorage.getItem("loginIndex"));
if (isNaN(userIndex))
	window.location.assign("index.html");

var activeUser;

if (userIndex === -1)
{
	activeUser = { username: sessionStorage.getItem("newUsername"),
					password: sessionStorage.getItem("newPassword") };
	usersArr.push(activeUser);
}
else activeUser = usersArr[userIndex];

document.getElementById("userText").innerText = "Username: " + activeUser.username;
