// Login Function
function login() {

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username === "admin" && password === "admin123") {
        window.location.href = "main.html";
    }
    else {
        alert("Invalid Username or Password");
    }

}




// API
const allIssuesAPI = "https://phi-lab-server.vercel.app/api/v1/lab/issues";

const issuesContainer = document.getElementById("issuesContainer");


// LOAD ALL ISSUES
async function loadAllIssues() {

    const res = await fetch(allIssuesAPI);
    const data = await res.json();

    displayIssues(data.data);

    document.getElementById("issueCount").innerText = data.data.length;

    setActiveTab("all");

}


// OPEN ISSUES
async function loadOpenIssues() {

    const res = await fetch(allIssuesAPI);
    const data = await res.json();

    const openIssues = data.data.filter(issue => issue.status === "open");

    displayIssues(openIssues);

    document.getElementById("issueCount").innerText = openIssues.length;

    setActiveTab("open");

}


// CLOSED ISSUES
async function loadClosedIssues() {

    const res = await fetch(allIssuesAPI);
    const data = await res.json();

    const closedIssues = data.data.filter(issue => issue.status === "closed");

    displayIssues(closedIssues);

    document.getElementById("issueCount").innerText = closedIssues.length;

    setActiveTab("closed");

}


// SEARCH
async function searchIssues() {

    const text = document.getElementById("searchInput").value;

    const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${text}`);

    const data = await res.json();

    displayIssues(data.data);

    document.getElementById("issueCount").innerText = data.data.length;

}


// DISPLAY ISSUES
function displayIssues(issues) {

    issuesContainer.innerHTML = "";

    issues.forEach(issue => {

        let labelsHTML = "";

        if (issue.labels && issue.labels.length > 0) {

            issue.labels.forEach(label => {

                labelsHTML += `
<span class="px-2 py-1 rounded border text-orange-500 bg-orange-100 text-xs">
${label.toUpperCase()}
</span>
`;

            });

        }

        let priorityColor = "";
        let priorityBg = "";
        let icon = "";

        const priority = issue.priority.toUpperCase();

        if (priority === "HIGH") {
            priorityColor = "text-red-500";
            priorityBg = "bg-red-100";
            icon = "assets/Open-Status.png";
        }

        else if (priority === "MEDIUM") {
            priorityColor = "text-orange-500";
            priorityBg = "bg-orange-100";
            icon = "assets/Open-Status.png";
        }

        else {
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


<div class="flex gap-2 flex-wrap mb-3">
${labelsHTML}
</div>


<hr class="my-3">

<div class="text-xs text-gray-400 mt-3">

<div class="flex justify-between">
<span>#${issue.id} by ${issue.author}</span>
<span>${new Date(issue.createdAt).toLocaleDateString()}</span>
</div>

<div class="flex justify-between mt-1">
<span>Assignee: ${issue.assignee ? issue.assignee : "Unassigned"}</span>
<span>Updated: ${new Date(issue.updatedAt).toLocaleDateString()}</span>
</div>

</div>

`;


        // MODAL CLICK
        card.onclick = () => openModal(issue.id);

        issuesContainer.appendChild(card);

    });

}


// MODAL
async function openModal(issueId) {

    const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${issueId}`);

    const data = await res.json();

    const issue = data.data;

    document.getElementById("modalTitle").innerText = issue.title;

    document.getElementById("modalDescription").innerText = issue.description;

    document.getElementById("modalAuthor").innerText =
        `Opened by ${issue.author} • ${new Date(issue.createdAt).toLocaleDateString()}`;

 document.getElementById("modalAuthor").innerHTML =
`<span class="bg-green-100 text-green-600 px-2 py-1 rounded text-xs font-medium">Opened</span>
<span class="mx-2 text-gray-400">•</span>
Opened by ${issue.author}
<span class="mx-2 text-gray-400">•</span>
${new Date(issue.createdAt).toLocaleDateString()}`;


// priority badge
let priorityColor = "";

if(issue.priority === "high"){
priorityColor = "bg-red-100 text-red-500";
}
else if(issue.priority === "medium"){
priorityColor = "bg-orange-100 text-orange-500";
}
else{
priorityColor = "bg-blue-100 text-blue-500";
}

document.getElementById("modalPriority").innerHTML =
`<span class="px-3 py-1 rounded-full text-xs font-semibold ${priorityColor}">
${issue.priority.toUpperCase()}
</span>`;


// labels
let labelHTML = "";

issue.labels.forEach(label => {
labelHTML += `<span class="px-2 py-1 bg-yellow-100
 text-yellow-700 text-xs rounded-full mr-2 font-medium uppercase ">${label}</span>`;
});

document.getElementById("modalLabel").innerHTML = labelHTML;

   

    document.getElementById("modalDate").innerText =
        `Updated: ${new Date(issue.updatedAt).toLocaleDateString()}`;

    document.getElementById("issueModal").showModal();

}


// TAB ACTIVE STYLE
function setActiveTab(tab) {

    const allTab = document.getElementById("allTab");
    const openTab = document.getElementById("openTab");
    const closedTab = document.getElementById("closedTab");

    allTab.classList.remove("bg-gradient-to-r", "from-blue-500", "to-blue-400", "text-white");
    openTab.classList.remove("bg-gradient-to-r", "from-blue-500", "to-blue-400", "text-white");
    closedTab.classList.remove("bg-gradient-to-r", "from-blue-500", "to-blue-400", "text-white");

    if (tab === "all") {
        allTab.classList.add("bg-gradient-to-r", "from-blue-500", "to-blue-400", "text-white");
    }

    if (tab === "open") {
        openTab.classList.add("bg-gradient-to-r", "from-blue-500", "to-blue-400", "text-white");
    }

    if (tab === "closed") {
        closedTab.classList.add("bg-gradient-to-r", "from-blue-500", "to-blue-400", "text-white");
    }

}


// BUTTON CLICK
if (document.getElementById("allTab")) {

    document.getElementById("allTab").onclick = loadAllIssues;

    document.getElementById("openTab").onclick = loadOpenIssues;

    document.getElementById("closedTab").onclick = loadClosedIssues;

    window.onload = loadAllIssues;

}