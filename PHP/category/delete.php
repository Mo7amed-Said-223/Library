<?php
require("../connect.php");

$data = file_get_contents("php://input");
$data = json_decode($data);



$addData = $database->prepare("DELETE FROM `category` WHERE `category`.`id` = {$data->id}");
$addData->execute();