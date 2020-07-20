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
    homePhone.value = patient.getAttribute("data-homePhone");
    workPhone.value = patient.getAttribute("data-workPhone");
    email.value = patient.getAttribute("data-email");
    meds.value = patient.getAttribute("data-medication");
    notes.value = patient.getAttribute("data-notes");
};

patientRecord.addEventListener("change", () => {
    updateFields();
});

updateFields();
