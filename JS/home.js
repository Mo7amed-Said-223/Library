const searchSection = document.querySelector(".search");
const booksSection = document.querySelector(".books");
let moveing = document.querySelector(".moveing");
let limit = 3;

//*Search

let inputSearch = searchSection.querySelector("input");
let cateSearch = searchSection.querySelector(".categorie");
let btnSearch = searchSection.querySelector("button");

let categories;

fetch("/PHP/category/select.php")
    .then((request) => request.json())
    .then((d) => {
        addCategory(new Array(...d));
        categories = cateSearch.querySelectorAll("option");
    })
    .then(() => {
        getDataBook(1, "ALL", "");
    })
    .then(() => {
        fetch("/PHP/count.php")
            .then((request) => request.json())
            .then((d) => {
                movingPage(d.book);
                categories[0].setAttribute("data-total", d.book);
            })
            .then(() => {
                getDataBook(1, "ALL");
            });
    });
function addCategory(arr) {
    for (let i = 0; i < arr.length; i++) {
        cateSearch.innerHTML += `<option value="${arr[i].id}" data-total="${arr[i].total}">${arr[i].name}</option>`;
    }
}

btnSearch.onclick = () => {
    let key = inputSearch.value;
    let cate = cateSearch.value;
    getDataBook(1, cate, key);
    console.log(
        categories[cateSearch.selectedIndex].getAttribute("data-total")
    );
    movingPage(categories[cateSearch.selectedIndex].getAttribute("data-total"));
};

function getDataBook(from, cate, key = "") {
    let data = {
        from: from,
        limit: limit,
        cate: cate,
        key: key,
    };
    console.log(data);
    fetch("/PHP/home/search.php", {
        method: "POST",
        body: JSON.stringify(data),
    })
        .then((request) => request.json())
        .then((d) => {
            console.log(new Array(...d));
            showPage(new Array(...d));
        });
}

//* Page

function movingPage(numOfItems) {
    if (numOfItems > limit) {
        moveing.querySelector(
            ".numbers"
        ).innerHTML = `showing <b> 1-${limit} </b> from <b> ${numOfItems} </b> data `;
        let pages = Math.trunc(numOfItems / limit);
        let pagesMoveing = "";
        for (let i = 0; i <= pages; i++)
            pagesMoveing += `<b onclick="getDataBook(${i * limit + 1},'${
                categories[cateSearch.selectedIndex].innerHTML
            }','')">${i + 1}</b>`;
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
    } else {
        moveing.querySelector(".numbers").innerHTML = ``;
        moveing.querySelector("div").innerHTML = ``;
    }
}

function showPage(bookData) {
    booksSection.innerHTML = ``;
    for (let index = 0; index < bookData.length; index++) {
        const book = bookData[index];
        booksSection.innerHTML += showBooks(
            book.photo,
            book.title,
            book.bookID,
            book.author,
            book.name
        );
    }
}

function showBooks(img, name, id, author, cate) {
    return `<div class="book"> <img src="../uploads/${img}" />
            <h2 class="title">${name} </h2>
            <h4 class="categorie">${cate}</h4>
            <h5 class="author">${author} </h5><button onclick="viewBook(${id})">View More</button>
        </div>`;
}
function viewBook(id) {
    window.location.href = "/PHP/home/veiw.php?id=" + id;
}
