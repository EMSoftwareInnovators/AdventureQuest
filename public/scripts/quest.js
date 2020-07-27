// can get javascript dom elements with just the id name apparently
const selectedPatient = patientID.getAttribute("data-selected");
const selectedType = questType.getAttribute("data-selected");
const selectedDifficulty = questDifficulty.getAttribute("data-selected");
const selectedObjective = questObjectives.getAttribute("data-selected");
const selectedDescription = questDescription.getAttribute("data-selected");
const selectedStatus = questStatus.getAttribute("data-selected");

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
