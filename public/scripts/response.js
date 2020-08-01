const replyBtn = document.querySelector("#replyBtn");
const deleteBtn = document.querySelector("#deleteBtn");
const cancelBtn = document.querySelector("#cancelBtn");
const responseBtns = document.querySelector("#responseBtns");
const responseArea = document.querySelector("#responseArea");

if (replyBtn !== null && deleteBtn !== null) {
    replyBtn.addEventListener("click", () => {
        responseBtns.classList.remove("d-flex");
        responseBtns.classList.add("d-none");
        responseArea.classList.remove("d-none");
    });
    cancelBtn.addEventListener("click", () => {
        responseBtns.classList.remove("d-none");
        responseBtns.classList.add("d-flex");
        responseArea.classList.add("d-none");
    });
    deleteBtn.addEventListener("click", () => {
        // Server request to delete message goes here
    });
}
