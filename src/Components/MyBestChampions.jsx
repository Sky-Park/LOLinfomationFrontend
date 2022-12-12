import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { RIOTGAMES_API, API_KEY, SERVER_URL } from "../Constants";

function MyBestChampions({ summonerName }) {
    
    const [getSummoner, setGetSummoner] = useState([]);
    const [loading, setLoading] = useState(false);
    
    
    useEffect(() => {
     
        async function getBestChampions() {
            setLoading(true);
            try {
                const res = await axios.get(`${SERVER_URL}/match/summoner/${summonerName}`);
                if ( res?.data ) {
                    setGetSummoner(res?.data);
                    setLoading(false);
                }
            } catch ( e ) {
                console.log(e);
            }
        }
        
        getBestChampions();
       
    }, []);
    
    
    const myChampions = useMemo(() => {
        
        return (getSummoner.slice(0, 5).map((value, i) => (<div className="champBox box-width" key={i}>
                <div>
                    <img
                        src={`https://ddragon.leagueoflegends.com/cdn/12.21.1/img/champion/${value.chmpionName}.png`}
                        width="40"/>
                    <h5>픽률 : {`${value.champPickRate}`}</h5>
                    <h5>승률 : {`${value.champWinRate}`}</h5>
                    {value.itemWinRate.map((item, i) => {
                        return (<div key={i} className="champBox">
                            <img
                                src={`http://ddragon.leagueoflegends.com/cdn/12.22.1/img/item/${item.itemId}.png`}
                                width="40"
                            />
                            <h8> 픽률 : {`${item.itemPickRate}`}</h8>
                            <h8> 승률 : {`${item.itemWinRate}`}</h8>
                        </div>);
                    })}
                </div>
            </div>
        )));
    }, [getSummoner])
    
    
    return (
        <div>
            {loading ? (
                <div>소환사 정보를 계산중입니다...</div>
            ) : (
                <div>{myChampions} </div>
            )}
        </div>
    );
}

export default MyBestChampions;