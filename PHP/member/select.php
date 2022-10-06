<?php
require("../connect.php");

$data = file_get_contents("php://input");
$data = json_decode($data);


$dataMembers = $database->prepare("SELECT *  FROM `member`");
$dataMembers->execute();
$dataMembers = $dataMembers->fetchAll(PDO::FETCH_ASSOC);
print_r(json_encode($dataMembers));
?>