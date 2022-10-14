import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router';
import '../style/Room/Room.css'
import Request from '../helpers/request';
import Narrator from './Narrator';
import Treasure from './Treasure'
import { wait } from '@testing-library/user-event/dist/utils';

const Room = () =>{

    const navigate = useNavigate()

    const handleClick = () =>{
     navigate('/map')
    }

    // const attackModifier = () => {
    //    return Math.round(Math.random()) * 2 - 1
    // }

    const attackEnemy = () => {
        const npcOneCopy = {...NPCOne}
        const copyPlayer1 = {...playerOne}
        copyPlayer1.name = "Ash"
        npcOneCopy.attackValue = 15
        npcOneCopy.healthPoints -= playerOne.weapon.attackPoints + Math.round(Math.random()) * 2 -6
        setNarratorMessage(`${playerOne.name} attacks ${npcOneCopy.name} with ${playerOne.weapon.attackPoints}`)
        setNPCOne(npcOneCopy)

        // useEffect(() => {
        
       
        //     setNarratorMessage(`${playerOne.name} attacked ${NPCOne.name} for ${playerOne.weapon.attackPoints} damage`)
        // })

        // update backend, we just use attack button for ease

        // const copyPlayer1 = {...playerOne}
        // copyPlayer1.name = "Ash"
        
        // copyPlayer1.weapon.attackPoints += 5
        // const request = new Request()
        // request.put("/api/players", copyPlayer1)
        // .then((res) => {
        //    return res.json()
        // })
        // .then((data) =>{
        //     console.log(data)
        // })

        // // and to keep the frontend in sync with the backend
        // setPlayerOne(copyPlayer1)
    }

    const attackPlayer = () => {
        const npcOneCopy = {...NPCOne}
        const copyPlayer1 = {...playerOne}
        playerOne.healthPoints -= npcOneCopy.attackValue + Math.round(Math.random()) * 2 -6
        setNarratorMessage(`${npcOneCopy.name} attacks ${playerOne.name}`)
    }

    const attackFunction = () => {

        attackEnemy();
        setTimeout(() => {
            attackPlayer();
        }, 3500)
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
            <div>{playerOne.name} VS {NPCOne.name}</div>
            <progress className='health-bar' id="enemyHealth" value={NPCOne.healthPoints} max={NPCOne.startHealthPoints}></progress>
            </header>

            <main className='main'>
               <div className='player-box'>
                    {playerOne.name}
               </div>
               <div className='enemy-box'>
                    {NPCOne.name}
               </div>
            </main>

            <footer className='footer'>
                <div className='inventory-box'>
                    inventory here
                </div>
                <div className='text-box'>
                    
                    <Narrator 
                    message={
                        narratorMessage || `Prepare for battle ${playerOne.name}`
                    }/>
                   
                    <div>
                    <button className="back-to-map" onClick={handleClick}>Back To The Map!</button>
                    <button className='attack' onClick={attackFunction}>Attack!</button>
                    </div>
                </div>
                <div className='reward-box'>
                    <div className='reward-box-content'>
                        Defeat {NPCOne.name} to receive a reward!
                        <Treasure/>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Room;