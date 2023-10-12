import { useState, useEffect, useRef } from "react";
import LeaderboardBox from "../components/LeaderboardBox";
import Subheader from "./Subheader";
import '../pages/styling/Leaderboard.css'
import IsLoading from "./IsLoading";

function MatchHistory({ userEmail }){

    const [leaderboardData, setLeaderboardData] = useState();
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        getLeaderboard();
    },[])

    async function getLeaderboard(){
        const response = await fetch("/get_leaderboard")
        .then((response) => {
            return response.json();
        })
        .then(data => {
            return data;
        })
        .catch((error) => console.log(error));
        const tmp = [];
        response.map((value,index) => {
            if (value['user'] === userEmail) {
                const user = [value['user'],value['points'],value['time'],value['rounds']];
                tmp.push(user);
            } 
        });
        setLeaderboardData(tmp);
        setLoading(false);
        return tmp;
    }

    if (isLoading){
        return(
            <IsLoading />
        )
    }
    if (leaderboardData.length === 0) {
        return (
            
            <div>
                <Subheader text={"Match historik"} />
                <p style={{margin: "auto", textAlign: "center", fontSize: "18px"}}>Spela en match för att kunna se din match historik!</p>
            </div>
        )
    }
    return(
        <div className="LeaderboardBoxContainer">
            <Subheader text={"Match historik"} />
            <div className="ValuesHeader">
                <div className="UsernameColumn">Användarnamn</div>
                <div className="Column">Poäng</div>
                <div className="Column" >Tid</div>
                <div className="Column">Rundor</div>
            </div>
            {leaderboardData.map((user, index) => (
                <LeaderboardBox
                key={index}
                name={user[0]}
                points={user[1]}
                time={user[2]}
                rounds={user[3]}
                />
            ))}

        </div>
    );
}

export default MatchHistory;
