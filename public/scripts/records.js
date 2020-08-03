const patientRecord = document.querySelector("#patientRecord");
const firstName = document.querySelector("#firstName");
const middleName = document.querySelector("#middleName");
const lastName = document.querySelector("#lastName");
const homePhone = document.querySelector("#homePhone");
const workPhone = document.querySelector("#workPhone");
const email = document.querySelector("#email");
const meds = document.querySelector("#medicationNotes");
const notes = document.querySelector("#patientNotes");
const userID = document.querySelector("#userID");
const form = document.querySelector("#form");
const updateBtn = document.querySelector("#updateBtn");
const deleteBtn = document.querySelector("#deleteBtn");
const action = document.querySelector("#action");
const mistake = document.querySelector("#mistake").value;

const updateFields = () => {
	const patient = patientRecord.options[patientRecord.selectedIndex];
	userID.value = patient.getAttribute("data-userID");
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

	const numArr = num.split("");
	numArr.map((value) => {
		if (!Number.isInteger(parseInt(value))) {
			num = num.replace(num[num.search(value)], "");
		}
	});

	if (num.length > 10) {
		return num.slice(0, 9);
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

updateBtn.addEventListener("click", () => {
	action.value = "update";
	form.submit();
});

deleteBtn.addEventListener("click", () => {
	action.value = "delete";
	form.submit();
});

updateFields();

if (mistake === "true") {
	patientRecord.value = patientRecord.getAttribute("data-selected");
	firstName.value = firstName.getAttribute("data-selected");
	middleName.value = middleName.getAttribute("data-selected");
	lastName.value = lastName.getAttribute("data-selected");
	homePhone.value = formatPhone(homePhone.getAttribute("data-selected"));
	workPhone.value = formatPhone(workPhone.getAttribute("data-selected"));
	email.value = email.getAttribute("data-selected");
	meds.value = meds.getAttribute("data-selected");
	notes.value = notes.getAttribute("data-selected");
}
