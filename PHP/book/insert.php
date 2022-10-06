<?php

require("../connect.php");

$upload_dir = $_SERVER["DOCUMENT_ROOT"] . '/uploads';
$bookFile = '';
$tmp_name = $_FILES["bookFile"]["tmp_name"];
$bookFile = basename($_FILES["bookFile"]["name"]);
move_uploaded_file($tmp_name, "$upload_dir/$bookFile");

$bookPhoto = '';
$tmp_name = $_FILES["bookPhoto"]["tmp_name"];
$bookPhoto = basename($_FILES["bookPhoto"]["name"]);
move_uploaded_file($tmp_name, "$upload_dir/$bookPhoto");
$title = $_POST["title"];
$author = $_POST["author"];
$price = $_POST["price"];
$pages = $_POST["noPages"];
$cate = $_POST["id_category"];
$date = date("Y-m-d");

$addData = $database->prepare("INSERT INTO `book`(`title`, `author`, `noPage`, `price`, `date_created`, `date_modified`, `id_category`, `photo`, `file`) VALUES (:title, :author,:noPage, :price, :date_created, :date_modified, :id_category, :photo, :file)");
$addData->bindParam("title", $title);
$addData->bindParam("author", $author);
$addData->bindParam("noPage", $pages);
$addData->bindParam("price", $price);
$addData->bindParam("date_created", $date);
$addData->bindParam("date_modified", $date);
$addData->bindParam("id_category", $cate);
$addData->bindParam("photo", $bookPhoto);
$addData->bindParam("file", $bookFile);
$addData->execute();

header("Location:/HTML/book.html");