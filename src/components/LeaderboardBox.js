import React from 'react';
import "./styling/LeaderboardBox.css"

function LeaderboardBox(userInfo){
    return(
        <div className="LeaderBox" style={userInfo.style}>
            <p className='UserNameColumn'>{userInfo.name}</p>
            <p className='UserColumn'>{userInfo.points}</p>
            <p className='UserColumn'>{userInfo.time}</p>
            <p className='UserColumn'>{userInfo.rounds}</p> 
            
        </div>
    );
}

export default LeaderboardBox;

