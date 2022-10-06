<?php
require("../connect.php");

$data = file_get_contents("php://input");
$data = json_decode($data);


    $addData = $database->prepare("INSERT INTO category(name) VALUES (:name)");
    $addData->bindParam("name", $data->name);
    $addData->execute();


?>