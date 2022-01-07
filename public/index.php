<?php

//Autoload composer
require_once '../vendor/autoload.php';

//Initialisation Dotenv
use App\Controller\DotEnv;

(new DotEnv(__DIR__ . '/../.env'))->load();

//Initialisation du router
require_once '../routes/routes.php';


