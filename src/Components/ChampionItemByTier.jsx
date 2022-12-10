import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import champdata from "../data/champdata";
import axios from "axios";
import { RIOTGAMES_API, API_KEY, SERVER_URL } from "../Constants";

function ChampionItemByTier() {
    
    const urlParams = useParams();
    const [championItems, setChampionsItems] = useState([])
    const [load, setLoad] = useState(false)
    
    const [challengerData, setChallengerData] = useState([]);

    const urlParamsChampion = champdata.find((champion) => {
        if ( champion.engName === urlParams.championsEngName ) {
            return true;
        }
    })
    

    //서버로 부터 챌,그마,마스터, 다이야, 플레, 골드 데이터 가져오기
    useEffect(() => {
        if ( !urlParams ) {
            return;
        }
        async function getChampion() {
            try {
                const res = await axios.get(`${SERVER_URL}/match/${urlParamsChampion.id}`)
                if ( res?.data ) {
                    setChampionsItems(res.data)
                }
            } catch ( e ) {
                setLoad(true)
            }
        }
        
        getChampion()
        
    }, [urlParams])
    
    
    
    useEffect(() => {
        if ( !urlParams ) {
            return ;
        }
    
        async function ChallengerData() {
            for ( let i = 0 ; i < championItems.length ; i++)
                if (championItems[i].tier === "CHALLENGER" ) {  //티어가 챌린저 일때
                    setChallengerData(() => {
                            challengerData.push(championItems[i])
                        }
                    )
                }
        }
        ChallengerData()
        
    }, [urlParams])

    

    
    //     }else if (championItems[i].tier === "GRANDMASTER" ) {
    //         grandMasterData.push(championItems[i])
    //
    //     }else if (championItems[i].tier === "MASTER" ) {
    //         masterData.push(championItems[i])
    //
    //     }else if (championItems[i].tier === "DIAMOND" ) {
    //         diamondData.push(championItems[i])
    //
    //     }else if (championItems[i].tier === "PLATINUM" ) {
    //         platinumData.push(championItems[i])
    //
    //     }else if (championItems[i].tier === "GOLD" ) {
    //         goldData.push(championItems[i])
    //
    //     }else if (championItems[i].tier === "SILVER" ) {
    //         silverData.push(championItems[i])
    //
    //     }else if (championItems[i].tier === "BRONZE" ) {
    //         bronzeData.push(championItems[i])
    //
    // }
    
    
    const challengerItemImg = challengerData.map((value, i) => {
        return (
                <div>
                    <div className="champ_Box">
                        <img
                            src = {`http://ddragon.leagueoflegends.com/cdn/12.22.1/img/item/${challengerData[i].itemId}.png`}
                        />
                        <h5>승률 : {`${challengerData[i].winRate}`} </h5>
                        <h5>픽률 : {`${challengerData[i].pickRate}`} </h5>
                    </div>
                </div>
            )
    })
    
    // const gramdmasterItemImg = grandMasterData.slice(0,9).map((value, i) => {
    //     return (
    //         <div>
    //             <div className="champ_Box">
    //                 <img
    //                     src = {`http://ddragon.leagueoflegends.com/cdn/12.22.1/img/item/${grandMasterData[i].itemId}.png`}
    //                 />
    //                 <h5>승률 : {`${grandMasterData[i].winRate}`} </h5>
    //                 <h5>픽률 : {`${grandMasterData[i].pickRate}`} </h5>
    //             </div>
    //         </div>
    //     )
    // })
    
    // const masterItemImg = masterData.slice(0,9).map((value, i) => {
    //     return (
    //         <div>
    //             <div className="champ_Box">
    //                 <img
    //                     src = {`http://ddragon.leagueoflegends.com/cdn/12.22.1/img/item/${masterData[i].itemId}.png`}
    //                 />
    //                 <h5>승률 : {`${masterData[i].winRate}`} </h5>
    //                 <h5>픽률 : {`${masterData[i].pickRate}`} </h5>
    //             </div>
    //         </div>
    //     )
    // })
    //
    // const diamondItemImg = diamondData.slice(0,9).map((value, i) => {
    //     return (
    //         <div>
    //             <div className="champ_Box">
    //                 <img
    //                     src = {`http://ddragon.leagueoflegends.com/cdn/12.22.1/img/item/${diamondData[i].itemId}.png`}
    //                 />
    //                 <h5>승률 : {`${diamondData[i].winRate}`} </h5>
    //                 <h5>픽률 : {`${diamondData[i].pickRate}`} </h5>
    //             </div>
    //         </div>
    //     )
    // })
    //
    // const platinumItemImg = platinumData.slice(0,9).map((value, i) => {
    //     return (
    //         <div>
    //             <div className="champ_Box">
    //                 <img
    //                     src = {`http://ddragon.leagueoflegends.com/cdn/12.22.1/img/item/${platinumData[i].itemId}.png`}
    //                 />
    //                 <h5>승률 : {`${platinumData[i].winRate}`} </h5>
    //                 <h5>픽률 : {`${platinumData[i].pickRate}`} </h5>
    //             </div>
    //         </div>
    //     )
    // })
    //
    // const goldItemImg = goldData.slice(0,9).map((value, i) => {
    //     return (
    //         <div>
    //             <div className="champ_Box">
    //                 <img
    //                     src = {`http://ddragon.leagueoflegends.com/cdn/12.22.1/img/item/${goldData[i].itemId}.png`}
    //                 />
    //                 <h5>승률 : {`${goldData[i].winRate}`} </h5>
    //                 <h5>픽률 : {`${goldData[i].pickRate}`} </h5>
    //             </div>
    //         </div>
    //     )
    // })
    //
    // const silverItemImg = silverData.slice(0,9).map((value, i) => {
    //     return (
    //         <div>
    //             <div className="champ_Box">
    //                 <img
    //                     src = {`http://ddragon.leagueoflegends.com/cdn/12.22.1/img/item/${silverData[i].itemId}.png`}
    //                 />
    //                 <h5>승률 : {`${silverData[i].winRate}`} </h5>
    //                 <h5>픽률 : {`${silverData[i].pickRate}`} </h5>
    //             </div>
    //         </div>
    //     )
    // })
    //
    // const bronzeItemImg =bronzeData.slice(0,9).map((value, i) => {
    //     return (
    //         <div>
    //             <div className="champ_Box">
    //                 <img
    //                     src = {`http://ddragon.leagueoflegends.com/cdn/12.22.1/img/item/${bronzeData[i].itemId}.png`}
    //                 />
    //                 <h5>승률 : {`${bronzeData[i].winRate}`} </h5>
    //                 <h5>픽률 : {`${bronzeData[i].pickRate}`} </h5>
    //             </div>
    //         </div>
    //     )
    // })


    // const ChallengerPlayNumber = challengerData[0].totalMatch
    // {grandMasterData[0].totalMatch}
    // {masterData[0].totalMatch}
    // {diamondData[0].totalMatch}
    // {platinumData[0].totalMatch}
    // {goldData[0].totalMatch}
    // {silverData[0].totalMatch}
    // {bronzeData[0].totalMatch}
    
    return (
        <div>
            테스트
            {/*<div>*/}
            {/*    <h4>Challenger / 판수 : {ChallengerPlayNumber}</h4>*/}
            {/*    {challengerItemImg}*/}
            {/*</div>*/}
            
            {/*<div className='clear margin-top'>*/}
            {/*    <h4>GrandMaster / 판수 : </h4>*/}
            {/*    {gramdmasterItemImg}*/}
            {/*</div>*/}
            
            {/*<div className='clear'>*/}
            {/*    <h4>Master / 판수 :  </h4>*/}
            {/*    {masterItemImg}*/}
            {/*</div>*/}
            
            {/*<div className='clear'>*/}
            {/*    <h4>Diamond / 판수 :  </h4>*/}
            {/*    {diamondItemImg}*/}
            {/*</div>*/}
            
            {/*<div className='clear'>*/}
            {/*    <h4>Platinum / 판수 :  </h4>*/}
            {/*    {platinumItemImg}*/}
            {/*</div>*/}
            
            {/*<div className='clear'>*/}
            {/*    <h4>Gold / 판수 :  </h4>*/}
            {/*    {goldItemImg}*/}
            {/*</div>*/}
            
            {/*<div className='clear'>*/}
            {/*    <h4>Silver / 판수 :  </h4>*/}
            {/*    {silverItemImg}*/}
            {/*</div>*/}
            
            {/*<div className='clear'>*/}
            {/*    <h4>Bronze / 판수 :  </h4>*/}
            {/*    {bronzeItemImg}*/}
            {/*</div>*/}
        </div>
    );
    
}

export default ChampionItemByTier;