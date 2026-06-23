let leaves = JSON.parse(localStorage.getItem("leaves")) || [];

const table = document.getElementById("leaveTable");

function showToast(msg) {
    let t = document.getElementById("toast");
    t.textContent = msg;
    t.style.display = "block";
    setTimeout(() => t.style.display = "none", 2000);
}

function addLeave() {
    let name = document.getElementById("name").value;
    let start = document.getElementById("startDate").value;
    let end = document.getElementById("endDate").value;
    let type = document.getElementById("type").value;

    if (!name || !start || !end) {
        showToast("Fill all fields");
        return;
    }

    leaves.push({
        name,
        start,
        end,
        type,
        status: "Pending"
    });

    saveAndRender();
    showToast("Leave request submitted");
}

function saveAndRender() {
    localStorage.setItem("leaves", JSON.stringify(leaves));
    renderTable(leaves);
}

function renderTable(data) {
    table.innerHTML = "";

    data.forEach((l, i) => {
        table.innerHTML += `
        <tr>
            <td>${l.name}</td>
            <td>${l.type}</td>
            <td>${l.start}</td>
            <td>${l.end}</td>
            <td>${l.status}</td>
            <td>
                <button onclick="approve(${i})">Approve</button>
                <button onclick="reject(${i})">Reject</button>
                <button onclick="deleteLeave(${i})">Delete</button>
            </td>
        </tr>
        `;
    });
}

function approve(i) {
    leaves[i].status = "Approved";
    saveAndRender();
    showToast("Approved");
}

function reject(i) {
    leaves[i].status = "Rejected";
    saveAndRender();
    showToast("Rejected");
}

function deleteLeave(i) {
    leaves.splice(i, 1);
    saveAndRender();
    showToast("Deleted");
}

function filterLeaves() {
    let filter = document.getElementById("statusFilter").value;

    if (filter === "all") {
        renderTable(leaves);
    } else {
        let filtered = leaves.filter(l => l.status === filter);
        renderTable(filtered);
    }
}

renderTable(leaves);