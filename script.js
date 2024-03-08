let currentPage = 1;
const entriesPerPage = 10;
let paginatedEntries = [];

document.addEventListener("DOMContentLoaded", function () {
  fetch("https://api.publicapis.org/entries")
    .then((response) => response.json())
    .then((data) => {
      paginatedEntries = paginate(data.entries, entriesPerPage);
      displayPage(currentPage);
    })
    .catch((error) => console.error("Error fetching data:", error));

  document.getElementById("prev-page").addEventListener("click", function () {
    if (currentPage > 1) {
      displayPage(--currentPage);
    }
  });

  document.getElementById("next-page").addEventListener("click", function () {
    if (currentPage < paginatedEntries.length) {
      displayPage(++currentPage);
    }
  });
});

function paginate(entries, entriesPerPage) {
  let result = []; 

  for (let i = 0; i < entries.length; i++) {
    let groupIndex = Math.floor(i / entriesPerPage); // tarea

    if (!result[groupIndex]) {
      result[groupIndex] = [];
    }

    result[groupIndex].push(entries[i]);
  }

  return result; 
}

function displayPage(page) {
  const tableBody = document.getElementById("table-body");
  tableBody.innerHTML = ""; // Clear the table

  paginatedEntries[page - 1].forEach((entry) => {
    const row = tableBody.insertRow();
    row.insertCell().textContent = entry.API;
    row.insertCell().textContent = entry.Description;
    row.insertCell().textContent = entry.Auth || "None";
    row.insertCell().textContent = entry.HTTPS ? "Yes" : "No";
    row.insertCell().textContent = entry.Cors;
  });

  // Update pagination state
  document.getElementById("current-page").textContent = page;
  document.getElementById("prev-page").disabled = currentPage <= 1;
  document.getElementById("next-page").disabled = currentPage >= paginatedEntries.length;
}
