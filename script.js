
const checkInBtn = document.getElementById("checkInBtn");
const checkOutBtn = document.getElementById("checkOutBtn");
const startTime = document.getElementById("startTime");
const endTimeEl = document.getElementById("endTime");
const durationEl = document.getElementById("duration");
const shiftList = document.getElementById("shiftList");
const totalShiftsEl = document.getElementById("totalShifts");
const totalTimeEl = document.getElementById("totalTime");

// function to play alarm sound

function playAlarm(message) {
  alarmSound.currentTime = 0;  // Rewind if it's already playing
  alarmSound.play();
  alert(message);  // Show the alert
}

let shifts = [];
let currentShift = null;
const alarmSound = document.getElementById("alarmSound");
checkInBtn.addEventListener("click", () => {
  if (currentShift) {
    playAlarm("Don't change your time of arrival.");
    return;
  }
  const now = new Date();
  currentShift = { start: now };
  startTime.textContent = now.toLocaleTimeString();
});

checkOutBtn.addEventListener("click", () => {
  if (!currentShift) {
    alert("Please check in first.");
    return;
  }
  const now = new Date();
  currentShift.end = now;

  const durationMs = currentShift.end - currentShift.start;
  const mins = Math.floor(durationMs / 60000);
  const hrs = Math.floor(mins / 60);
  const remainingMins = mins % 60;

  endTimeEl.textContent = now.toLocaleTimeString();
  durationEl.textContent = `${hrs}h ${remainingMins}m`;

  shifts.push({ ...currentShift, durationMs });
  updateSummary();
  currentShift = null;
});

function updateSummary() {
  shiftList.innerHTML = "";
  let totalMs = 0;

  shifts.forEach((shift, index) => {
    const li = document.createElement("li");
    const start = shift.start.toLocaleTimeString();
    const end = shift.end.toLocaleTimeString();
    const mins = Math.floor(shift.durationMs / 60000);
    const hrs = Math.floor(mins / 60);
    const rem = mins % 60;
    li.textContent = `Shift ${index + 1}: ${start} - ${end} (${hrs}h ${rem}m)`;
    shiftList.appendChild(li);
    totalMs += shift.durationMs;
  });

  totalShiftsEl.textContent = shifts.length;
  const totalMins = Math.floor(totalMs / 60000);
  const totalHrs = Math.floor(totalMins / 60);
  const remainingMins = totalMins % 60;
  totalTimeEl.textContent = `${totalHrs} hrs ${remainingMins} mins`;

  const checkInBtn = document.getElementById("checkInBtn");
  const checkOutBtn = document.getElementById("checkOutBtn");
  const startTime = document.getElementById("startTime");
  const endTimeEl = document.getElementById("endTime");
  const durationEl = document.getElementById("duration");
  const shiftList = document.getElementById("shiftList");
  const totalShiftsEl = document.getElementById("totalShifts");
  const totalTimeEl = document.getElementById("totalTime");

  // function to play alarm sound

  function playAlarm(message) {
    alarmSound.currentTime = 0;  // Rewind if it's already playing
    alarmSound.play();
    alert(message);  // Show the alert
  }

  let shifts = [];
  let currentShift = null;
  const alarmSound = document.getElementById("alarmSound");
  checkInBtn.addEventListener("click", () => {
    if (currentShift) {
      playAlarm("Don't change your time of arrival.");
      return;
    }
    const now = new Date();
    currentShift = { start: now };
    startTime.textContent = now.toLocaleTimeString();
  });

  checkOutBtn.addEventListener("click", () => {
    if (!currentShift) {
      alert("Please check in first.");
      return;
    }
    const now = new Date();
    currentShift.end = now;

    const durationMs = currentShift.end - currentShift.start;
    const mins = Math.floor(durationMs / 60000);
    const hrs = Math.floor(mins / 60);
    const remainingMins = mins % 60;

    endTimeEl.textContent = now.toLocaleTimeString();
    durationEl.textContent = `${hrs}h ${remainingMins}m`;

    shifts.push({ ...currentShift, durationMs });
    updateSummary();
    currentShift = null;
  });

  function updateSummary() {
    shiftList.innerHTML = "";
    let totalMs = 0;

    shifts.forEach((shift, index) => {
      const li = document.createElement("li");
      const start = shift.start.toLocaleTimeString();
      const end = shift.end.toLocaleTimeString();
      const mins = Math.floor(shift.durationMs / 60000);
      const hrs = Math.floor(mins / 60);
      const rem = mins % 60;
      li.textContent = `Shift ${index + 1}: ${start} - ${end} (${hrs}h ${rem}m)`;
      shiftList.appendChild(li);
      totalMs += shift.durationMs;
    });

    totalShiftsEl.textContent = shifts.length;
    const totalMins = Math.floor(totalMs / 60000);
    const totalHrs = Math.floor(totalMins / 60);
    const remainingMins = totalMins % 60;
    totalTimeEl.textContent = `${totalHrs} hrs ${remainingMins} mins`;
  }
}

// login
document.addEventListener("DOMContentLoaded", function () {
  const checkInBtn = document.getElementById("checkInBtn");
  const checkOutBtn = document.getElementById("checkOutBtn");
  const userSelectContainer = document.getElementById("userSelectContainer");
  const userSelect = document.getElementById("userSelect");
  const startShiftBtn = document.getElementById("startShiftBtn");
  const currentUserDisplay = document.getElementById("currentUserDisplay");

  const startTimeEl = document.getElementById("startTime");
  const endTimeEl = document.getElementById("endTime");
  const durationEl = document.getElementById("duration");
  const beepSound = document.getElementById("beepound");

  let currentUser = "";
  let shiftStart = null;

  // Get users from localStorage (set in registration page)
  function loadUsers() {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    userSelect.innerHTML = ""; // clear
    users.forEach(user => {
      const option = document.createElement("option");
      option.value = user.username;
      option.textContent = user.username;
      userSelect.appendChild(option);
    });
  }

  // Show dropdown on check in
  checkInBtn.addEventListener("click", function () {
    loadUsers();
    userSelectContainer.style.display = "block";
  });

  // Start shift after selecting user
  startShiftBtn.addEventListener("click", function () {
    currentUser = userSelect.value;
    if (!currentUser) return alert("Please select your name.");

    userSelectContainer.style.display = "none";
    currentUserDisplay.textContent = `Current User: ${currentUser}`;

    shiftStart = new Date();
    startTimeEl.textContent = shiftStart.toLocaleTimeString();
    endTimeEl.textContent = "";
    durationEl.textContent = "";
    beepSound.play();

    localStorage.setItem("currentShift", JSON.stringify({
      user: currentUser,
      start: shiftStart
    }));
  });

  // End shift
  checkOutBtn.addEventListener("click", function () {
    if (!shiftStart) return alert("You haven't checked in yet.");
    const shiftEnd = new Date();
    endTimeEl.textContent = shiftEnd.toLocaleTimeString();

    const diffMs = shiftEnd - shiftStart;
    const diffMins = Math.floor(diffMs / 60000);
    const hours = Math.floor(diffMins / 60);
    const mins = diffMins % 60;

    durationEl.textContent = `${hours} hrs ${mins} mins`;
    beepSound.play();

    localStorage.removeItem("currentShift");
  });

  // Restore session if shift in progress
  const savedShift = JSON.parse(localStorage.getItem("currentShift"));
  if (savedShift) {
    currentUser = savedShift.user;
    shiftStart = new Date(savedShift.start);
    currentUserDisplay.textContent = `Current User: ${currentUser}`;
    startTimeEl.textContent = shiftStart.toLocaleTimeString();
  }
});
document.addEventListener("DOMContentLoaded", function () {
  const userSelect = document.getElementById("userSelect");

  function loadUsers() {
    const usersData = JSON.parse(localStorage.getItem("users")) || [];
    userSelect.innerHTML = ""; // clear previous options

    if(usersData.length === 0) {
      alert("No registered users found in localStorage.");
      return;
    }

    usersData.forEach(user => {
      let username = typeof user === "string" ? user : user.username;
      const option = document.createElement("option");
      option.value = username;
      option.textContent = username;
      userSelect.appendChild(option);
    });
  }

  // Call loadUsers() when showing the dropdown
  document.getElementById("checkInBtn").addEventListener("click", () => {
    loadUsers();
    document.getElementById("userSelectContainer").style.display = "block";
  });
});
