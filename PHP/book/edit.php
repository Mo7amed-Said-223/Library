<?php

require("../connect.php");
$update = "";

foreach ($_POST as $name => $value) {
    if ($value != "" && $name != "idBook" && $value != "-") {
        $update .= "`{$name}` = '{$value}' ,";
    }
}
$upload_dir = $_SERVER["DOCUMENT_ROOT"] . '/uploads';
if ($_FILES["bookFile"]["error"] == UPLOAD_ERR_OK) {
    $bookFile = '';
    $tmp_name = $_FILES["bookFile"]["tmp_name"];
    $bookFile = basename($_FILES["bookFile"]["name"]);
    move_uploaded_file($tmp_name, "$upload_dir/$bookFile");
    $update .= "`file` = '{$bookFile}' ,";
}
if ($_FILES["bookPhoto"]["error"] == UPLOAD_ERR_OK) {
    $bookPhoto = '';
    $tmp_name = $_FILES["bookPhoto"]["tmp_name"];
    $bookPhoto = basename($_FILES["bookPhoto"]["name"]);
    move_uploaded_file($tmp_name, "$upload_dir/$bookPhoto");
    $update .= "`photo` = '{$bookPhoto}' ,";
}
$date = date("Y-m-d");
$update .= "`date_modified` = '{$date}' ";

$addData = $database->prepare("UPDATE `book` SET {$update} WHERE `book`.`id` = '{$_POST["idBook"]}' ");
$addData->execute();
header("Location:/HTML/book.html");