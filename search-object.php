<?php

header("Content-Type: application/json");
$json = json_decode(stripslashes(file_get_contents("php://input")));

$user = 'root';
$password = 'root';
$db = 'landscape_editor';
$host = 'localhost';
$port = 3306;
$link = mysqli_connect($host, $user, $password, $db) or die ("Ошибка: " . mysqli_error($link));

$object = array();

if ($json->type === 'flower') {
    $query = "SELECT * FROM flower WHERE name = '{$json->name}'";
    array_push($object, 'flower');
} else if ($json->type === 'bush') {
    $query = "SELECT * FROM bush WHERE name = '{$json->name}'";
    array_push($object, 'bush');
} else if ($json->type === 'tree') {
    $query = "SELECT * FROM tree WHERE name = '{$json->name}'";
    array_push($object, 'tree');
} else if ($json->type === 'water_plant') {
    $query = "SELECT * FROM water_plant WHERE name = '{$json->name}'";
    array_push($object, 'water_plant');
} else if ($json->type === 'pound') {
    $query = "SELECT * FROM pound WHERE name = '{$json->name}'";
    array_push($object, 'pound');
}

$result = mysqli_query($link, $query) or die ("Ошибка " . mysqli_error($link));

if ($result) {
    $rows = mysqli_num_rows($result);
    for ($i = 0; $i < $rows; ++$i) {
        $row = mysqli_fetch_row($result);
        array_push($object, $row);
    }
    mysqli_free_result($result);
}

mysqli_close($link);

$object = json_encode($object, JSON_UNESCAPED_UNICODE);
echo $object;