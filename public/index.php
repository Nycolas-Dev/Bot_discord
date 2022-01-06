<?php



// Load Config
require_once '../vendor/autoload.php';
require_once '../config/config.php';

use App\Controller\DotEnv;

(new DotEnv(__DIR__ . '/../.env'))->load();

require_once '../routes/routes.php';


