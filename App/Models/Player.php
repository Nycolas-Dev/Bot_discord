<?php

namespace App\Models;

class Player {

    function __construct() {

        $this->bdd = new \PDO('mysql:host=localhost;dbname='.getenv('DB_NAME').';charset=utf8',getenv('DB_USER'),getenv('DB_PASSWORD'));
    }       

    public function getPodium() {

        $query = $this->bdd->prepare("SELECT id_discord, pseudo, lvl, xp
                                FROM players
                                ORDER BY xp DESC");
                                
        $query->execute();
        
        $podium = $query->fetchAll(\PDO::FETCH_ASSOC);
        
        $podiums = json_encode($podium);

        return $podiums;

    }

    public function getInfosPlayerById($idPlayer) {

        $query = $this->bdd->prepare("SELECT pseudo, lvl, xp
                                FROM players
                                WHERE id_discord = ".$idPlayer."");
                                
        $query->execute();
        
        $infosPlayer = $query->fetchAll(\PDO::FETCH_ASSOC);
        
        $infosPlayer = json_encode($infosPlayer);

        return $infosPlayer;

    }

}

?>