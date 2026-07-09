
let studentName = "";               // string
let totalEnrollments = 0;           // number
let isDarkMode = true;              // boolean
const basicCourses = ["HTML & CSS", "JavaScript"];
const advancedCourses = ["React", "Node.js", "MongoDB"];


const allCourses = [...basicCourses, ...advancedCourses, "Bootstrap"];

// Rest operator: accept any number of counts and total them up
const sumEnrollments = (...counts) => counts.reduce((total, n) => total + n, 0);
// e.g. sumEnrollments(2, 5, 3) -> 10

// Arrow function: build a personalised welcome message
const showWelcome = (name) => `Welcome to SkillHub, ${name}! 🎉`;

/* ============================================================
   3) FUNCTIONS  (Day 7 · Hour 1)
============================================================ */
function updateHeroGreeting(name) {
  const heroTitle = document.getElementById("heroTitle");
  heroTitle.textContent = showWelcome(name);
}

/* ============================================================
   4) DOM MANIPULATION  (Day 6 · Hour 2)
============================================================ */

// Small inline toast — replaces blocking alert() popups for non-critical messages
function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.remove("d-none");
  requestAnimationFrame(() => toast.classList.add("show"));
  clearTimeout(showToast._timer);
  showToast._timer = setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.classList.add("d-none"), 300);
  }, 3500);
}

// "Get Started" -> scroll straight to the registration form, no popup needed
const getStartedBtn = document.getElementById("getStartedBtn");
getStartedBtn.addEventListener("click", () => {
  document.getElementById("register").scrollIntoView({ behavior: "smooth" });
  document.getElementById("nameInput").focus();
});

// "Learn More" -> change text with innerHTML, change button style with .style
const learnMoreBtn = document.getElementById("learnMoreBtn");
learnMoreBtn.addEventListener("click", () => {
  const heroLead = document.getElementById("heroLead");
  heroLead.innerHTML = "Every course comes with <strong>real projects</strong>, mentor support, and placement help.";
  learnMoreBtn.style.backgroundColor = "#7dc4e4";
  learnMoreBtn.style.color = "#16171f";
  learnMoreBtn.textContent = "Glad you're curious!";
});

/* ============================================================
   5) EVENTS  (Day 7 · Hour 3)
============================================================ */

// Theme changer
const themeToggleBtn = document.getElementById("themeToggleBtn");
themeToggleBtn.addEventListener("click", () => {
  isDarkMode = !isDarkMode;
  document.body.style.backgroundColor = isDarkMode ? "#1a1b26" : "#f4f5f7";
  document.body.style.color = isDarkMode ? "#cdd3e8" : "#1a1a1a";
  themeToggleBtn.textContent = isDarkMode ? "🌙 Dark" : "☀️ Light";
});

// Join Now -> today's date via new Date(), shown as a toast instead of a popup
const joinNowBtn = document.getElementById("joinNowBtn");
joinNowBtn.addEventListener("click", () => {
  const today = new Date();
  showToast(`Thanks for your interest! Today is ${today.toDateString()}. Our team will reach out shortly.`);
});

// Course counter -- every "Enroll" button increments a shared counter
const enrollButtons = document.querySelectorAll(".enroll-btn");
const counterBadge = document.getElementById("enrollCounter");

enrollButtons.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    totalEnrollments++;
    counterBadge.textContent = `Total Enrollments: ${totalEnrollments}`;
    event.target.textContent = "Enrolled ✓";
    event.target.disabled = true;
  });
});

// Footer year — always current, no need to update it by hand
document.getElementById("year").textContent = new Date().getFullYear();

// Populate the registration course dropdown from the ES6 spread array
const courseSelectEl = document.getElementById("courseSelect");
allCourses.forEach((course) => {
  const option = document.createElement("option");
  option.value = course;
  option.textContent = course;
  courseSelectEl.appendChild(option);
});

/* ============================================================
   6) CONDITIONAL STATEMENTS  (Day 8 · Hour 2)
============================================================ */
const experienceSelect = document.getElementById("experienceSelect");
const experienceTip = document.getElementById("experienceTip");

experienceSelect.addEventListener("change", () => {
  const level = experienceSelect.value;

  if (level === "beginner") {
    experienceTip.textContent = "💡 Tip: Start with HTML & CSS before jumping into JavaScript.";
  } else if (level === "intermediate") {
    experienceTip.textContent = "💡 Tip: You're ready for our JavaScript + React track.";
  } else if (level === "advanced") {
    experienceTip.textContent = "💡 Tip: Jump straight into our MERN Full Stack course.";
  } else {
    experienceTip.textContent = "";
  }
});

/* ============================================================
   7) FORM VALIDATION  (Day 8 · Hour 3)
============================================================ */
const registerForm = document.getElementById("registerForm");

function validateName(value) {
  if (value.trim() === "") return "Name is required.";
  if (value.trim().length < 3) return "Name must be at least 3 characters.";
  return "";
}

function validateEmail(value) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (value.trim() === "") return "Email is required.";
  if (!emailPattern.test(value)) return "Enter a valid email address.";
  return "";
}

function validatePassword(value) {
  if (value === "") return "Password is required.";
  if (value.length < 6) return "Password must be at least 6 characters.";
  return "";
}

function validateCourse(value) {
  if (value === "") return "Please select a course.";
  return "";
}

function showFieldError(inputId, errorId, message) {
  const input = document.getElementById(inputId);
  const errorBox = document.getElementById(errorId);
  errorBox.textContent = message;
  input.classList.toggle("is-invalid", message !== "");
}

registerForm.addEventListener("submit", (event) => {
  event.preventDefault(); // stop the page from refreshing

  const nameInput = document.getElementById("nameInput");
  const emailInput = document.getElementById("emailInput");
  const passwordInput = document.getElementById("passwordInput");
  const courseSelect = document.getElementById("courseSelect");

  // Destructuring: pull all four values out of one object at once
  const { name, email, password, course } = {
    name: nameInput.value,
    email: emailInput.value,
    password: passwordInput.value,
    course: courseSelect.value,
  };

  const nameError = validateName(name);
  const emailError = validateEmail(email);
  const passwordError = validatePassword(password);
  const courseError = validateCourse(course);

  showFieldError("nameInput", "nameError", nameError);
  showFieldError("emailInput", "emailError", emailError);
  showFieldError("passwordInput", "passwordError", passwordError);
  showFieldError("courseSelect", "courseErrorMsg", courseError);

  const allValid = [nameError, emailError, passwordError, courseError].every(
    (msg) => msg === ""
  );

  if (allValid) {
    studentName = name;
    const successBox = document.getElementById("registerSuccess");
    successBox.textContent = `🎉 ${showWelcome(name)} You're registered for ${course}.`;
    successBox.classList.remove("d-none");
    updateHeroGreeting(name);
    registerForm.reset();
    document.querySelectorAll("#registerForm .is-invalid").forEach((el) => {
      el.classList.remove("is-invalid");
    });
  }
});