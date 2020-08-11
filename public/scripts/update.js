// can get javascript dom elements with just the id name apparently
const selectedPatient = patientID.getAttribute("data-selected");
const selectedType = questType.getAttribute("data-selected");
const selectedDifficulty = questDifficulty.getAttribute("data-selected");
const selectedObjective = questObjectives.getAttribute("data-selected");
const selectedDescription = questDescription.getAttribute("data-selected");
const selectedStatus = questStatus.getAttribute("data-selected");

const patientRecord = document.querySelector("#patientRecord");
const firstName = document.querySelector("#firstName");
const lastName = document.querySelector("#lastName");
const questType = document.querySelector("#questType");
const questName = document.querySelector("#questName");
const questDifficulty = document.querySelector("#questDifficulty");
const questItems = document.querySelector("#questItems");
const questObjectives = document.querySelector("#questObjectives");
const questDescription = document.querySelector("#questDescription");
const questRewards = document.querySelector("#questRewards");
const questStatus = document.querySelector("#questStatus");
const form = document.querySelector("#form");
const updateBtn = document.querySelector("#updateBtn");
const deleteBtn = document.querySelector("#deleteBtn");
const action = document.querySelector("#action");
const mistake = document.querySelector("#mistake").value;

const updateFields = () => {
	const patient = patientRecord.options[patientRecord.selectedIndex];
	questType.value = patient.getAttribute("data-questType");
	questName.value = patient.getAttribute("data-questName");
	questDifficulty.value = patient.getAttribute("data-questDifficulty");
	questItems.value = patient.getAttribute("data-questItems");
	questObjectives.value = patient.getAttribute("data-questObjectives");
	questDescription.value = patient.getAttribute("data-questDescription");
	questRewards.value = patient.getAttribute("data-questRewards");
	questStatus.value = patient.getAttribute("data-questStatus");
	homePhone.value = formatPhone(patient.getAttribute("data-homePhone"));
	workPhone.value = formatPhone(patient.getAttribute("data-workPhone"));
	email.value = patient.getAttribute("data-email");
	meds.value = patient.getAttribute("data-medication");
	notes.value = patient.getAttribute("data-notes");
};

if (selectedPatient !== "") {
	patientID.value = selectedPatient;
}

if (selectedType !== "") {
	questType.value = selectedType;
}

if (selectedDifficulty !== "") {
	questDifficulty.value = selectedDifficulty;
}

if (selectedObjective !== "") {
	questObjectives.value = selectedObjective;
}

if (selectedDescription !== "") {
	questDescription.value = selectedDescription;
}

if (selectedStatus !== "") {
	questStatus.value = selectedStatus;
}
