<?php 

namespace App\Controller;

use App\Models\Player;

$player = new Player;
$podium = $player->getPodium();
$podium = json_decode($podium, true);

$page = '../../project_rush/views/page/podium.phtml';       
include '../../project_rush/views/template/global.phtml';

?>