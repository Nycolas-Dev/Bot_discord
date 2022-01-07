<?php
$request = $_SERVER['REQUEST_URI'];

$request = str_replace("/project_rush", "", $request);

if (strpos($request, 'info/') !== false) {
    $idPlayer = str_replace("/info/", "", $request);
    require_once '../App/Controller/infoController.php';
    die;
}

if (strpos($request, 'info?') !== false) {
    require_once '../App/Controller/infoController.php';
    die;
}

switch ($request) {
    case '/' :
        require_once '../App/Controller/homeController.php';
        break;
    case '/podium' :
        require_once '../App/Controller/podiumController.php';
        break;
    case '/info' :
        require_once '../App/Controller/infoController.php';
        break;
    case '/reviews' :
        require_once '../App/Controller/reviewsController.php';
        break;
    default:    
        http_response_code(404);
        require_once '../views/404.php';
        break;
}