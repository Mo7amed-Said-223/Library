<?php

require("../connect.php");

$update = "";

foreach ($_POST as $name => $value) {
    if ($value != "" && $name != "idMember" && $value != "-") {
        $update .= "`{$name}` = '{$value}' ,";
    }
}
$upload_dir = $_SERVER["DOCUMENT_ROOT"] . '/uploads';

if ($_FILES["photo"]["error"] == UPLOAD_ERR_OK) {
    $photo = '';
    $tmp_name = $_FILES["photo"]["tmp_name"];
    $photo = basename($_FILES["photo"]["name"]);
    move_uploaded_file($tmp_name, "$upload_dir/$photo");
    $update .= "`photo` = '{$photo}' ,";
}
$update = trim($update, ",");
echo $update;
echo "dsfsdfsdfsdf";
$query = "UPDATE `member` SET {$update} WHERE `id` = '{$_POST["idMember"]}' ";
echo "<br>" . $query;
$addData = $database->prepare($query);
$addData->execute();
header("Location:/HTML/member.html");