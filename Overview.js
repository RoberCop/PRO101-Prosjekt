const upcCon = document.getElementById('upcommingContainer');
const impCon = document.getElementById('InprogressContainer');
const compCon = document.getElementById('CompletedContainer');
const form = document.getElementById('projectform');

const contimp= document.getElementById("IpProject1");
const contcomp= document.getElementById("CompProject1");
const contupc= document.getElementById("UpProject1");
    
window.setInterval(function() {
  var elem = document.getElementById('Feedup1');
  elem.scrollTop = elem.scrollHeight;
}, 5000);

form.style.display="none";



var inProgressPro=[];
var upcomPro=[];
var completePro=[];


   


function showform() {
document.getElementById("send").style.animation="show 0.3s forwards";
    document.getElementById("close").style.animation="show 0.3s forwards";
    document.getElementById("Projectname").style.animation="show 0.3s forwards";
form.style.display = "block";
form.style.animation = 'growing 0.2s forwards';
   
    
   
}


function closeform() {
form.style.display = "none";

}   



function createProject() {
  var warning=document.getElementById("warning1");
  var namepro= document.getElementById("Projectname").value;
if(namepro == ""){
    
   warning.innerHTML="You must write something!";
    
    createProject();
}

    
var divpro = document.createElement("div");
var feedpro = document.createElement("div");
  
divpro.innerHTML=namepro;
divpro.className="projectdiv";
divpro.setAttribute("id",namepro);
divpro.setAttribute("draggable",true);
divpro.setAttribute("ondragstart","drag(event)","ondragend(dragend())");

feedpro.className="feeddiv";



var upcs= " Upcoming";  
feedpro.innerHTML="User Crated Project"+"<br />"+ " Called: "+namepro +"<br />"+" In the: "+ upcs+ " section.";
    

document.getElementById("Feedup1").appendChild(feedpro);
    
document.getElementById("UpProject1").appendChild(divpro);
 
    namepro={name:namepro}
    upcomPro.push(namepro);
    
    
    closeform();   
   
    
}


/* drag and drop funtion START with const */



const deleteElement=document.getElementById("Deleteprojectcont");


function dragleaveComp(){
   compCon.style.transform="scale(1.0)"; 
   
}


function dragleaveImp(){
    impCon.style.transform="scale(1.0)"; 
    
}


function dragleaveUpc(){
    upcCon.style.transform="scale(1.0)"; 
    
}

function dragoverComp(ev){
   allowDrop(event);
    compCon.style.transform="scale(1.05)"; 

}

function dragoverImp(ev){
   allowDrop(event);
    impCon.style.transform="scale(1.05)";  

}
function dragoverUpc(ev){
 allowDrop(event);

    upcCon.style.transform="scale(1.05)"; 
}


function allowDrop(ev) {
   
    if(event.target.className == "projectdiv"){
        return;
    }
     
    ev.preventDefault(); 
}


function drag(ev) {
    

    
ev.dataTransfer.setData("text", ev.target.id);


}


function drop(ev) {
  
 ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
   ev.target.appendChild(document.getElementById(data));

    if(ev.target.id == "CompProject1"){
    data={name:data};
    completePro.push(data);
var feedpro = document.createElement("div");
feedpro.className="feeddiv";
console.log(data.name+"was moved to array completePro");
console.table(completePro);
document.getElementById(data.name).style.backgroundColor="#c5e1a5";
        
document.getElementById("Feedup1").appendChild(feedpro);   
    
feedpro.innerHTML="User moved <br />Project: "+data.name+ "<br /> to: Complete section";
    
        for (var i=0; i < upcomPro.length; i++) {
        if (upcomPro[i].name === data.name) {
             upcomPro.splice(i, 1); 
            console.log(data.name+"was removed from array upcomPro");
            console.table(upcomPro);  
        }
     }
        
        for (var i=0; i < inProgressPro.length; i++) {
        if (inProgressPro[i].name === data.name) {
             inProgressPro.splice(i, 1);
             console.log(data.name+"was removed from array inProgressPro");
            console.table(inProgressPro);
        }
     }
  }
    
      if(ev.target.id == "UpProject1"){
    data={name:data};
    upcomPro.push(data);
          console.log(data.name+"was moved from array upcomPro");
          
    var feedpro = document.createElement("div");
feedpro.className="feeddiv";
document.getElementById(data.name).style.backgroundColor="#ef5350";
        
document.getElementById("Feedup1").appendChild(feedpro);   
    
feedpro.innerHTML="User moved<br /> Project: "+data.name+ "<br /> to: Upcoming section";
           console.table(upcomPro);  
    
        for (var i=0; i < completePro.length; i++) {
        if (completePro[i].name === data.name) {
             completePro.splice(i, 1);
            console.log(data.name+"was removed from array completePro");
            console.table(completePro); 
        }
     }
        
        for (var i=0; i < inProgressPro.length; i++) {
        if (inProgressPro[i].name === data.name) {
             inProgressPro.splice(i, 1); 
            console.log(data.name+"was removed from array inProgressPro");
            console.table(inProgressPro);
        }
     }
  }
    
    
    
    
    if(ev.target.id == "IpProject1"){
    data={name:data};
    inProgressPro.push(data);
console.log(data.name+"was moved to array inProgressPro");
var feedpro = document.createElement("div");
feedpro.className="feeddiv";
        
document.getElementById("Feedup1").appendChild(feedpro);  
        
document.getElementById(data.name).style.backgroundColor="#fff59d";
    
feedpro.innerHTML="User moved<br /> Project: "+data.name+ " <br />to: Inprogress section";
        console.table(inProgressPro);
    
        for (var i=0; i < completePro.length; i++) {
        if (completePro[i].name === data.name) {
             completePro.splice(i, 1); 
            console.log(data.name+"was removed from array completePro");
            console.table(completePro);
        }
     }
        
        for (var i=0; i < upcomPro.length; i++) {
        if (upcomPro[i].name === data.name) {
             upcomPro.splice(i, 1);  
            console.log(data.name+"was removed from array upcomPro");
            console.table(upcomPro);  
        }
     }
  }
    
  
}



function dragoverdel(){
   
allowDrop(event);
 deldrop(ev);   
    
}


function deldrop(ev){
    
var feedpro = document.createElement("div");
feedpro.className="feeddiv";    
    
ev.preventDefault();
var data=ev.dataTransfer.getData("Text");
var el = document.getElementById(data);
el.parentNode.removeChild(el);

   
document.getElementById("Feedup1").appendChild(feedpro);   
    
feedpro.innerHTML="User DELETED Project"+"<br />"+ " Called: "+data;
    

}


/* drag and drop funtion END*/





    
    
    





