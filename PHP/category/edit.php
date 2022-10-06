<?php
require("../connect.php");

$data = file_get_contents("php://input");
$data = json_decode($data);



$addData = $database->prepare("UPDATE `category` SET `name` = '{$data->name}' WHERE `category`.`id` = {$data->id};");
$addData->execute();