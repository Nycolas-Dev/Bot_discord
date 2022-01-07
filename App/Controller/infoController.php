<?php 

namespace App\Controller;

use App\Models\Player;

if(isset($idPlayer)){

    $player = new Player;
    $infosPlayer = $player->getInfosPlayerById($idPlayer);
    $infosPlayer = json_decode($infosPlayer, true);
    
    $infosPlayerRush = $player->getInfosPlayerRushById($idPlayer);
    $infosPlayerRush = json_decode($infosPlayerRush, true);

}
else{

    if ( isset( $_GET['search'] ) ) {

        $regex = '/.*?([0-9]{18}).*?/';

        if(preg_match($regex, $_GET['player-search'])){
            $idSearch = $_GET['player-search']; 
        }
        else{
            $regexNo = true;
        }
        //343469541000609794
     }

}

$page = '../../project_rush/views/page/info.phtml';       
include '../../project_rush/views/template/global.phtml';

?>