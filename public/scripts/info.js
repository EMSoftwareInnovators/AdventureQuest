const phone = document.querySelector("#phone");

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

phone.value = formatPhone(phone.value);

phone.addEventListener("input", () => {
    phone.value = formatPhone(phone.value);
});
