const topNav = document.querySelector("#top-nav");
const pageNav = document.querySelector("#page-nav");
const username = document.querySelector("#navbarDropdown").getAttribute("data-username");
const pageNavContent = pageNav.innerHTML;
const topNavContent = topNav.innerHTML;

const mobileFormat = () => {
    pageNav.innerHTML = "";
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
        <a class="nav-link" href="/users/login">
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
    pageNav.innerHTML = pageNavContent;
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
