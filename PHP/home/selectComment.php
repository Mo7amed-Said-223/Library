<?php
require("../connect.php");

$data = file_get_contents("php://input");
$data = json_decode($data);


$dataBooks = $database->prepare("SELECT * FROM `comment` JOIN member on (comment.id_member = member.id) WHERE comment.id_book={$_COOKIE["book_id"]}");
$dataBooks->execute();
$dataBooks = $dataBooks->fetchAll(PDO::FETCH_ASSOC);
print_r(json_encode($dataBooks));