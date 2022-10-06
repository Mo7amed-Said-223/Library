const infoBtn = document.querySelector("header span:nth-child(1)");
const commentBtn = document.querySelector("header span:nth-child(2)");
const infoSection = document.querySelector(".info");
const commentSection = document.querySelector(".comments");

infoBtn.onclick = () => {
    infoSection.style.display = "block";
    commentSection.style.display = "none";
};
commentBtn.onclick = () => {
    commentSection.style.display = "block";
    infoSection.style.display = "none";
    getComment();
};
getInfo();
function getInfo() {
    let title = infoSection.querySelector(".title");
    let cate = infoSection.querySelector(".cate");
    let author = infoSection.querySelector(".author");
    let pages = infoSection.querySelector(".page");
    let price = infoSection.querySelector(".price");
    let photo = infoSection.querySelector("img");
    let downloadBtn = infoSection.querySelector("a");
    fetch("/PHP/home/veiw.php")
        .then((request) => request.json())
        .then((d) => {
            let book = new Array(...d);
            console.log(book);
            title.innerHTML = book[0].title;
            cate.innerHTML = book[0].name;
            author.innerHTML = book[0].author;
            pages.innerHTML = book[0].noPage;
            price.innerHTML = book[0].price;
            photo.src = "../uploads/" + book[0].photo;
            downloadBtn.href = "../uploads/" + book[0].file;
        });
}

function getComment() {
    fetch("/PHP/home/selectComment.php")
        .then((request) => request.json())
        .then((d) => {
            showPage(new Array(...d));
        });
}

function showPage(comments) {
    let view = commentSection.querySelector(".view");
    view.innerHTML = ``;
    for (let index = 0; index < comments.length; index++) {
        const comment = comments[index];
        view.innerHTML += showComment(
            comment.photo,
            comment.name,
            comment.date,
            comment.comment
        );
    }
}

function showComment(img, name, date, comment) {
    return `<div class="comment">
                <div class="user"><img src="../uploads/${img}">
                <h5 class="username">${name} <p class="date">${date} </p>
                    </h5>
                </div>
                <p>${comment}</p>
            </div>`;
}

let btnInsert = commentSection.querySelector(".input button");
btnInsert.onclick = () => {
    let com = commentSection.querySelector(".input textarea").value;
    if (com != "") {
        insertComment(com);
    }
};
function insertComment(com) {
    let data = {
        comment: com,
    };
    fetch("/PHP/home/insertComment.php", {
        method: "POST",
        body: JSON.stringify(data),
    }).then(() => getComment());
}
