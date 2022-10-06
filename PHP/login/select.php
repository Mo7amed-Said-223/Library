<?php
require("../connect.php");

$gmail = $_POST["gmail"];
$pass = $_POST["password"];

$data = $database->prepare("SELECT * FROM `member` WHERE member.gmail = '{$gmail}' and member.password = '{$pass}'");
$data->execute();
$data = $data->fetchAll(PDO::FETCH_ASSOC);
session_start();
$_SESSION["id_user"] = $data[0]["id"];
if ($data[0]["admin"] == "1")
    header("Location:/HTML/dashboard.html");
else if ($data[0]["admin"] == "0")
    header("Location:/HTML/home.html");
else
    print_r("[{\"error\" : \"not found\" }]");
