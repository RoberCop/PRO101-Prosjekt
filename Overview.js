const upcCon = document.getElementById('upcommingContainer');

const impCon = document.getElementById('InprogressContainer');
    
const compCon = document.getElementById('CompletedContainer');

const form = document.getElementById('projectform');



const contimp= document.getElementById("IpProject1");
const contcomp= document.getElementById("CompProject1");
const contupc= document.getElementById("UpProject1");
    


    upcCon.style.display ="none";
    impCon.style.display="block";
    compCon.style.display="none";
    form.style.display="none";



var inProgressPro=[];
var upcomPro=[];
var completePro=[];




function showupc() 
{
    upcCon.style.display ="block";
    impCon.style.display="none";
    compCon.style.display="none";
    
    
   
}

function showimp() 
{
    upcCon.style.display ="none";
    impCon.style.display="block";
    compCon.style.display="none";
}
   

function showcomp() 
{
    upcCon.style.display ="none";
    impCon.style.display="none";
    compCon.style.display="block";
}
   

function showform() 
{

   form.style.display = "block";
   
}

function closeform() 
{
form.style.display = "none";
}   



function createProject() {

  var namepro= document.getElementById("Projectname").value;

 var type= document.getElementById("type").value;
    
var divpro = document.createElement("div");
var feedpro = document.createElement("div");
  
divpro.innerHTML=namepro;
divpro.className="projectdiv";
    divpro.setAttribute("id",namepro);
    divpro.setAttribute("draggable",true);
   divpro.setAttribute("ondragstart","drag(event)","ondragend(dragend())");
    
   
    

    

feedpro.className="feeddiv";





if(type == "inprogress"){

  var inps= " In Progress";  
feedpro.innerHTML="User Crated Project"+"<br />"+ " Called: "+namepro +"<br />"+" In the: "+ inps+ " section.";

 document.getElementById("Feedup1").appendChild(feedpro);   
document.getElementById("IpProject1").appendChild(divpro);
 
    namepro={name:namepro,Type:inps,}
    inProgressPro.push(namepro);
    
    closeform();
    
  

}
    
    
    
if(type == "upcoming"){
    
var upcs= " Upcoming";  
feedpro.innerHTML="User Crated Project"+"<br />"+ " Called: "+namepro +"<br />"+" In the: "+ upcs+ " section.";
    

document.getElementById("Feedup1").appendChild(feedpro);
    
document.getElementById("UpProject1").appendChild(divpro);
 
       namepro={name:namepro,Type:upcs,}
    upcomPro.push(namepro);
    
    
    closeform();   
}   
    
    
 
  
    
    
console.table(inProgressPro);
    console.table(upcomPro);


}




/* drag and drop funtion START with const */


const proheadcomp= document.getElementById("CompletedHeader");
const proheadimp= document.getElementById("InprogressHeader");
const proheadcupc= document.getElementById("UpcomingHeader");

function opentabdragComp(){

allowDrop(event);
showcomp();
proheadcomp.style.transform="scale(1.2)"; 

}



function opentabdragImp(){
proheadimp.style.transform="scale(1.2)"; 
allowDrop(event);
showimp(); 
    
   
}


function opentabdragcUpc(){
proheadcupc.style.transform="scale(1.2)"; 
    
allowDrop(event);
showupc();    
}

function allowDrop(ev) {
    
     
    ev.preventDefault(); 
}

function drag(ev) {
    

    
ev.dataTransfer.setData("text", ev.target.id);


}

function drop(ev) {
  
    
   
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
   
    
    
    ev.target.appendChild(document.getElementById(data));

    
  
}


function dragleaveComp(){
    proheadcomp.style.transform="scale(1.0)"; 
    console.log("draging of element is over");
}

function dragleaveImp(){
    proheadimp.style.transform="scale(1.0)"; 
    console.log("draging of element is over");
}

function dragleaveUpc(){
    proheadcupc.style.transform="scale(1.0)"; 
    console.log("draging of element is over");
}




function deldrop(ev)
{
    
    
var feedpro = document.createElement("div");
 feedpro.className="feeddiv";    
    
ev.preventDefault();
var data=ev.dataTransfer.getData("Text");
var el = document.getElementById(data);
el.parentNode.removeChild(el);
   
    document.getElementById("Feedup1").appendChild(feedpro);   
    
    feedpro.innerHTML="User DELETED Project"+"<br />"+ " Called: "+data;
}








    
    
    





