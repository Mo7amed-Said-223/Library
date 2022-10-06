let newCategorie = document.querySelector(".newCategorie");
let btnNewCategorie = document.querySelector(".buttons button");
const table = document.querySelector(".table");

let categoryData;
getData();

btnNewCategorie.onclick = () => {
    newCategorie.style.display = "block";
    newCategorie.querySelector("button").innerHTML = "Create";
    newCategorie.querySelector("button").setAttribute("onclick", "insert()");
};
function showEdit(id) {
    newCategorie.style.display = "block";
    newCategorie.querySelector("button").innerHTML = "Edit";
    newCategorie.querySelector("button").setAttribute("onclick", `edit(${id})`);
}
newCategorie.querySelector("p").onclick = () => {
    newCategorie.style.display = "none";
};

function getData() {
    fetch("/PHP/category/select.php")
        .then((request) => request.json())
        .then((d) => {
            categoryData = new Array(...d);
        })
        .then(() => {
            showPage();
        });
}


function showPage() {
    let title = table.querySelector("*");
    table.innerHTML = ``;
    table.append(title);
    for (let index = 0; index < categoryData.length; index++) {
        const category = categoryData[index];
        table.innerHTML += showCategories(
            category.name,
            category.id,
            category.total
        );
    }
}
function showCategories(name, id, num) {
    return `
<div class="tr">
<div class="td">${id}</div>
    <div class="td">${name}</div>
    <div class="td">${num}</div>
    <div class="td"> <i class="icon-pencil-square" onclick="showEdit(${id})"></i><i class="icon-trash" onclick="del(${id})"></i></div>
</div>`;
}

function insert() {
    let data = {
        name: newCategorie.querySelector("input").value,
    };
    newCategorie.style.display = "none";
    newCategorie.querySelector("input").value = "";
    fetch("/PHP/category/insert.php", {
        method: "POST",
        body: JSON.stringify(data),
    }).then(() => {
        getData();
    });
}

function del(ID) {
    let data = {
        id: ID,
    };

    console.log(data);
    fetch("/PHP/category/delete.php", {
        method: "POST",
        body: JSON.stringify(data),
    }).then(() => {
        getData();
    });
}

function edit(ID) {
    let data = {
        id: ID,
        name: newCategorie.querySelector("input").value,
    };

    newCategorie.style.display = "none";
    newCategorie.querySelector("input").value = "";

    fetch("/PHP/category/edit.php", {
        method: "POST",
        body: JSON.stringify(data),
    }).then(() => {
        getData();
    });
}
