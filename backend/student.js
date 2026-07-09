const fs = require('fs');

let students = [];

// Load data
try {
  if (fs.existsSync('students.json')) {
    const data = fs.readFileSync('students.json', 'utf8');
    students = JSON.parse(data);
  }
} catch (err) {
  console.error("Error loading file:", err.message);
}

function addStudent(name, course, email, phone, duration) {
  students.push({ name, course, email, phone, duration });
  fs.writeFileSync('students.json', JSON.stringify(students, null, 2));
  console.log(`✅ Added: ${name}`);
  console.table(students);
}

function searchStudent(name) {
  const found = students.filter(s => s.name.toLowerCase() === name.toLowerCase());
  if (found.length === 0) {
    console.log(`❌ Not found: ${name}`);
  } else {
    console.log(`🔍 Found: ${found.length}`);
    console.table(found);
  }
}

function countStudents() {
  console.log(`📊 Total: ${students.length}`);
}

function updateStudent(name, newCourse, newEmail, newPhone, newDuration) {
  const s = students.find(x => x.name.toLowerCase() === name.toLowerCase());
  if (!s) { console.log(`❌ Not found: ${name}`); return; }
  if (newCourse) s.course = newCourse;
  if (newEmail) s.email = newEmail;
  if (newPhone) s.phone = newPhone;
  if (newDuration) s.duration = newDuration;
  fs.writeFileSync('students.json', JSON.stringify(students, null, 2));
  console.log(`✅ Updated: ${name}`);
  console.table(students);
}

function sortStudents() {
  students.sort((a, b) => a.name.localeCompare(b.name));
  fs.writeFileSync('students.json', JSON.stringify(students, null, 2));
  console.log("🔀 Sorted:");
  console.table(students);
}

module.exports = { addStudent, searchStudent, countStudents, updateStudent, sortStudents };