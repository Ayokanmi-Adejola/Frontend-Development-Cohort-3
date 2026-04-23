const yearElement = document.getElementById("year");
const countdownButton = document.getElementById("countdown-btn");
const countdownResult = document.getElementById("countdown-result");
const trackSelect = document.getElementById("track-select");
const trackDetail = document.getElementById("track-detail");
const joinForm = document.getElementById("join-form");
const feedback = document.getElementById("form-feedback");
const studentCount = document.getElementById("total-students");

const progressText = document.getElementById("progress-text");
const progressFill = document.getElementById("progress-fill");
const completeWeekButton = document.getElementById("complete-week-btn");

const officeHoursForm = document.getElementById("office-hours-form");
const officeFeedback = document.getElementById("office-feedback");

const checkinButton = document.getElementById("checkin-btn");
const attendanceStatus = document.getElementById("attendance-status");
const attendanceCount = document.getElementById("attendance-count");

const announcementForm = document.getElementById("announcement-form");
const announcementInput = document.getElementById("announcement-input");
const announcementList = document.getElementById("announcement-list");

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

const trackDescriptions = {
    html: "Structure pages with semantic and accessible markup.",
    css: "Learn spacing, typography, and responsive breakpoints.",
    javascript: "Build interactions with events, state, and rendering.",
    react: "Build reusable components, props flow, and modern UI patterns.",
    typescript: "Add safer types for components, functions, and API responses.",
    api: "Connect apps to external data using async requests and error handling.",
    state: "Manage local and shared state for scalable frontend applications.",
    testing: "Write unit and UI tests, then validate behavior before release.",
    deployment: "Prepare, optimize, and deploy frontend apps to production platforms.",
    performance: "Improve load speed and runtime performance with practical techniques."
};

function renderTrackDetail() {
    if (!(trackSelect instanceof HTMLSelectElement) || !trackDetail) {
        return;
    }

    const selectedKey = trackSelect.value;
    const selectedLabel = trackSelect.options[trackSelect.selectedIndex]?.text || "";
    const description = trackDescriptions[selectedKey] || "";

    trackDetail.innerHTML = `
        <h3>${selectedLabel}</h3>
        <p>${description}</p>
    `;
}

trackSelect?.addEventListener("change", renderTrackDetail);
renderTrackDetail();

joinForm?.addEventListener("submit", (event) => {
    event.preventDefault();

    const nameField = document.getElementById("name");
    const emailField = document.getElementById("email");

    if (!(nameField instanceof HTMLInputElement) || !(emailField instanceof HTMLInputElement) || !feedback) {
        return;
    }

    const name = nameField.value.trim();
    const email = emailField.value.trim();
    const nameIsValid = /^[a-zA-Z][a-zA-Z\s'-]{1,}$/.test(name);
    const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!nameIsValid) {
        feedback.textContent = "Enter a valid name with at least 2 characters.";
        feedback.style.color = "crimson";
        return;
    }

    if (!emailIsValid) {
        feedback.textContent = "Enter a valid email address.";
        feedback.style.color = "crimson";
        return;
    }

    feedback.textContent = "Thanks, your registration was received.";
    feedback.style.color = "green";

    if (studentCount) {
        studentCount.textContent = String(Number(studentCount.textContent) + 1);
    }

    joinForm.reset();
});

let currentWeek = Number(localStorage.getItem("cohortCurrentWeek") || "1");

function renderProgress() {
    currentWeek = Math.max(1, Math.min(12, currentWeek));
    if (progressText) {
        progressText.textContent = `Week ${currentWeek} of 12`;
    }
    if (progressFill) {
        progressFill.style.width = `${(currentWeek / 12) * 100}%`;
    }
}

completeWeekButton?.addEventListener("click", () => {
    if (currentWeek < 12) {
        currentWeek += 1;
        localStorage.setItem("cohortCurrentWeek", String(currentWeek));
        renderProgress();
    }
});

renderProgress();

officeHoursForm?.addEventListener("submit", (event) => {
    event.preventDefault();

    const officeName = document.getElementById("office-name");
    const officeSlot = document.getElementById("office-slot");
    if (!(officeName instanceof HTMLInputElement) || !(officeSlot instanceof HTMLSelectElement) || !officeFeedback) {
        return;
    }

    if (!officeName.value.trim() || !officeSlot.value) {
        officeFeedback.textContent = "Enter your name and choose a slot.";
        officeFeedback.style.color = "crimson";
        return;
    }

    officeFeedback.textContent = `Booked: ${officeName.value.trim()} for ${officeSlot.value}.`;
    officeFeedback.style.color = "green";
    officeHoursForm.reset();
});

const todayKey = new Date().toISOString().slice(0, 10);
let totalCheckins = Number(localStorage.getItem("attendanceTotal") || "0");

function renderAttendance() {
    if (!attendanceStatus || !attendanceCount) {
        return;
    }

    const lastCheckin = localStorage.getItem("attendanceLastCheckin");
    attendanceStatus.textContent =
        lastCheckin === todayKey ? "You already checked in today." : "No check-in yet today.";
    attendanceCount.textContent = `Total check-ins: ${totalCheckins}`;
}

checkinButton?.addEventListener("click", () => {
    const latestDate = localStorage.getItem("attendanceLastCheckin");
    if (latestDate !== todayKey) {
        totalCheckins += 1;
        localStorage.setItem("attendanceTotal", String(totalCheckins));
        localStorage.setItem("attendanceLastCheckin", todayKey);
    }
    renderAttendance();
});

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
