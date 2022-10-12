import React, {Component, Fragment, useEffect, useState} from 'react';


const PlayerContainer = () => {
    
        const [playerOne, setPlayerOne] = useState(null);
     
        useEffect(() => {
     
         const request = new Request()
         request.get("/api/players")
         .then((data) => {
           setPlayerOne(data[0]);
         })   
       }, [])
     
     
       return (!playerOne)? null : (
         <div>
             {playerOne.healthPoints}
         </div>
       )


}

export default PlayerContainer;