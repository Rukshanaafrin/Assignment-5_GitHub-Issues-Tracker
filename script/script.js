// LOGIN FUNCTION
function login(){

const username = document.getElementById("username").value;
const password = document.getElementById("password").value;

if(username === "admin" && password === "admin123"){
window.location.href = "main.html";
}
else{
alert("Invalid Username or Password");
}

}



// ==========================
// API
// ==========================

const allIssuesAPI = "https://phi-lab-server.vercel.app/api/v1/lab/issues";

const issuesContainer = document.getElementById("issuesContainer");


// ==========================
// LOAD ALL ISSUES
// ==========================

async function loadAllIssues(){

const res = await fetch(allIssuesAPI);
const data = await res.json();

displayIssues(data.data);

document.getElementById("issueCount").innerText = data.data.length;

setActiveTab("all");

}



// ==========================
// OPEN ISSUES
// ==========================

async function loadOpenIssues(){

const res = await fetch(allIssuesAPI);
const data = await res.json();

const openIssues = data.data.filter(issue => issue.status === "open");

displayIssues(openIssues);

document.getElementById("issueCount").innerText = openIssues.length;

setActiveTab("open");

}



// ==========================
// CLOSED ISSUES
// ==========================

async function loadClosedIssues(){

const res = await fetch(allIssuesAPI);
const data = await res.json();

const closedIssues = data.data.filter(issue => issue.status === "closed");

displayIssues(closedIssues);

document.getElementById("issueCount").innerText = closedIssues.length;

setActiveTab("closed");

}



// ==========================
// SEARCH
// ==========================

async function searchIssues(){

const text = document.getElementById("searchInput").value;

const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${text}`);

const data = await res.json();

displayIssues(data.data);

document.getElementById("issueCount").innerText = data.data.length;

}



// ==========================
// DISPLAY ISSUES
// ==========================

function displayIssues(issues){

issuesContainer.innerHTML = "";

issues.forEach(issue => {

let priorityColor = "";
let priorityBg = "";
let icon = "";

const priority = issue.priority.toUpperCase();

if(priority === "HIGH"){
priorityColor = "text-red-500";
priorityBg = "bg-red-100";
icon = "assets/Open-Status.png";
}

else if(priority === "MEDIUM"){
priorityColor = "text-orange-500";
priorityBg = "bg-orange-100";
icon = "assets/Open-Status.png";
}

else{
priorityColor = "text-blue-500";
priorityBg = "bg-blue-100";
icon = "assets/Closed- Status .png";
}


// OPEN CLOSED BORDER
const borderColor = issue.status === "open"
? "border-green-500"
: "border-purple-500";


// CARD
const card = document.createElement("div");

card.className = `bg-white rounded-xl shadow p-5 border-t-4 ${borderColor} cursor-pointer`;

card.innerHTML = `

<div class="flex justify-between items-center mb-3">

<img src="${icon}" class="w-6 h-6">

<div class="text-xs font-bold px-2 py-1 rounded ${priorityBg} ${priorityColor}">
${priority}
</div>

</div>


<h2 class="font-semibold text-gray-800 mb-2">
${issue.title}
</h2>


<p class="text-sm text-gray-500 mb-3">
${issue.description}
</p>


<div class="flex gap-3 text-xs mb-3">

<span class="px-2 py-1 rounded border text-red-500">
<i class="fa-solid fa-bug"></i> BUG
</span>

<span class="px-2 py-1 rounded border text-orange-500">
<i class="fa-solid fa-life-ring"></i> HELP WANTED
</span>

</div>


<hr class="my-3">


<p class="text-xs text-gray-400">
#${issue.id} by ${issue.author}
</p>

<p class="text-xs text-gray-400">
${new Date(issue.createdAt).toLocaleDateString()}
</p>

`;


// MODAL CLICK
card.onclick = () => openModal(issue);

issuesContainer.appendChild(card);

});

}



// ==========================
// MODAL
// ==========================

function openModal(issue){

document.getElementById("modalTitle").innerText = issue.title;

document.getElementById("modalDescription").innerText = issue.description;

document.getElementById("modalAuthor").innerText = "Author: " + issue.author;

document.getElementById("modalPriority").innerText = "Priority: " + issue.priority;

document.getElementById("modalLabel").innerText = "Label: " + issue.label;

document.getElementById("modalDate").innerText = new Date(issue.createdAt).toLocaleDateString();

document.getElementById("issueModal").showModal();

}




// TAB ACTIVE STYLE
function setActiveTab(tab){

const allTab = document.getElementById("allTab");
const openTab = document.getElementById("openTab");
const closedTab = document.getElementById("closedTab");

allTab.classList.remove("bg-gradient-to-r","from-blue-500","to-blue-400","text-white");
openTab.classList.remove("bg-gradient-to-r","from-blue-500","to-blue-400","text-white");
closedTab.classList.remove("bg-gradient-to-r","from-blue-500","to-blue-400","text-white");

if(tab === "all"){
allTab.classList.add("bg-gradient-to-r","from-blue-500","to-blue-400","text-white");
}

if(tab === "open"){
openTab.classList.add("bg-gradient-to-r","from-blue-500","to-blue-400","text-white");
}

if(tab === "closed"){
closedTab.classList.add("bg-gradient-to-r","from-blue-500","to-blue-400","text-white");
}

}



// ==========================
// BUTTON CLICK
// ==========================

if(document.getElementById("allTab")){

document.getElementById("allTab").onclick = loadAllIssues;

document.getElementById("openTab").onclick = loadOpenIssues;

document.getElementById("closedTab").onclick = loadClosedIssues;

window.onload = loadAllIssues;

}