<?php

require("../connect.php");

$data = file_get_contents("php://input");
$data = json_decode($data);


$dataBooks = $database->prepare("SELECT *  FROM `book` WHERE title like '%{$data->key}%'");
$dataBooks->execute();
$dataBooks = $dataBooks->fetchAll(PDO::FETCH_ASSOC);
print_r(json_encode($dataBooks));