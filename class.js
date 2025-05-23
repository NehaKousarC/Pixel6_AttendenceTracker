let classId = 2;

function addClass() {
  const name = document.getElementById("className").value;
  const teacher = document.getElementById("classTeacher").value;
  const limit = document.getElementById("studentLimit").value;

  if (!name || !limit) {
    alert("Please fill in all fields.");
    return;
  }

  const table = document.getElementById("classTableBody");
  const row = table.insertRow();

  row.innerHTML = `
    <td>${classId++}</td>
    <td>${name}</td>
    <td>${teacher}</td>
    <td>${limit}</td>
    <td><button class="report-btn">Report</button></td>
  `;

  document.getElementById("className").value = "";
  document.getElementById("studentLimit").value = "";
}
