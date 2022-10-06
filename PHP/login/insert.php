<?php

require("../connect.php");

$upload_dir = $_SERVER["DOCUMENT_ROOT"] . '/uploads';

$photo = '';
$tmp_name = $_FILES["photo"]["tmp_name"];
$photo = basename($_FILES["photo"]["name"]);
move_uploaded_file($tmp_name, "$upload_dir/$photo");

$name = $_POST["userName"];
$gmail = $_POST["gmail"];
$password = $_POST["password"];
$date = date("Y-m-d");

$addData = $database->prepare("INSERT INTO `member`(`name`, `gmail`, `password`, `subscribe_date`, `admin`, `photo`) VALUES (:name, :gmail,:password, :subscribe_date, '0',:photo)");
$addData->bindParam("name", $name);
$addData->bindParam("gmail", $gmail);
$addData->bindParam("password", $password);
$addData->bindParam("subscribe_date", $date);
$addData->bindParam("photo", $photo);
$addData->execute();

header("Location:/HTML/login.html");