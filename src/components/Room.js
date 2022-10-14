import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router';
import '../style/Room/Room.css'
import Request from '../helpers/request';
import { Navigate } from 'react-router-dom';
import Narrator from './Narrator';


const Room = () =>{

    const navigate = useNavigate()

    const handleClick = () =>{
     navigate('/map')
    }


    const attackEnemy = () => {
        const npcOneCopy = {...NPCOne}
        npcOneCopy.healthPoints -= playerOne.weapon.attackPoints
        setNPCOne(npcOneCopy)

        // update backend, we just use attack button for ease
        const copyPlayer1 = {...playerOne}
        copyPlayer1.name = "Ash"
        copyPlayer1.weapon.attackPoints += 5
        const request = new Request()
        request.put("/api/players", copyPlayer1)
        .then((res) => {
           return res.json()
        })
        .then((data) =>{
            console.log(data)
        })

        // and to keep the frontend in sync with the backend
        setPlayerOne(copyPlayer1)
    }


    const [NPCOne, setNPCOne] = useState(null);
    const [playerOne, setPlayerOne] = useState(null);
    const [narratorMessage, setNarratorMessage] = useState('');

        useEffect(() => {
            const request = new Request()
            request.get("/api/npcs")
            .then((data) => {
            setNPCOne(data[0]);
            })
        }, [])

        useEffect(() => {
            const request = new Request()
            request.get("/api/players")
            .then((data) => {
            setPlayerOne(data[0]);
            })   
       }, [])


        if(!NPCOne){
            return "Loading..."
        }

       if(!playerOne){
        return "Loading..."
       }

       

    
    return(
        <div className='room-container'>
            <header className='header'>
            <progress className='health-bar' id="playerHealth" value={playerOne.healthPoints} max={playerOne.startHealthPoints}></progress>
            <progress className='health-bar' id="enemyHealth" value={NPCOne.healthPoints} max={NPCOne.startHealthPoints}></progress>
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
                    
                    <Narrator 
                    message={
                        narratorMessage || `Welcome to the battle ${playerOne.name}`
                    }/>
                   
                    <div>
                    <button className="back-to-map" onClick={handleClick}>Back To The Map!</button>
                    <button className='attack' onClick={attackEnemy}>Attack!</button>
                    </div>
                </div>
                <div className='reward-box'>
                    reward goes here
                </div>
            </footer>
        </div>
    )

}

export default Room;