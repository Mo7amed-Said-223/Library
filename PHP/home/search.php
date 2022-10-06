<?php
require("../connect.php");

$data = file_get_contents("php://input");
$data = json_decode($data);


$query = "SELECT * ,book.id as 'bookID' FROM `book` JOIN category on (book.id_category = category.id) WHERE book.id>={$data->from}";
if ($data->cate == "ALL" && $data->key == "") {
} else if ($data->cate == "ALL")
    $query .= " and book.title like '%{$data->key}%'";
else if ($data->key == "")
    $query .= " and book.id_category = {$data->cate}";
else
    $query .= " and book.title like '%{$data->key}%' and book.id_category = {$data->cate}";

$query .= " order by book.id LIMIT {$data->limit}";
$dataBooks = $database->prepare($query);
$dataBooks->execute();
$dataBooks = $dataBooks->fetchAll(PDO::FETCH_ASSOC);
print_r(json_encode($dataBooks));