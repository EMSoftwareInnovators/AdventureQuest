const stars = document.querySelectorAll(".fa-star");
const topNav = document.querySelector("#top-nav");
const topNavContent = topNav.innerHTML;
const table = document.querySelector("table");
const container = document.querySelector("#container");

/**
 * need to add in function to make all stars yellow for any already starred messages
 */
for (const star of stars) {
    star.addEventListener("click", () => {
        star.classList.toggle("favorite");
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
            <i class="fas fa-user"></i> Johnny Bravo
        </a>
    </li>

    <li class="nav-item">
        <a class="nav-link" href="messages.html">
            <i class="far fa-envelope"></i> Messages
        </a>
    </li>

    <li class="nav-item">
        <a class="nav-link" href="login.html">
            <i class="fas fa-sign-out-alt"></i> Logout
        </a>
    </li>

    <li class="nav-item">
        <a class="nav-link" href="records.html">
            <i class="fas fa-folder"></i> Patient Records
        </a>
    </li>

    <li class="nav-item">
        <a class="nav-link" href="new.html">
            <i class="fas fa-folder"></i> New Patient
        </a>
    </li>

    <li class="nav-item">
        <a class="nav-link" href="quest.html">
            <i class="fas fa-folder"></i> Quest Designer
        </a>
    </li>

    <li class="nav-item">
        <a class="nav-link" href="info.html">
            <i class="fas fa-folder"></i> Account Info
        </a>
    </li>

    <li class="nav-item">
        <a class="nav-link" href="help.html">
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
