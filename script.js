const yearElement = document.getElementById("year");
const countdownButton = document.getElementById("countdown-btn");
const countdownResult = document.getElementById("countdown-result");
const filterButtons = document.querySelectorAll(".filter-btn");
const trackCards = document.querySelectorAll(".track-card");
const joinForm = document.getElementById("join-form");
const feedback = document.getElementById("form-feedback");
const studentCount = document.getElementById("total-student");

yearElement.textContent = new Date().getFullYear();

const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;
let demoDay = new Date(Date.now() + THIRTY_DAYS_MS);
let countdownIntervalId;

function updateCountdown() {
    const diffMs = demoDay - new Date();

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
    countdownButton.addEventListener("click", startDemoCountdown);
    startDemoCountdown();
}

filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        filterButtons.forEach((btn) => btn.classList.remove("active"));
        button.classList.add("active");

        const selectedTrack = button.dataset.track;

        trackCards.forEach((card) => {
            if (selectedTrack === "all" || card.dataset.track === selectedTrack) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    });
});

joinForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;

    if (!name || !email) {
        feedback.textContent = "Please fill in all fields.";
        feedback.style.color = "crimson";
        return;
    }

    feedback.textContent = "Thanks, your registration was received.";
    feedback.style.color = "green";

    if (studentCount) {
        studentCount.textContent = Number(studentCount.textContent) + 1;
    }

    joinForm.reset();
});
