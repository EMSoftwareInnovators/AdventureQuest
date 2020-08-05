const stars = document.querySelectorAll(".fa-star");
const trashCans = document.querySelectorAll(".trashcan");
const deleteForms = document.querySelectorAll(".delete-form");
const topNav = document.querySelector("#top-nav");
const topNavContent = topNav.innerHTML;
const table = document.querySelector("table");
const container = document.querySelector("#container");
const username = document.querySelector("#navbarDropdown").getAttribute("data-username");

for (const star of stars) {
    star.addEventListener("click", () => {
        star.classList.toggle("favorite");
        const threadID = star.getAttribute("data-threadID");
        if (star.classList.contains("favorite")) {
            let xhr = new XMLHttpRequest();
            xhr.open("PUT", `http://localhost:5000/messages/favorite/${threadID}/true`, true);
            xhr.send();
        } else {
            let xhr = new XMLHttpRequest();
            xhr.open("PUT", `http://localhost:5000/messages/favorite/${threadID}/false`, true);
            xhr.send();
        }
    });
}

for (let i = 0; i < trashCans.length; i++) {
    trashCans[i].addEventListener("click", () => {
        deleteForms[i].submit();
    });
}

/**
 * Mobile Formatting
 */
const mobileFormat = () => {
    if (table !== null) {
        table.classList.remove("my-5");
        table.classList.add("table-striped");
        container.classList.remove("container");
        container.classList.add("container-fluid");
    }
    topNav.classList.add("ml-1");
    topNav.innerHTML = `<li class="nav-item">
        <a class="nav-link">
            <i class="fas fa-user"></i> ${username}
        </a>
    </li>

    <li class="nav-item">
        <a class="nav-link" href="/messages">
            <i class="far fa-envelope"></i> Messages
        </a>
    </li>

    <li class="nav-item">
        <a class="nav-link" href="users/login">
            <i class="fas fa-sign-out-alt"></i> Logout
        </a>
    </li>

    <li class="nav-item">
        <a class="nav-link" href="/records">
            <i class="fas fa-folder"></i> Patient Records
        </a>
    </li>

    <li class="nav-item">
        <a class="nav-link" href="/patient">
            <i class="fas fa-folder"></i> New Patient
        </a>
    </li>

    <li class="nav-item">
        <a class="nav-link" href="/quest">
            <i class="fas fa-folder"></i> New Quest
        </a>
    </li>

    <li class="nav-item">
        <a class="nav-link" href="/info">
            <i class="fas fa-folder"></i> Account Info
        </a>
    </li>

    <li class="nav-item">
        <a class="nav-link" href="/help">
            <i class="far fa-question-circle"></i> Help
        </a>
    </li>
	`;
};

const wideFormat = () => {
    if (table !== null) {
        table.classList.add("my-5");
        table.classList.remove("table-striped");
        container.classList.add("container");
        container.classList.remove("container-fluid");
    }
    topNav.innerHTML = topNavContent;
};

window.onload = () => {
    if (window.outerHeight) {
        const browserDimensions = {
            width: window.outerWidth,
            height: window.outerHeight,
        };
        if (browserDimensions.width <= 850) {
            mobileFormat();
        } else {
            wideFormat();
        }
    } else {
        // IE compatibility
        const browserDimensions = {
            width: document.body.clientWidth,
            height: document.body.clientHeight,
        };
    }
};

window.onresize = () => {
    if (window.outerHeight) {
        const browserDimensions = {
            width: window.outerWidth,
            height: window.outerHeight,
        };
        if (browserDimensions.width <= 850) {
            mobileFormat();
        } else {
            wideFormat();
        }
    } else {
        // IE compatibility
        const browserDimensions = {
            width: document.body.clientWidth,
            height: document.body.clientHeight,
        };
    }
};
