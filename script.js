
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
