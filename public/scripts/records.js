const patientRecord = document.querySelector("#patientRecord");
const firstName = document.querySelector("#firstName");
const middleName = document.querySelector("#middleName");
const lastName = document.querySelector("#lastName");
const homePhone = document.querySelector("#homePhone");
const workPhone = document.querySelector("#workPhone");
const email = document.querySelector("#email");
const meds = document.querySelector("#medicationNotes");
const notes = document.querySelector("#patientNotes");

const updateFields = () => {
	const patient = patientRecord.options[patientRecord.selectedIndex];
	firstName.value = patient.getAttribute("data-fName");
	middleName.value = patient.getAttribute("data-mName");
	lastName.value = patient.getAttribute("data-lName");
	homePhone.value = formatPhone(patient.getAttribute("data-homePhone"));
	workPhone.value = formatPhone(patient.getAttribute("data-workPhone"));
	email.value = patient.getAttribute("data-email");
	meds.value = patient.getAttribute("data-medication");
	notes.value = patient.getAttribute("data-notes");
};

const formatPhone = (num) => {
	while (num.includes("-")) {
		num = num.replace("-", "");
	}

	/**
	 * Check to make sure each value is an integer
	 */
	// const numArr = num.split('');
	// numArr.map((value) => {
	//     if()
	// })

	if (num.length > 10) {
		return num.slice(0, 10);
	}

	if (num.length == 10) {
		return `${num.slice(0, 3)}-${num.slice(3, 6)}-${num.slice(6, 10)}`;
	} else {
		return num;
	}
};

homePhone.addEventListener("input", () => {
	homePhone.value = formatPhone(homePhone.value);
});

workPhone.addEventListener("input", () => {
	workPhone.value = formatPhone(workPhone.value);
});

patientRecord.addEventListener("change", () => {
	updateFields();
});

updateFields();
