<?php 

namespace App\Controller;

use App\Models\Player;




if(isset($idPlayer)){

    $player = new Player;
    $infosPlayer = $player->getInfosPlayerById($idPlayer);
    $infosPlayer = json_decode($infosPlayer, true);

}
else{


}

$page = '../../project_rush/views/page/info.phtml';       
include '../../project_rush/views/template/global.phtml';

?>