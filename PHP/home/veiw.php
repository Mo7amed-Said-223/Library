<?php
require("../connect.php");

$data = file_get_contents("php://input");
$data = json_decode($data);

if (isset($_GET["id"])) {
    setcookie("book_id", $_GET["id"], time() + 86400);
    header("Location:/HTML/bookView.html");
}

$dataBooks = $database->prepare("SELECT * ,book.id as 'bookID' FROM `book` JOIN category on (book.id_category= category.id) WHERE book.id={$_COOKIE["book_id"]}");
$dataBooks->execute();
$dataBooks = $dataBooks->fetchAll(PDO::FETCH_ASSOC);
print_r(json_encode($dataBooks));
