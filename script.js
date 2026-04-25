const yearElement = document.getElementById("year");
const countdownButton = document.getElementById("countdown-btn");
const countdownResult = document.getElementById("countdown-result");
const toggleBtn = document.getElementById("theme-toggle");

if (toggleBtn) {
  toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
  });
}
if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;
let demoDay = new Date(Date.now() + THIRTY_DAYS_MS);
let countdownIntervalId;

function updateCountdown() {
    const diffMs = demoDay - new Date();

    if (!countdownResult) {
        return;
    }

    if (diffMs <= 0) {
        countdownResult.textContent = "Demo day is here.";
        clearInterval(countdownIntervalId);
        return;
    }

    const totalSeconds = Math.floor(diffMs / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    countdownResult.textContent = `Demo day in ${days}d ${hours}h ${minutes}m ${seconds}s.`;
}

function startDemoCountdown() {
    demoDay = new Date(Date.now() + THIRTY_DAYS_MS);
    clearInterval(countdownIntervalId);
    updateCountdown();
    countdownIntervalId = setInterval(updateCountdown, 1000);
}

if (countdownButton && countdownResult) {
    countdownResult.textContent = "";
    countdownButton.addEventListener("click", startDemoCountdown);
}

renderAttendance();

announcementForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!announcementInput || !announcementList) {
        return;
    }

    const message = announcementInput.value.trim();
    if (!message) {
        return;
    }

    const listItem = document.createElement("li");
    listItem.textContent = message;
    announcementList.prepend(listItem);
    announcementForm.reset();
});
