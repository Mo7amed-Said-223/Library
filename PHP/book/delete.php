<?php
require("../connect.php");
$data = file_get_contents("php://input");
$data = json_decode($data);



$addData = $database->prepare("DELETE FROM `comment` WHERE `comment`.`id_book` = {$data->id}");
$addData->execute();
$addData = $database->prepare("DELETE FROM `book` WHERE `book`.`id` = {$data->id}");
$addData->execute();