const homePhone = document.querySelector("#homePhone");
const workPhone = document.querySelector("#workPhone");

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

homePhone.value = formatPhone(homePhone.value);
workPhone.value = formatPhone(workPhone.value);
