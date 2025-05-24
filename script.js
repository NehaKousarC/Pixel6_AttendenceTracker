const addBtn = document.getElementById('addStudentBtn');
const formContainer = document.getElementById('studentFormContainer');
const form = document.getElementById('studentForm');
const nameList = document.getElementById('nameList');
const saveBtn = document.getElementById('saveBtn');
const resetBtn = document.getElementById('resetBtn');
const selectDate = document.getElementById('selectDate');
const selectMonth = document.getElementById('selectMonth');

let students = JSON.parse(localStorage.getItem('students')) || [];

// Setup date dropdown
for (let i = 1; i <= 31; i++) {
  const option = document.createElement('option');
  option.value = i;
  option.textContent = i;
  selectDate.appendChild(option);
}

// Toggle form
addBtn.addEventListener('click', () => {
  formContainer.classList.toggle('hidden');
});

// Add student
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('studentName').value;
  const usn = document.getElementById('studentUSN').value;
  const dept = document.getElementById('studentDept').value;

  const newStudent = {
    name,
    usn,
    dept,
    present: 0,
    absent: 0,
    late: 0,
    total: 0,
    todayStatus: ''
  };

  students.push(newStudent);
  localStorage.setItem('students', JSON.stringify(students));
  renderStudent(newStudent);

  form.reset();
  formContainer.classList.add('hidden');
});

// Render student with buttons
function renderStudent(student) {
  const li = document.createElement('li');
  li.innerHTML = `
    <span>${student.name}</span>
    <div class="attendance-buttons">
      <button onclick="mark('${student.name}', 'present')">P</button>
      <button onclick="mark('${student.name}', 'absent')">A</button>
      <button onclick="mark('${student.name}', 'late')">L</button>
    </div>
  `;
  nameList.appendChild(li);
}

// Mark attendance
window.mark = function(name, status) {
  students = students.map(student => {
    if (student.name === name) {
      student.todayStatus = status;
    }
    return student;
  });
};

// Save attendance
saveBtn.addEventListener('click', () => {
  if (!selectDate.value || !selectMonth.value) {
    alert("Please select both date and month.");
    return;
  }

  students = students.map(student => {
    if (student.todayStatus === 'present') {
      student.present++;
      student.total++;
    } else if (student.todayStatus === 'absent') {
      student.absent++;
      student.total++;
    } else if (student.todayStatus === 'late') {
      student.late++;
      student.total++;
    }
    student.todayStatus = '';
    return student;
  });

  localStorage.setItem('students', JSON.stringify(students));
  alert("Attendance saved successfully!");
});

// Reset today's marks
resetBtn.addEventListener('click', () => {
  students = students.map(student => {
    student.todayStatus = '';
    return student;
  });
  alert("Today's selections reset.");
});

// Load students on page load
window.onload = () => {
  students.forEach(renderStudent);
};
