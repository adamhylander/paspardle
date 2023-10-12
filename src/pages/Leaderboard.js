
import { useState, useEffect, useRef } from "react";
import LeaderboardBox from "../components/LeaderboardBox";
import Subheader from "../components/Subheader";
import './styling/Leaderboard.css';
import IsLoading from "../components/IsLoading";

function Leaderboard(){

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
           const user = [value['user'],value['points'],value['time'],value['rounds']];
            tmp.push(user);
        });
        console.log(tmp);
        tmp.sort((a, b) => (a[1] < b[1]) ? 1 : -1)
        console.log(tmp);

        setLeaderboardData(tmp);
        setLoading(false);
        return tmp;
    }

    if (isLoading){
        return <IsLoading />;
    }

    return(
        <div className="LeaderboardBoxContainer">
            <Subheader text={"Leaderboard"} />
            <div className="ValuesHeader">
                <div className="UsernameColumn">Användarnamn</div>
                <div className="Column">Poäng</div>
                <div className="Column" >Tid</div>
                <div className="Column">Rundor</div>
            </div>
            <div className="scrollDiv">
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
        </div>
    );
}

export default Leaderboard;