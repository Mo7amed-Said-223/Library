const loginPage = document.querySelector(".login");
const signinPage = document.querySelector(".signin");
const btnLoginPage = document.querySelector(".signin h3 span");
const btnSigninPage = document.querySelector(".login h3 span");
const btnLogin = document.querySelector(".login input[type='submit']");
const btnSignin = document.querySelector(".signin input[type='submit']");

const gmailVaild = /\w+@gmail.com/;

btnLoginPage.onclick = () => {
    loginPage.style.display = "block";
    signinPage.style.display = "none";
    ready(loginPage);
};

btnSigninPage.onclick = () => {
    signinPage.style.display = "block";
    loginPage.style.display = "none";
    ready(signinPage);
    let confermPassWord = signinPage.querySelector("#passwordConfirm");
    let PassWord = signinPage.querySelector("#password");
    confermPassWord.onchange = () => {
        confermPassWord.value == PassWord.value
        ? (confermPassWord.style.borderColor = "green")
            : (confermPassWord.style.borderColor = "red");
    };
};

function ready(page) {
    let inputs = page.querySelectorAll(".input input");
    inputs.forEach((inp) => {
        inp.addEventListener("change", function (e) {
            if (e.currentTarget.value == "") {
                e.currentTarget.style.borderColor = "red";
            } else {
                e.currentTarget.style.borderColor = "green";
            }
        });
    });
    let gmail = page.querySelector("#gmail");
    gmail.onchange = () => {
        gmailVaild.test(gmail.value)
            ? (gmail.style.borderColor = "green")
            : (gmail.style.borderColor = "red");
    };
}

function cheak(page) {
    let arr = [...page.querySelectorAll(".input input")];
    arr.length = arr.length - 1;
    let bool = arr.every((inp) => inp.value != "");
    if (!bool) {
        page.querySelectorAll(".input input").forEach((inp) => {
            if (inp.value === "") {
                inp.style.borderColor = "red";
            }
        });
    }
    let gmail = page.querySelector("#gmail");
    if (!gmailVaild.test(gmail.value)) {
        gmail.style.borderColor = "red";
        bool = false;
    }
    return bool;
}

document.forms[0].onsubmit = function (e) {
    let bool = cheak(loginPage);
    if (!bool) e.preventDefault();
};

document.forms[1].onsubmit = function (e) {
    let bool = cheak(signinPage);
    let confermPassWord = signinPage.querySelector("#passwordConfirm");
    let PassWord = signinPage.querySelector("#password");
    if (confermPassWord.value != PassWord.value) bool = false;
    if (!bool) e.preventDefault();
};
