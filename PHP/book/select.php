<?php
require("../connect.php");

$data = file_get_contents("php://input");
$data = json_decode($data);


$dataBooks = $database->prepare("SELECT * ,book.id as 'bookID' FROM `book` JOIN category on (book.id_category= category.id) WHERE book.id>={$data->from} order by book.id LIMIT {$data->limit}  ");
$dataBooks->execute();
$dataBooks = $dataBooks->fetchAll(PDO::FETCH_ASSOC);
print_r(json_encode($dataBooks));
?>