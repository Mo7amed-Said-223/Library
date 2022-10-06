<?php
require("../connect.php");

$data = file_get_contents("php://input");
$data = json_decode($data);


$date = date("Y-m-d");
session_start();
$dataBooks = $database->prepare("INSERT INTO `comment` (`id_member`, `id_book`, `comment`, `date`) VALUES ('{$_SESSION["id_user"]}', '{$_COOKIE["book_id"]}', '{$data->comment}', '{$date}');");
$dataBooks->execute();
$dataBooks = $dataBooks->fetchAll(PDO::FETCH_ASSOC);
print_r(json_encode($dataBooks));