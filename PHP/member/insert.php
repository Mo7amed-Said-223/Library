<?php

require("../connect.php");

$upload_dir = $_SERVER["DOCUMENT_ROOT"] . '/uploads';

$photo = '';
$tmp_name = $_FILES["photo"]["tmp_name"];
$photo = basename($_FILES["photo"]["name"]);
move_uploaded_file($tmp_name, "$upload_dir/$photo");

$name = $_POST["name"];
$gmail = $_POST["gmail"];
$password = $_POST["password"];
$admin = $_POST["admin"];
$date = date("Y-m-d");

$addData = $database->prepare("INSERT INTO `member`(`name`, `gmail`, `password`, `subscribe_date`, `admin`, `photo`) VALUES (:name, :gmail,:password, :subscribe_date, :admin,:photo)");
$addData->bindParam("name", $name);
$addData->bindParam("gmail", $gmail);
$addData->bindParam("password", $password);
$addData->bindParam("admin", $admin);
$addData->bindParam("subscribe_date", $date);
$addData->bindParam("photo", $photo);
$addData->execute();
header("Location:/HTML/member.html");