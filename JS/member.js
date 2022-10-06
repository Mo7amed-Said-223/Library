let sectionNewMember = document.querySelector(".addmember");
let btnNewMember = document.querySelector(".buttons button");
let btnBack = document.querySelector(".footer > button");
let memberMenu = document.querySelector(".members");
let moveing = document.querySelector(".moveing");
const table = document.querySelector(".table");
const search = document.querySelector(".search");
const form = document.querySelector("form");

btnNewMember.onclick = () => {
    memberMenu.style.display = "none";
    sectionNewMember.style.display = "block";
    form.setAttribute("action", "/PHP/member/insert.php");
    document.forms[0].onsubmit = function (e) {
        insert(e);
    };
};

btnBack.onclick = (e) => {
    memberMenu.style.display = "block";
    sectionNewMember.style.display = "none";
    e.preventDefault();
};

//*Data from database
let memberData;

function getDataMember() {
    fetch("/PHP/member/select.php")
        .then((request) => request.json())
        .then((d) => {
            showPage(new Array(...d));
        });
}
getDataMember();

//*ShowData

function showPage(memberData) {
    let title = table.querySelector("*");
    table.innerHTML = ``;
    table.append(title);
    for (let index = 0; index < memberData.length; index++) {
        const member = memberData[index];
        table.innerHTML += showMembers(
            member.photo,
            member.name,
            member.id,
            member.gmail,
            member.subscribe_date,
            member.admin
        );
    }
}

function showMembers(img, name, id, gmail, date_s, admin) {
    return `<div class="tr">
                <div class="td">${id}</div>
                <div class="td">${name}</div>
                <div class="td">${gmail}</div>
                <div class="td"> <img src="../uploads/${img}" alt=""></div>
                <div class="td">${date_s}</div>
                <div class="td">${admin == "1" ? "Yes" : "No"}</div>
                <div class="td"> <i class="icon-pencil-square" onclick="showEdit(${id})"></i><i class="icon-trash" onclick="del(${id})"></i></div>
            </div>`;
}

// //*newMember
let inputs = document.querySelectorAll(".input input");

inputs.forEach((inp) => {
    inp.addEventListener("change", function (e) {
        let l = e.currentTarget.id;
        let label = document.querySelector('label[for="' + l + '"]');

        if (e.currentTarget.value == "") {
            label.innerHTML = [...label.innerHTML, " ", "*"].join("");
            e.currentTarget.style.borderColor = "red";
        } else {
            if (label.innerHTML.includes("*")) {
                label.innerHTML = label.innerHTML
                    .split("")
                    .slice(0, -1)
                    .join("");
                e.currentTarget.style.borderColor = "green";
            }
        }
    });
});


let gmailVaild = /\w+@gmail.com/;
let gmail = document.getElementById("gmail");
gmail.onchange = () => {
    gmailVaild.test(gmail.value)
        ? (gmail.style.borderColor = "green")
        : (gmail.style.borderColor = "red");
};


let confermPassWord = document.querySelector("#ConfirmPassword");
let PassWord = document.querySelector("#password");
confermPassWord.onchange = () => {
    confermPassWord.value == PassWord.value
        ? (confermPassWord.style.borderColor = "green")
        : (confermPassWord.style.borderColor = "red");
};

//^ show img upload
let image = document.querySelector(".input img");
function loadFile(event) {
    var reader = new FileReader();
    reader.onload = function () {
        image.src = reader.result;
        image.style.zIndex = "1";
    };
    reader.readAsDataURL(event.target.files[0]);
}
//* Search member
search.querySelector("i").onclick = () => {
    let member = search.querySelector("input").value;
    let data = {
        key: member,
    };
    fetch("/PHP/member/search.php", {
        method: "POST",
        body: JSON.stringify(data),
    })
        .then((request) => request.json())
        .then((d) => {
            showPage(new Array(...d));
        });
};
function del(ID) {
    let data = {
        id: ID,
    };
    fetch("/PHP/member/delete.php", {
        method: "POST",
        body: JSON.stringify(data),
    }).then(() => {
        getDataMember(1);
    });
}

function showEdit(ID) {
    form.setAttribute("action", "/PHP/member/edit.php");
    memberMenu.style.display = "none";
    sectionNewMember.style.display = "block";
    document.getElementById("idMember").value = ID;
    document.forms[0].onsubmit = function (e) {
        update(e);
    };
}

function insert(e) {
    let arr = [...inputs];
    let bool = arr.every((inp) => inp.value != "");
    if (!bool) {
        inputs.forEach((inp) => {
            if (inp.value === "") {
                inp.style.borderColor = "red";
            }
        });
    }
    if (!gmailVaild.test(gmail.value)) {
        gmail.style.borderColor = "red";
        bool = false;
    }
    if (confermPassWord.value != PassWord.value) bool = false;
    if (document.querySelector("select").value == "-") bool = false;
    if (bool) {
        btnBack.onclick();
    } else {
        e.preventDefault();
    }
}

function update(e) {
    let arr = [...inputs];
    let bool = arr.every((inp) => inp.value == "");
    if (!gmailVaild.test(gmail.value)) {
        gmail.style.borderColor = "red";
        bool = false;
    }
    if (bool) {
        e.preventDefault();
    } else {
        btnBack.onclick();
    }
}
