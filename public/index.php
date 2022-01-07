<?php

require_once '../vendor/autoload.php';

use App\Controller\DotEnv;

(new DotEnv(__DIR__ . '/../.env'))->load();

require_once '../routes/routes.php';


