<?php
require("../connect.php");

$data = file_get_contents("php://input");
$data = json_decode($data);




$addData = $database->prepare("DELETE FROM `member` WHERE `member`.`id` = {$data->id}");
$addData->execute();