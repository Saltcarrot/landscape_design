<?php

header("Content-Type: application/json");
$json = json_decode(stripslashes(file_get_contents("php://input")));

$user = 'root';
$password = 'root';
$db = 'landscape_editor';
$host = 'localhost';
$port = 3306;
$link = mysqli_connect($host, $user, $password, $db) or die ("Ошибка: " . mysqli_error($link));

if ($json->climate === 'Любой') {
    $query_flower = "SELECT * FROM flower";
    $query_bush = "SELECT * FROM bush";
    $query_tree = "SELECT * FROM tree";
    $query_water_plant = "SELECT * FROM water_plant";
    if ($json->light === 'Любой') {
        if ($json->watering === 'Любой') {
            if ($json->endurance === 'Любой') {
                if ($json->temperature_max == '') {
                    if ($json->air_humidity_max == '') {
                    } else {
                        $query_flower .= " WHERE air_humidity_max < '{$json->air_humidity_max}'";
                        $query_bush .= " WHERE air_humidity_max < '{$json->air_humidity_max}'";
                        $query_tree .= " WHERE air_humidity_max < '{$json->air_humidity_max}'";
                        $query_water_plant .= " WHERE air_humidity_max < '{$json->air_humidity_max}'";
                    }
                } else {
                    $query_flower .= " WHERE temperature_max < '{$json->temperature_max}'";
                    $query_bush .= " WHERE temperature_max < '{$json->temperature_max}'";
                    $query_tree .= " WHERE temperature_max < '{$json->temperature_max}'";
                    $query_water_plant .= " WHERE temperature_max < '{$json->temperature_max}'";
                    if ($json->air_humidity_max == '') {
                    } else {
                        $query_flower .= " AND air_humidity_max < '{$json->air_humidity_max}'";
                        $query_bush .= " AND air_humidity_max < '{$json->air_humidity_max}'";
                        $query_tree .= " AND air_humidity_max < '{$json->air_humidity_max}'";
                        $query_water_plant .= " AND air_humidity_max < '{$json->air_humidity_max}'";
                    }
                }
            } else {
                $query_flower .= " WHERE endurance = '{$json->endurance}'";
                $query_bush .= " WHERE endurance = '{$json->endurance}'";
                $query_tree .= " WHERE endurance = '{$json->endurance}'";
                $query_water_plant .= " WHERE endurance = '{$json->endurance}'";
                if ($json->temperature_max == '') {
                    if ($json->air_humidity_max == '') {
                    } else {
                        $query_flower .= " AND air_humidity_max < '{$json->air_humidity_max}'";
                        $query_bush .= " AND air_humidity_max < '{$json->air_humidity_max}'";
                        $query_tree .= " AND air_humidity_max < '{$json->air_humidity_max}'";
                        $query_water_plant .= " AND air_humidity_max < '{$json->air_humidity_max}'";
                    }
                } else {
                    $query_flower .= " AND temperature_max < '{$json->temperature_max}'";
                    $query_bush .= " AND temperature_max < '{$json->temperature_max}'";
                    $query_tree .= " AND temperature_max < '{$json->temperature_max}'";
                    $query_water_plant .= " AND temperature_max < '{$json->temperature_max}'";
                    if ($json->air_humidity_max == '') {
                    } else {
                        $query_flower .= " AND air_humidity_max < '{$json->air_humidity_max}'";
                        $query_bush .= " AND air_humidity_max < '{$json->air_humidity_max}'";
                        $query_tree .= " AND air_humidity_max < '{$json->air_humidity_max}'";
                        $query_water_plant .= " AND air_humidity_max < '{$json->air_humidity_max}'";
                    }
                }
            }
        } else {
            $query_flower .= " WHERE watering = '{$json->watering}'";
            $query_bush .= " WHERE watering = '{$json->watering}'";
            $query_tree .= " WHERE watering = '{$json->watering}'";
            if ($json->endurance === 'любой') {
                if ($json->temperature_max == '') {
                    if ($json->air_humidity_max == '') {
                    } else {
                        $query_flower .= " AND air_humidity_max < '{$json->air_humidity_max}'";
                        $query_bush .= " AND air_humidity_max < '{$json->air_humidity_max}'";
                        $query_tree .= " AND air_humidity_max < '{$json->air_humidity_max}'";
                        $query_water_plant .= " WHERE air_humidity_max < '{$json->air_humidity_max}'";
                    }
                } else {
                    $query_flower .= " AND temperature_max < '{$json->temperature_max}'";
                    $query_bush .= " AND temperature_max < '{$json->temperature_max}'";
                    $query_tree .= " AND temperature_max < '{$json->temperature_max}'";
                    $query_water_plant .= " WHERE temperature_max < '{$json->temperature_max}'";
                    if ($json->air_humidity_max == '') {
                    } else {
                        $query_flower .= " AND air_humidity_max < '{$json->air_humidity_max}'";
                        $query_bush .= " AND air_humidity_max < '{$json->air_humidity_max}'";
                        $query_tree .= " AND air_humidity_max < '{$json->air_humidity_max}'";
                        $query_water_plant .= " AND air_humidity_max < '{$json->air_humidity_max}'";
                    }
                }
            } else {
                $query_flower .= " AND endurance = '{$json->endurance}'";
                $query_bush .= " AND endurance = '{$json->endurance}'";
                $query_tree .= " AND endurance = '{$json->endurance}'";
                $query_water_plant .= " WHERE endurance = '{$json->endurance}'";
                if ($json->temperature_max == '') {
                    if ($json->air_humidity_max == '') {
                    } else {
                        $query_flower .= " AND air_humidity_max < '{$json->air_humidity_max}'";
                        $query_bush .= " AND air_humidity_max < '{$json->air_humidity_max}'";
                        $query_tree .= " AND air_humidity_max < '{$json->air_humidity_max}'";
                        $query_water_plant .= " AND air_humidity_max < '{$json->air_humidity_max}'";
                    }
                } else {
                    $query_flower .= " AND temperature_max < '{$json->temperature_max}'";
                    $query_bush .= " AND temperature_max < '{$json->temperature_max}'";
                    $query_tree .= " AND temperature_max < '{$json->temperature_max}'";
                    $query_water_plant .= " AND temperature_max < '{$json->temperature_max}'";
                    if ($json->air_humidity_max == '') {
                    } else {
                        $query_flower .= " AND air_humidity_max < '{$json->air_humidity_max}'";
                        $query_bush .= " AND air_humidity_max < '{$json->air_humidity_max}'";
                        $query_tree .= " AND air_humidity_max < '{$json->air_humidity_max}'";
                        $query_water_plant .= " AND air_humidity_max < '{$json->air_humidity_max}'";
                    }
                }
            }
        }
    } else {
        $query_flower .= " WHERE light = '{$json->light}'";
        $query_bush .= " WHERE light = '{$json->light}'";
        $query_tree .= " WHERE light = '{$json->light}'";
        $query_water_plant .= " WHERE light = '{$json->light}'";
        if ($json->watering === 'Любой') {
            if ($json->endurance === 'Любой') {
                if ($json->temperature_max == '') {
                    if ($json->air_humidity_max == '') {
                    } else {
                        $query_flower .= " AND air_humidity_max < '{$json->air_humidity_max}'";
                        $query_bush .= " AND air_humidity_max < '{$json->air_humidity_max}'";
                        $query_tree .= " AND air_humidity_max < '{$json->air_humidity_max}'";
                        $query_water_plant .= " AND air_humidity_max < '{$json->air_humidity_max}'";
                    }
                } else {
                    $query_flower .= " AND temperature_max < '{$json->temperature_max}'";
                    $query_bush .= " AND temperature_max < '{$json->temperature_max}'";
                    $query_tree .= " AND temperature_max < '{$json->temperature_max}'";
                    $query_water_plant .= " AND temperature_max < '{$json->temperature_max}'";
                    if ($json->air_humidity_max == '') {
                    } else {
                        $query_flower .= " AND air_humidity_max < '{$json->air_humidity_max}'";
                        $query_bush .= " AND air_humidity_max < '{$json->air_humidity_max}'";
                        $query_tree .= " AND air_humidity_max < '{$json->air_humidity_max}'";
                        $query_water_plant .= " AND air_humidity_max < '{$json->air_humidity_max}'";
                    }
                }
            } else {
                $query_flower .= " AND endurance = '{$json->endurance}'";
                $query_bush .= " AND endurance = '{$json->endurance}'";
                $query_tree .= " AND endurance = '{$json->endurance}'";
                $query_water_plant .= " AND endurance = '{$json->endurance}'";
                if ($json->temperature_max == '') {
                    if ($json->air_humidity_max == '') {
                    } else {
                        $query_flower .= " AND air_humidity_max < '{$json->air_humidity_max}'";
                        $query_bush .= " AND air_humidity_max < '{$json->air_humidity_max}'";
                        $query_tree .= " AND air_humidity_max < '{$json->air_humidity_max}'";
                        $query_water_plant .= " AND air_humidity_max < '{$json->air_humidity_max}'";
                    }
                } else {
                    $query_flower .= " AND temperature_max < '{$json->temperature_max}'";
                    $query_bush .= " AND temperature_max < '{$json->temperature_max}'";
                    $query_tree .= " AND temperature_max < '{$json->temperature_max}'";
                    $query_water_plant .= " AND temperature_max < '{$json->temperature_max}'";
                    if ($json->air_humidity_max == '') {
                    } else {
                        $query_flower .= " AND air_humidity_max < '{$json->air_humidity_max}'";
                        $query_bush .= " AND air_humidity_max < '{$json->air_humidity_max}'";
                        $query_tree .= " AND air_humidity_max < '{$json->air_humidity_max}'";
                        $query_water_plant .= " AND air_humidity_max < '{$json->air_humidity_max}'";
                    }
                }
            }
        } else {
            $query_flower .= " AND watering = '{$json->watering}'";
            $query_bush .= " AND watering = '{$json->watering}'";
            $query_tree .= " AND watering = '{$json->watering}'";
            if ($json->endurance === 'Любой') {
                if ($json->temperature_max == '') {
                    if ($json->air_humidity_max == '') {
                    } else {
                        $query_flower .= " AND air_humidity_max < '{$json->air_humidity_max}'";
                        $query_bush .= " AND air_humidity_max < '{$json->air_humidity_max}'";
                        $query_tree .= " AND air_humidity_max < '{$json->air_humidity_max}'";
                        $query_water_plant .= " AND air_humidity_max < '{$json->air_humidity_max}'";
                    }
                } else {
                    $query_flower .= " AND temperature_max < '{$json->temperature_max}'";
                    $query_bush .= " AND temperature_max < '{$json->temperature_max}'";
                    $query_tree .= " AND temperature_max < '{$json->temperature_max}'";
                    $query_water_plant .= " AND temperature_max < '{$json->temperature_max}'";
                    if ($json->air_humidity_max == '') {
                    } else {
                        $query_flower .= " AND air_humidity_max < '{$json->air_humidity_max}'";
                        $query_bush .= " AND air_humidity_max < '{$json->air_humidity_max}'";
                        $query_tree .= " AND air_humidity_max < '{$json->air_humidity_max}'";
                        $query_water_plant .= " AND air_humidity_max < '{$json->air_humidity_max}'";
                    }
                }
            } else {
                $query_flower .= " AND endurance = '{$json->endurance}'";
                $query_bush .= " AND endurance = '{$json->endurance}'";
                $query_tree .= " AND endurance = '{$json->endurance}'";
                $query_water_plant .= " AND endurance = '{$json->endurance}'";
                if ($json->temperature_max == '') {
                    if ($json->air_humidity_max == '') {
                    } else {
                        $query_flower .= " AND air_humidity_max < '{$json->air_humidity_max}'";
                        $query_bush .= " AND air_humidity_max < '{$json->air_humidity_max}'";
                        $query_tree .= " AND air_humidity_max < '{$json->air_humidity_max}'";
                        $query_water_plant .= " AND air_humidity_max < '{$json->air_humidity_max}'";
                    }
                } else {
                    $query_flower .= " AND temperature_max < '{$json->temperature_max}'";
                    $query_bush .= " AND temperature_max < '{$json->temperature_max}'";
                    $query_tree .= " AND temperature_max < '{$json->temperature_max}'";
                    $query_water_plant .= " AND temperature_max < '{$json->temperature_max}'";
                    if ($json->air_humidity_max == '') {
                    } else {
                        $query_flower .= " AND air_humidity_max < '{$json->air_humidity_max}'";
                        $query_bush .= " AND air_humidity_max < '{$json->air_humidity_max}'";
                        $query_tree .= " AND air_humidity_max < '{$json->air_humidity_max}'";
                        $query_water_plant .= " AND air_humidity_max < '{$json->air_humidity_max}'";
                    }
                }
            }
        }
    }
} else {
    $query_flower = "SELECT * FROM flower WHERE climate = '{$json->climate}'";
    $query_bush = "SELECT * FROM bush WHERE climate = '{$json->climate}'";
    $query_tree = "SELECT * FROM tree WHERE climate = '{$json->climate}'";
    $query_water_plant = "SELECT * FROM water_plant WHERE climate = '{$json->climate}'";
    if ($json->light === 'Любой') {
        if ($json->watering === 'Любой') {
            if ($json->endurance === 'Любой') {
                if ($json->temperature_max == '') {
                    if ($json->air_humidity_max == '') {
                    } else {
                        $query_flower .= " AND air_humidity_max < '{$json->air_humidity_max}'";
                        $query_bush .= " AND air_humidity_max < '{$json->air_humidity_max}'";
                        $query_tree .= " AND air_humidity_max < '{$json->air_humidity_max}'";
                        $query_water_plant .= " AND air_humidity_max < '{$json->air_humidity_max}'";
                    }
                } else {
                    $query_flower .= " AND temperature_max < '{$json->temperature_max}'";
                    $query_bush .= " AND temperature_max < '{$json->temperature_max}'";
                    $query_tree .= " AND temperature_max < '{$json->temperature_max}'";
                    $query_water_plant .= " AND temperature_max < '{$json->temperature_max}'";
                    if ($json->air_humidity_max == '') {
                    } else {
                        $query_flower .= " AND air_humidity_max < '{$json->air_humidity_max}'";
                        $query_bush .= " AND air_humidity_max < '{$json->air_humidity_max}'";
                        $query_tree .= " AND air_humidity_max < '{$json->air_humidity_max}'";
                        $query_water_plant .= " AND air_humidity_max < '{$json->air_humidity_max}'";
                    }
                }
            } else {
                $query_flower .= " AND endurance = '{$json->endurance}'";
                $query_bush .= " AND endurance = '{$json->endurance}'";
                $query_tree .= " AND endurance = '{$json->endurance}'";
                $query_water_plant .= " AND endurance = '{$json->endurance}'";
                if ($json->temperature_max == '') {
                    if ($json->air_humidity_max == '') {
                    } else {
                        $query_flower .= " AND air_humidity_max < '{$json->air_humidity_max}'";
                        $query_bush .= " AND air_humidity_max < '{$json->air_humidity_max}'";
                        $query_tree .= " AND air_humidity_max < '{$json->air_humidity_max}'";
                        $query_water_plant .= " AND air_humidity_max < '{$json->air_humidity_max}'";
                    }
                } else {
                    $query_flower .= " AND temperature_max < '{$json->temperature_max}'";
                    $query_bush .= " AND temperature_max < '{$json->temperature_max}'";
                    $query_tree .= " AND temperature_max < '{$json->temperature_max}'";
                    $query_water_plant .= " AND temperature_max < '{$json->temperature_max}'";
                    if ($json->air_humidity_max == '') {
                    } else {
                        $query_flower .= " AND air_humidity_max < '{$json->air_humidity_max}'";
                        $query_bush .= " AND air_humidity_max < '{$json->air_humidity_max}'";
                        $query_tree .= " AND air_humidity_max < '{$json->air_humidity_max}'";
                        $query_water_plant .= " AND air_humidity_max < '{$json->air_humidity_max}'";
                    }
                }
            }
        } else {
            $query_flower .= " AND watering = '{$json->watering}'";
            $query_bush .= " AND watering = '{$json->watering}'";
            $query_tree .= " AND watering = '{$json->watering}'";
            if ($json->endurance === 'Любой') {
                if ($json->temperature_max == '') {
                    if ($json->air_humidity_max == '') {
                    } else {
                        $query_flower .= " AND air_humidity_max < '{$json->air_humidity_max}'";
                        $query_bush .= " AND air_humidity_max < '{$json->air_humidity_max}'";
                        $query_tree .= " AND air_humidity_max < '{$json->air_humidity_max}'";
                        $query_water_plant .= " AND air_humidity_max < '{$json->air_humidity_max}'";
                    }
                } else {
                    $query_flower .= " AND temperature_max < '{$json->temperature_max}'";
                    $query_bush .= " AND temperature_max < '{$json->temperature_max}'";
                    $query_tree .= " AND temperature_max < '{$json->temperature_max}'";
                    $query_water_plant .= " AND temperature_max < '{$json->temperature_max}'";
                    if ($json->air_humidity_max == '') {
                    } else {
                        $query_flower .= " AND air_humidity_max < '{$json->air_humidity_max}'";
                        $query_bush .= " AND air_humidity_max < '{$json->air_humidity_max}'";
                        $query_tree .= " AND air_humidity_max < '{$json->air_humidity_max}'";
                        $query_water_plant .= " AND air_humidity_max < '{$json->air_humidity_max}'";
                    }
                }
            } else {
                $query_flower .= " AND endurance = '{$json->endurance}'";
                $query_bush .= " AND endurance = '{$json->endurance}'";
                $query_tree .= " AND endurance = '{$json->endurance}'";
                $query_water_plant .= " AND endurance = '{$json->endurance}'";
                if ($json->temperature_max == '') {
                    if ($json->air_humidity_max == '') {
                    } else {
                        $query_flower .= " AND air_humidity_max < '{$json->air_humidity_max}'";
                        $query_bush .= " AND air_humidity_max < '{$json->air_humidity_max}'";
                        $query_tree .= " AND air_humidity_max < '{$json->air_humidity_max}'";
                        $query_water_plant .= " AND air_humidity_max < '{$json->air_humidity_max}'";
                    }
                } else {
                    $query_flower .= " AND temperature_max < '{$json->temperature_max}'";
                    $query_bush .= " AND temperature_max < '{$json->temperature_max}'";
                    $query_tree .= " AND temperature_max < '{$json->temperature_max}'";
                    $query_water_plant .= " AND temperature_max < '{$json->temperature_max}'";
                    if ($json->air_humidity_max == '') {
                    } else {
                        $query_flower .= " AND air_humidity_max < '{$json->air_humidity_max}'";
                        $query_bush .= " AND air_humidity_max < '{$json->air_humidity_max}'";
                        $query_tree .= " AND air_humidity_max < '{$json->air_humidity_max}'";
                        $query_water_plant .= " AND air_humidity_max < '{$json->air_humidity_max}'";
                    }
                }
            }
        }
    } else {
        $query_flower .= " AND light = '{$json->light}'";
        $query_bush .= " AND light = '{$json->light}'";
        $query_tree .= " AND light = '{$json->light}'";
        $query_water_plant .= " AND light = '{$json->light}'";
        if ($json->watering === 'Любой') {
            if ($json->endurance === 'Любой') {
                if ($json->temperature_max == '') {
                    if ($json->air_humidity_max == '') {
                    } else {
                        $query_flower .= " AND air_humidity_max < '{$json->air_humidity_max}'";
                        $query_bush .= " AND air_humidity_max < '{$json->air_humidity_max}'";
                        $query_tree .= " AND air_humidity_max < '{$json->air_humidity_max}'";
                        $query_water_plant .= " AND air_humidity_max < '{$json->air_humidity_max}'";
                    }
                } else {
                    $query_flower .= " AND temperature_max < '{$json->temperature_max}'";
                    $query_bush .= " AND temperature_max < '{$json->temperature_max}'";
                    $query_tree .= " AND temperature_max < '{$json->temperature_max}'";
                    $query_water_plant .= " AND temperature_max < '{$json->temperature_max}'";
                    if ($json->air_humidity_max == '') {
                    } else {
                        $query_flower .= " AND air_humidity_max < '{$json->air_humidity_max}'";
                        $query_bush .= " AND air_humidity_max < '{$json->air_humidity_max}'";
                        $query_tree .= " AND air_humidity_max < '{$json->air_humidity_max}'";
                        $query_water_plant .= " AND air_humidity_max < '{$json->air_humidity_max}'";
                    }
                }
            } else {
                $query_flower .= " AND endurance = '{$json->endurance}'";
                $query_bush .= " AND endurance = '{$json->endurance}'";
                $query_tree .= " AND endurance = '{$json->endurance}'";
                $query_water_plant .= " AND endurance = '{$json->endurance}'";
                if ($json->temperature_max == '') {
                    if ($json->air_humidity_max == '') {
                    } else {
                        $query_flower .= " AND air_humidity_max < '{$json->air_humidity_max}'";
                        $query_bush .= " AND air_humidity_max < '{$json->air_humidity_max}'";
                        $query_tree .= " AND air_humidity_max < '{$json->air_humidity_max}'";
                        $query_water_plant .= " AND air_humidity_max < '{$json->air_humidity_max}'";
                    }
                } else {
                    $query_flower .= " AND temperature_max < '{$json->temperature_max}'";
                    $query_bush .= " AND temperature_max < '{$json->temperature_max}'";
                    $query_tree .= " AND temperature_max < '{$json->temperature_max}'";
                    $query_water_plant .= " AND temperature_max < '{$json->temperature_max}'";
                    if ($json->air_humidity_max == '') {
                    } else {
                        $query_flower .= " AND air_humidity_max < '{$json->air_humidity_max}'";
                        $query_bush .= " AND air_humidity_max < '{$json->air_humidity_max}'";
                        $query_tree .= " AND air_humidity_max < '{$json->air_humidity_max}'";
                        $query_water_plant .= " AND air_humidity_max < '{$json->air_humidity_max}'";
                    }
                }
            }
        } else {
            $query_flower .= " AND watering = '{$json->watering}'";
            $query_bush .= " AND watering = '{$json->watering}'";
            $query_tree .= " AND watering = '{$json->watering}'";
            if ($json->endurance === 'Любой') {
                if ($json->temperature_max == '') {
                    if ($json->air_humidity_max == '') {
                    } else {
                        $query_flower .= " AND air_humidity_max < '{$json->air_humidity_max}'";
                        $query_bush .= " AND air_humidity_max < '{$json->air_humidity_max}'";
                        $query_tree .= " AND air_humidity_max < '{$json->air_humidity_max}'";
                        $query_water_plant .= " AND air_humidity_max < '{$json->air_humidity_max}'";
                    }
                } else {
                    $query_flower .= " AND temperature_max < '{$json->temperature_max}'";
                    $query_bush .= " AND temperature_max < '{$json->temperature_max}'";
                    $query_tree .= " AND temperature_max < '{$json->temperature_max}'";
                    $query_water_plant .= " AND temperature_max < '{$json->temperature_max}'";
                    if ($json->air_humidity_max == '') {
                    } else {
                        $query_flower .= " AND air_humidity_max < '{$json->air_humidity_max}'";
                        $query_bush .= " AND air_humidity_max < '{$json->air_humidity_max}'";
                        $query_tree .= " AND air_humidity_max < '{$json->air_humidity_max}'";
                        $query_water_plant .= " AND air_humidity_max < '{$json->air_humidity_max}'";
                    }
                }
            } else {
                $query_flower .= " AND endurance = '{$json->endurance}'";
                $query_bush .= " AND endurance = '{$json->endurance}'";
                $query_tree .= " AND endurance = '{$json->endurance}'";
                $query_water_plant .= " AND endurance = '{$json->endurance}'";
                if ($json->temperature_max == '') {
                    if ($json->air_humidity_max == '') {
                    } else {
                        $query_flower .= " AND air_humidity_max < '{$json->air_humidity_max}'";
                        $query_bush .= " AND air_humidity_max < '{$json->air_humidity_max}'";
                        $query_tree .= " AND air_humidity_max < '{$json->air_humidity_max}'";
                        $query_water_plant .= " AND air_humidity_max < '{$json->air_humidity_max}'";
                    }
                } else {
                    $query_flower .= " AND temperature_max < '{$json->temperature_max}'";
                    $query_bush .= " AND temperature_max < '{$json->temperature_max}'";
                    $query_tree .= " AND temperature_max < '{$json->temperature_max}'";
                    $query_water_plant .= " AND temperature_max < '{$json->temperature_max}'";
                    if ($json->air_humidity_max == '') {
                    } else {
                        $query_flower .= " AND air_humidity_max < '{$json->air_humidity_max}'";
                        $query_bush .= " AND air_humidity_max < '{$json->air_humidity_max}'";
                        $query_tree .= " AND air_humidity_max < '{$json->air_humidity_max}'";
                        $query_water_plant .= " AND air_humidity_max < '{$json->air_humidity_max}'";
                    }
                }
            }
        }
    }
}
$result_flower = mysqli_query($link, $query_flower) or die ("Ошибка " . mysqli_error($link));
$result_bush = mysqli_query($link, $query_bush) or die ("Ошибка " . mysqli_error($link));
$result_tree = mysqli_query($link, $query_tree) or die ("Ошибка " . mysqli_error($link));
$result_water_plant = mysqli_query($link, $query_water_plant) or die ("Ошибка " . mysqli_error($link));
$result_pound = mysqli_query($link, "SELECT * FROM pound") or die ("Ошибка " . mysqli_error($link));

$objects = array(
    "flower" => array(),
    "water_plant" => array(),
    "bush" => array(),
    "tree" => array(),
    "pound" => array()
);

if ($result_flower)  {
    $rows = mysqli_num_rows($result_flower);
    for ($i = 0 ; $i < $rows ; ++$i) {
        $row = mysqli_fetch_row($result_flower);
        $objects["flower"][] = $row;
    }
    mysqli_free_result($result_flower);
}
if ($result_bush)  {
    $rows = mysqli_num_rows($result_bush);
    for ($i = 0 ; $i < $rows ; ++$i) {
        $row = mysqli_fetch_row($result_bush);
        $objects["bush"][] = $row;
    }
    mysqli_free_result($result_bush);
}
if ($result_tree)  {
    $rows = mysqli_num_rows($result_tree);
    for ($i = 0 ; $i < $rows ; ++$i) {
        $row = mysqli_fetch_row($result_tree);
        $objects["tree"][] = $row;
    }
    mysqli_free_result($result_tree);
}
if ($result_water_plant)  {
    $rows = mysqli_num_rows($result_water_plant);
    for ($i = 0 ; $i < $rows ; ++$i) {
        $row = mysqli_fetch_row($result_water_plant);
        $objects["water_plant"][] = $row;
    }
    mysqli_free_result($result_water_plant);
}
if ($result_pound)  {
    $rows = mysqli_num_rows($result_pound);
    for ($i = 0 ; $i < $rows ; ++$i) {
        $row = mysqli_fetch_row($result_pound);
        $objects["pound"][] = $row;
    }
    mysqli_free_result($result_pound);
}
mysqli_close($link);

$objects = json_encode($objects, JSON_UNESCAPED_UNICODE);
echo $objects;