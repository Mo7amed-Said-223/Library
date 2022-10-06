let sectionNewBook = document.querySelector(".addbook");
let btnNewBook = document.querySelector(".buttons button");
let btnBack = document.querySelector(".footer > button");
let bookMenu = document.querySelector(".books");
let moveing = document.querySelector(".moveing");
const table = document.querySelector(".table");
const search = document.querySelector(".search");
const form = document.querySelector("form");

btnNewBook.onclick = () => {
    bookMenu.style.display = "none";
    sectionNewBook.style.display = "block";
    form.setAttribute("action", "/PHP/book/insert.php");
    document.forms[0].onsubmit = function (e) {
        insert(e);
    };
};
btnBack.onclick = (e) => {
    bookMenu.style.display = "block";
    sectionNewBook.style.display = "none";
    e.preventDefault();
};

//*Data from database

let bookData;
let limit = 8;
let numOfItems;

//*count of books

fetch("/PHP/count.php")
    .then((request) => request.json())
    .then((d) => {
        numOfItems = d.book;
    })
    .then(() => {
        //* Create Pages Moving
        if (numOfItems > limit) {
            moveing.querySelector(
                ".numbers"
            ).innerHTML = `showing <b> 1-${limit} </b> from <b> ${numOfItems} </b> data `;
            let pages = Math.trunc(numOfItems / limit);
            let pagesMoveing = "";
            for (let i = 0; i <= pages; i++)
                pagesMoveing += `<b onclick=getDataBook(${i * limit + 1})>${
                    i + 1
                }</b>`;
            moveing.querySelector(
                "div"
            ).innerHTML = `<i class="icon-caret-left"></i>${pagesMoveing}<i class="icon-caret-right"></i>`;
            let pagesElements = moveing.querySelectorAll("div > b");
            pagesElements[0].classList.add("checked");
            pagesElements.forEach((ele) => {
                ele.addEventListener("click", (e) => {
                    pagesElements.forEach((e) => {
                        e.classList.remove("checked");
                    });
                    e.currentTarget.classList.add("checked");
                    let num = e.currentTarget.innerHTML;
                    showPage((num - 1) * limit, num * limit);
                    moveing.querySelector(".numbers > b").innerHTML = `${
                        (num - 1) * limit + 1
                    }-${num * limit > numOfItems ? numOfItems : num * limit}`;
                });
            });
        }
    })
    .then(() => {
        getDataBook(1);
    });

function getDataBook(from) {
    let data = {
        from: from,
        limit: limit,
    };
    fetch("/PHP/book/select.php", {
        method: "POST",
        body: JSON.stringify(data),
    })
        .then((request) => request.json())
        .then((d) => {
            showPage(new Array(...d));
        });
}
//*ShowData

function showPage(bookData) {
    let title = table.querySelector("*");
    table.innerHTML = ``;
    table.append(title);
    for (let index = 0; index < bookData.length; index++) {
        const book = bookData[index];
        table.innerHTML += showBooks(
            book.photo,
            book.title,
            book.bookID,
            book.author,
            book.date_created,
            book.date_modified,
            book.name,
            book.price,
            book.noPage
        );
    }
}

function showBooks(img, name, id, author, date_s, date_e, cate, price, pages) {
    return `<div class="tr">
                <div class="td">${id}</div>
                <div class="td">${name}</div>
                <div class="td">${author}</div>
                <div class="td">${cate}</div>
                <div class="td">${price}$</div>
                <div class="td">${pages}</div>
                <div class="td">${date_s}</div>
                <div class="td">${date_e}</div>
                <div class="td"> <img src="../uploads/${img}" alt=""></div>
                <div class="td"> <i class="icon-pencil-square" onclick="showEdit(${id})"></i><i class="icon-trash" onclick="del(${id})"></i><i class="icon-share-square" onclick="view(${id})"></i></div>
            </div>`;
}

//*newBook
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

//* insert categories in select tag

let cate = document.getElementById("id_category");
fetch("/PHP/category/select.php")
    .then((request) => request.json())
    .then((d) => {
        addCategory(new Array(...d));
    });

function addCategory(arr) {
    for (let i = 0; i < arr.length; i++) {
        cate.innerHTML += `<option value="${arr[i].id}">${arr[i].name}</option>`;
    }
}

//^Search Book
search.querySelector("i").onclick = () => {
    let book = search.querySelector("input").value;
    let data = {
        key: book,
    };
    fetch("/PHP/book/search.php", {
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
    fetch("/PHP/book/delete.php", {
        method: "POST",
        body: JSON.stringify(data),
    }).then(() => {
        getDataBook(1);
    });
}

function showEdit(ID) {
    form.setAttribute("action", "/PHP/book/edit.php");
    bookMenu.style.display = "none";
    sectionNewBook.style.display = "block";
    document.getElementById("idBook").value = ID;
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
    if (bool) {
        e.preventDefault();
    } else {
        btnBack.onclick();
    }
}

function view(ID) {
    window.location.href = "/PHP/home/veiw.php?id=" + ID;
}
