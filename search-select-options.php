<?php

$user = 'root';
$password = 'root';
$db = 'landscape_editor';
$host = 'localhost';
$port = 3306;
$link = mysqli_connect($host, $user, $password, $db) or die ("Ошибка: " . mysqli_error($link));

$climate_query = array();
$light_query = array();
$watering_query = array();
$endurance_query = array();
$climate_result = array(
    'climate_flower' => array(),
    'climate_bush' => array(),
    'climate_tree' => array(),
    'climate_water_plant' => array(),
    'result' => array()
);
$light_result = array(
    'light_flower' => array(),
    'light_bush' => array(),
    'light_tree' => array(),
    'light_water_plant' => array(),
    'result' => array()
);
$watering_result = array(
    'watering_flower' => array(),
    'watering_bush' => array(),
    'watering_tree' => array(),
    'result' => array()
);
$endurance_result = array(
    'endurance_flower' => array(),
    'endurance_bush' => array(),
    'endurance_tree' => array(),
    'endurance_water_plant' => array(),
    'result' => array()
);
$json = array(
    'climate' => array(),
    'light' => array(),
    'watering' => array(),
    'endurance' => array()
);

if ($link) {
    $query = "SELECT climate FROM flower GROUP BY 1 HAVING COUNT(*) > 1";
    $result = mysqli_query($link, $query) or die ("Ошибка " . mysqli_error($link));
    if ($result) {
        $rows = mysqli_num_rows($result);
        for ($i = 0 ; $i < $rows ; ++$i) {
            $row = mysqli_fetch_row($result);
            $climate_query = $row;
            array_push($climate_result['climate_flower'], $climate_query[0]);
        }
    }
    mysqli_free_result($result);
    $query = "SELECT climate FROM bush GROUP BY 1 HAVING COUNT(*) > 1";
    $result = mysqli_query($link, $query) or die ("Ошибка " . mysqli_error($link));
    if ($result) {
        $rows = mysqli_num_rows($result);
        for ($i = 0 ; $i < $rows ; ++$i) {
            $row = mysqli_fetch_row($result);
            $climate_query = $row;
            array_push($climate_result['climate_bush'], $climate_query[0]);
        }
    }
    mysqli_free_result($result);
    $query = "SELECT climate FROM tree GROUP BY 1 HAVING COUNT(*) > 1";
    $result = mysqli_query($link, $query) or die ("Ошибка " . mysqli_error($link));
    if ($result) {
        $rows = mysqli_num_rows($result);
        for ($i = 0 ; $i < $rows ; ++$i) {
            $row = mysqli_fetch_row($result);
            $climate_query = $row;
            array_push($climate_result['climate_tree'], $climate_query[0]);
        }
    }
    mysqli_free_result($result);
    $query = "SELECT climate FROM water_plant GROUP BY 1 HAVING COUNT(*) > 1";
    $result = mysqli_query($link, $query) or die ("Ошибка " . mysqli_error($link));
    if ($result) {
        $rows = mysqli_num_rows($result);
        for ($i = 0 ; $i < $rows ; ++$i) {
            $row = mysqli_fetch_row($result);
            $climate_query = $row;
            array_push($climate_result['climate_water_plant'], $climate_query[0]);
        }
    }
    mysqli_free_result($result);
    foreach ($climate_result['climate_flower'] as $k => $v) {
        if (!in_array($v, $climate_result['result'])) {
            $climate_result['result'][$k] = $v;
        }
    }
    foreach ($climate_result['climate_bush'] as $k => $v) {
        if (!in_array($v, $climate_result['result'])) {
            $climate_result['result'][$k] = $v;
        }
    }
    foreach ($climate_result['climate_tree'] as $k => $v) {
        if (!in_array($v, $climate_result['result'])) {
            $climate_result['result'][$k] = $v;
        }
    }
    foreach ($climate_result['climate_water_plant'] as $k => $v) {
        if (!in_array($v, $climate_result['result'])) {
            $climate_result['result'][$k] = $v;
        }
    }

    $query = "SELECT light FROM flower GROUP BY 1 HAVING COUNT(*) > 1";
    $result = mysqli_query($link, $query) or die ("Ошибка " . mysqli_error($link));
    if ($result) {
        $rows = mysqli_num_rows($result);
        for ($i = 0 ; $i < $rows ; ++$i) {
            $row = mysqli_fetch_row($result);
            $light_query = $row;
            array_push($light_result['light_flower'], $light_query[0]);
        }
    }
    mysqli_free_result($result);
    $query = "SELECT light FROM bush GROUP BY 1 HAVING COUNT(*) > 1";
    $result = mysqli_query($link, $query) or die ("Ошибка " . mysqli_error($link));
    if ($result) {
        $rows = mysqli_num_rows($result);
        for ($i = 0 ; $i < $rows ; ++$i) {
            $row = mysqli_fetch_row($result);
            $light_query = $row;
            array_push($light_result['light_bush'], $light_query[0]);
        }
    }
    mysqli_free_result($result);
    $query = "SELECT light FROM tree GROUP BY 1 HAVING COUNT(*) > 1";
    $result = mysqli_query($link, $query) or die ("Ошибка " . mysqli_error($link));
    if ($result) {
        $rows = mysqli_num_rows($result);
        for ($i = 0 ; $i < $rows ; ++$i) {
            $row = mysqli_fetch_row($result);
            $light_query = $row;
            array_push($light_result['light_tree'], $light_query[0]);
        }
    }
    mysqli_free_result($result);
    $query = "SELECT light FROM water_plant GROUP BY 1 HAVING COUNT(*) > 1";
    $result = mysqli_query($link, $query) or die ("Ошибка " . mysqli_error($link));
    if ($result) {
        $rows = mysqli_num_rows($result);
        for ($i = 0 ; $i < $rows ; ++$i) {
            $row = mysqli_fetch_row($result);
            $light_query = $row;
            array_push($light_result['light_water_plant'], $light_query[0]);
        }
    }
    mysqli_free_result($result);
    foreach ($light_result['light_flower'] as $k => $v) {
        if (!in_array($v, $light_result['result'])) {
            $light_result['result'][$k] = $v;
        }
    }
    foreach ($light_result['light_bush'] as $k => $v) {
        if (!in_array($v, $light_result['result'])) {
            $light_result['result'][$k] = $v;
        }
    }
    foreach ($light_result['light_tree'] as $k => $v) {
        if (!in_array($v, $light_result['result'])) {
            $light_result['result'][$k] = $v;
        }
    }
    foreach ($light_result['light_water_plant'] as $k => $v) {
        if (!in_array($v, $light_result['result'])) {
            $light_result['result'][$k] = $v;
        }
    }

    $query = "SELECT watering FROM flower GROUP BY 1 HAVING COUNT(*) > 1";
    $result = mysqli_query($link, $query) or die ("Ошибка " . mysqli_error($link));
    if ($result) {
        $rows = mysqli_num_rows($result);
        for ($i = 0 ; $i < $rows ; ++$i) {
            $row = mysqli_fetch_row($result);
            $watering_query = $row;
            array_push($watering_result['watering_flower'], $watering_query[0]);
        }
    }
    mysqli_free_result($result);
    $query = "SELECT watering FROM bush GROUP BY 1 HAVING COUNT(*) > 1";
    $result = mysqli_query($link, $query) or die ("Ошибка " . mysqli_error($link));
    if ($result) {
        $rows = mysqli_num_rows($result);
        for ($i = 0 ; $i < $rows ; ++$i) {
            $row = mysqli_fetch_row($result);
            $watering_query = $row;
            array_push($watering_result['watering_bush'], $watering_query[0]);
        }
    }
    mysqli_free_result($result);
    $query = "SELECT watering FROM tree GROUP BY 1 HAVING COUNT(*) > 1";
    $result = mysqli_query($link, $query) or die ("Ошибка " . mysqli_error($link));
    if ($result) {
        $rows = mysqli_num_rows($result);
        for ($i = 0 ; $i < $rows ; ++$i) {
            $row = mysqli_fetch_row($result);
            $watering_query = $row;
            array_push($watering_result['watering_tree'], $watering_query[0]);
        }
    }
    mysqli_free_result($result);
    foreach ($watering_result['watering_flower'] as $k => $v) {
        if (!in_array($v, $watering_result['result'])) {
            $watering_result['result'][$k] = $v;
        }
    }
    foreach ($watering_result['watering_bush'] as $k => $v) {
        if (!in_array($v, $watering_result['result'])) {
            $watering_result['result'][$k] = $v;
        }
    }
    foreach ($watering_result['watering_tree'] as $k => $v) {
        if (!in_array($v, $watering_result['result'])) {
            $watering_result['result'][$k] = $v;
        }
    }

    $query = "SELECT endurance FROM flower GROUP BY 1 HAVING COUNT(*) > 1";
    $result = mysqli_query($link, $query) or die ("Ошибка " . mysqli_error($link));
    if ($result) {
        $rows = mysqli_num_rows($result);
        for ($i = 0 ; $i < $rows ; ++$i) {
            $row = mysqli_fetch_row($result);
            $endurance_query = $row;
            array_push($endurance_result['endurance_flower'], $endurance_query[0]);
        }
    }
    mysqli_free_result($result);
    $query = "SELECT endurance FROM bush GROUP BY 1 HAVING COUNT(*) > 1";
    $result = mysqli_query($link, $query) or die ("Ошибка " . mysqli_error($link));
    if ($result) {
        $rows = mysqli_num_rows($result);
        for ($i = 0 ; $i < $rows ; ++$i) {
            $row = mysqli_fetch_row($result);
            $endurance_query = $row;
            array_push($endurance_result['endurance_bush'], $endurance_query[0]);
        }
    }
    mysqli_free_result($result);
    $query = "SELECT endurance FROM tree GROUP BY 1 HAVING COUNT(*) > 1";
    $result = mysqli_query($link, $query) or die ("Ошибка " . mysqli_error($link));
    if ($result) {
        $rows = mysqli_num_rows($result);
        for ($i = 0 ; $i < $rows ; ++$i) {
            $row = mysqli_fetch_row($result);
            $endurance_query = $row;
            array_push($endurance_result['endurance_tree'], $endurance_query[0]);
        }
    }
    mysqli_free_result($result);
    $query = "SELECT endurance FROM water_plant GROUP BY 1 HAVING COUNT(*) > 1";
    $result = mysqli_query($link, $query) or die ("Ошибка " . mysqli_error($link));
    if ($result) {
        $rows = mysqli_num_rows($result);
        for ($i = 0 ; $i < $rows ; ++$i) {
            $row = mysqli_fetch_row($result);
            $endurance_query = $row;
            array_push($endurance_result['endurance_water_plant'], $endurance_query[0]);
        }
    }
    mysqli_free_result($result);
    foreach ($endurance_result['endurance_flower'] as $k => $v) {
        if (!in_array($v, $endurance_result['result'])) {
            $endurance_result['result'][$k] = $v;
        }
    }
    foreach ($endurance_result['endurance_bush'] as $k => $v) {
        if (!in_array($v, $endurance_result['result'])) {
            $endurance_result['result'][$k] = $v;
        }
    }
    foreach ($endurance_result['endurance_tree'] as $k => $v) {
        if (!in_array($v, $endurance_result['result'])) {
            $endurance_result['result'][$k] = $v;
        }
    }
    foreach ($endurance_result['endurance_water_plant'] as $k => $v) {
        if (!in_array($v, $endurance_result['result'])) {
            $endurance_result['result'][$k] = $v;
        }
    }
}
mysqli_close($link);

$json['climate'] = $climate_result['result'];
$json['light'] = $light_result['result'];
$json['watering'] = $watering_result['result'];
$json['endurance'] = $endurance_result['result'];

$json = json_encode($json, JSON_UNESCAPED_UNICODE);
echo $json;