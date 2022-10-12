import React from 'react';
import '../style/Room/Room.css'

const Room = () =>{

    return(
        <div className='room-container'>
            <header className='header'>
            <progress className='health-bar' id="playerHealth" value="80" max="100"></progress>
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