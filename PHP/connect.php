<?php
header("Access-Control-Allow-Origin:*");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods:*");
header("Access-Control-Max-Age:3600");
header("Access-Control-Allow-Headers:*");

$userName = 'root';
$password = '';
$database = new PDO('mysql:host=localhost;dbname=library;', $userName, $password);