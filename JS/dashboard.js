let cards = document.querySelectorAll(".header .number");
let books = document.querySelector(".book");
let admins = document.querySelector(".admins");

fetch("/PHP/count.php")
    .then((request) => request.json())
    .then((d) => {
        cards[0].innerHTML = d.book;
        cards[1].innerHTML = d.category;
        cards[2].innerHTML = d.member;
    });

getDataBook();

function getDataBook() {
    let data = {
        from: 1,
        limit: 4,
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
function showPage(bookData) {
    let title = books.querySelector("*");
    books.innerHTML = ``;
    books.append(title);
    for (let index = 0; index < bookData.length; index++) {
        const book = bookData[index];
        books.innerHTML += showBooks(book.photo, book.title, book.author);
    }
}

function showBooks(img, name, author) {
    return `<div class="b"> <img src="../uploads/${img}" alt="alt">
        <div class="details">
            <h4>${name} </h4>
            <p>Author : ${author} </p>
        </div>
    </div>`;
}

getDataAdmins();
function getDataAdmins() {
    fetch("/PHP/member/select.php")
        .then((request) => request.json())
        .then((d) => {
            showPageAdmins(new Array(...d));
        });
}
function showPageAdmins(adminData) {
    let title = admins.querySelector("*");
    admins.innerHTML = ``;
    admins.append(title);
    let length = 0;
    for (let index = 0; index < adminData.length; index++) {
        const admin = adminData[index];
        if (admin.admin == "1") {
            admins.innerHTML += showAdmins(admin.photo, admin.name);
            length++;
        }
    }
    admins.querySelector(".add span").innerHTML = ` ${length} `;
}

function showAdmins(img, name) {
    return `<div class="admin"> <img src="../uploads/${img}" alt="alt">
                <h4>${name}</h4>
            </div>`;
}
