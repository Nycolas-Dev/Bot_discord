<?php 

namespace App\Controller;

$db_name = getenv('DB_NAME');
        $db_user = getenv('DB_USER');
        $db_password = getenv('DB_PASSWORD');

$page = '../../project_rush/views/page/home.phtml';    

include '../../project_rush/views/template/global.phtml';

?>