import React, {useState, useEffect} from 'react';
import '../style/Room/Room.css'
import PlayerContainer from '../containers/PlayerContainer';
import Request from '../helpers/request';


const Room = () =>{

   

    const [playerOne, setPlayerOne] = useState(null);
     
        useEffect(() => {
     
         const request = new Request()
         request.get("/api/players")
         .then((data) => {
           setPlayerOne(data[0]);
         })   
       }, [])

       if(!playerOne){
        return "Loading..."
       }

    return(
        <div className='room-container'>
            <header className='header'>
            <progress className='health-bar' id="playerHealth" value={playerOne.healthPoints} max="100"></progress>
            <progress className='health-bar' id="enemyHealth" value="100" max="100"></progress>
            </header>

            <main className='main'>
               <div className='player-box'>
                    player avatar here
               </div>
               <div className='enemy-box'>
                    enemy avatar here
               </div>
            </main>

            <footer className='footer'>
                <div className='inventory-box'>
                    inventory here
                </div>
                <div className='text-box'>
                    game text here
                </div>
                <div className='reward-box'>
                    reward goes here
                </div>
            </footer>
        </div>
    )

}

export default Room;