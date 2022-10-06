<?php
require("./connect.php");

$data = file_get_contents("php://input");
$data = json_decode($data);


$dataBooks = $database->prepare("SELECT count(*)  FROM `book`");
$dataBooks->execute();
$dataBooks = $dataBooks->fetchAll(PDO::FETCH_ASSOC);

$dataCate = $database->prepare("SELECT count(*)  FROM `category`");
$dataCate->execute();
$dataCate = $dataCate->fetchAll(PDO::FETCH_ASSOC);

$dataMembers = $database->prepare("SELECT count(*)  FROM `member`");
$dataMembers->execute();
$dataMembers = $dataMembers->fetchAll(PDO::FETCH_ASSOC);

$counts=["book" => $dataBooks[0]["count(*)"]
        ,"category" => $dataCate[0]["count(*)"]
        ,"member" => $dataMembers[0]["count(*)"]];
print_r(json_encode($counts));