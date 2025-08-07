function startApp() {
  document.getElementById('welcome').classList.add('hidden');
  document.getElementById('app').classList.remove('hidden');
}

const habitInput = document.getElementById("habitInput");
const habitList = document.getElementById("habitList");

function loadHabits() {
  const habits = JSON.parse(localStorage.getItem("habits")) || [];
  habitList.innerHTML = "";
  habits.forEach((habit, index) => {
    const li = document.createElement("li");
    li.textContent = habit;
    li.onclick = () => {
      habits.splice(index, 1);
      localStorage.setItem("habits", JSON.stringify(habits));
      loadHabits();
    };
    habitList.appendChild(li);
  });
}

function addHabit() {
  const habit = habitInput.value.trim();
  if (!habit) return;
  const habits = JSON.parse(localStorage.getItem("habits")) || [];
  habits.push(habit);
  localStorage.setItem("habits", JSON.stringify(habits));
  habitInput.value = "";
  loadHabits();
}

function requestNotificationPermission() {
  Notification.requestPermission().then(permission => {
    if (permission === "granted") {
      scheduleReminder();
      alert("Reminders enabled!");
    }
  });
}

function scheduleReminder() {
  setInterval(() => {
    if (Notification.permission === "granted") {
      new Notification("Don't forget to check your habits today!");
    }
  }, 1000 * 60 * 60 * 6); // Every 6 hours
}

window.onload = loadHabits;
