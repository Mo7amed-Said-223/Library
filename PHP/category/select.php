<?php
require("../connect.php");

$dataBooks = $database->prepare("SELECT category.id as id , category.name as name , COUNT(book.id_category) as total from category left OUTER join book on(book.id_category=category.id) GROUP by name order by name DESC ");
$dataBooks->execute();
$dataBooks = $dataBooks->fetchAll(PDO::FETCH_ASSOC);
print_r(json_encode($dataBooks));
?>