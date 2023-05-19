document.addEventListener("DOMContentLoaded", function() {
    const nameFilterInput = document.getElementById("nameFilter");
    const designationFilterInput = document.getElementById("designationFilter");
    let employeesData = [];

    nameFilterInput.addEventListener("input", filterTable);
    designationFilterInput.addEventListener("input", filterTable);

    fetch("https://raw.githubusercontent.com/dixitsoham7/dixitsoham7.github.io/main/index.json")
        .then(response => response.json())
        .then(data => {
            employeesData = data.employees;
            renderTableRows(employeesData);
        })
        .catch(error => {
            console.error("Error fetching JSON data:", error);
        });

    function renderTableRows(employees) {
        const tableBody = document.getElementById("tableBody");
        tableBody.innerHTML = "";

        employees.forEach(employee => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${employee.id}</td>
                <td>${employee.name || "-"}</td>
                <td>${employee.designation || "-"}</td>
                <td>${employee.skills.join(", ") || "-"}</td>
                <td>${employee.projects ? employee.projects.length : "-"}</td>
            `;
            tableBody.appendChild(row);
        });
    }

    function filterTable() {
        const nameFilter = nameFilterInput.value.toLowerCase();
        const designationFilter = designationFilterInput.value.toLowerCase();

        const filteredEmployees = employeesData.filter(employee => {
            const nameMatch = employee.name && employee.name.toLowerCase().includes(nameFilter);
            const designationMatch = employee.designation && employee.designation.toLowerCase().includes(designationFilter);

            return nameMatch && designationMatch;
        });

        renderTableRows(filteredEmployees);
    }
});
