import React from "react";
import { useParams } from "react-router-dom";
import ChampionItemByTier from "../Components/ChampionItemByTier";

function Champions() {
    const urlParams = useParams();
    
    return (
        <>
            <br/>
            <img
                src={`https://ddragon.leagueoflegends.com/cdn/12.21.1/img/champion/${urlParams.championsEngName}.png`}
                width="100"/>
            <br/>
            <div>
                <ChampionItemByTier />
            </div>
        </>
    );
}

export default Champions;