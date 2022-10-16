import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router';
import '../style/Room/Room2.css'
import Request from '../helpers/request';
import Narrator from './Narrator';
import Treasure from './Treasure';
import Inventory from './Inventory';

const Room2 = () =>{

    const navigate = useNavigate()

    const handleClick = () =>{
     navigate('/map')
    }

    const attackEnemy = () => {
        const npcTwoCopy = {...NPCTwo}
        const modifiers = Array(-5, -4, -3, -2, -1, 0, 1, 2);
        const modifier = modifiers[Math.floor(Math.random()*modifiers.length)];
        const modifiedAttackValue = playerOne.weapon.attackPoints + modifier;
        npcTwoCopy.healthPoints -=  modifiedAttackValue
        setNarratorMessage(`${playerOne.name} attacks ${npcTwoCopy.name} for ${modifiedAttackValue} damage`)
        setNPCTwo(npcTwoCopy)
    }

    const attackPlayer = () => {
        const npcTwoCopy = {...NPCTwo}
        const modifiers = Array(-5, -4, -3, -2, -1, 0, 1, 2);
        const modifier = modifiers[Math.floor(Math.random()*modifiers.length)];
        const modifiedAttackValue = npcTwoCopy.attackValue + modifier;
        playerOne.healthPoints -=  modifiedAttackValue
        setNarratorMessage(`${npcTwoCopy.name} attacks ${playerOne.name} for ${modifiedAttackValue} damage`)
    }

    const btn = document.getElementById('attack') 
    function disableButton() {
        btn.disabled = true;
        setTimeout(() => {
            btn.disabled = false;
        }, 4000)
    }

    const attackFunction = () => {
    attackEnemy();
    disableButton();
        setTimeout(() => {
            attackPlayer();
        }, 3500)
    }

    const [NPCTwo, setNPCTwo] = useState(null);
    const [playerOne, setPlayerOne] = useState(null);
    const [narratorMessage, setNarratorMessage] = useState('');

        useEffect(() => {
            const request = new Request()
            request.get("/api/npcs")
            .then((data) => {
            setNPCTwo(data[1]);
            })
        }, [])

        useEffect(() => {
            const request = new Request()
            request.get("/api/players")
            .then((data) => {
            setPlayerOne(data[0]);
            })   
        }, [])

        if(!NPCTwo){
            return "Loading..."
        }

        if(!playerOne){
            return "Loading..."
        }

    return(
        <div className='room-container'>
            <header className='header'>
            <progress className='health-bar' id="playerHealth" value={playerOne.healthPoints} max={playerOne.startHealthPoints}></progress>
            <div className='char-name'>{playerOne.name}</div>
            <img className='vs-img' src={require(`../images/vs-41949.png`)} alt='oopsie'/>
            <div className='char-name'>{NPCTwo.name}</div>
            <progress className='health-bar' id="enemyHealth" value={NPCTwo.healthPoints} max={NPCTwo.startHealthPoints}></progress>
            </header>

            <main className='main'>
               <div className='player-box'>
                    {playerOne.name}
               </div>
               <div className='enemy-box'>
                    {NPCTwo.name}
               </div>
            </main>

            <footer className='footer'>
                <div className='inventory-box'>
                    <Inventory/>
                </div>
                
                <div className='text-box'>
                    
                    
                    <Narrator 
                    message={
                        narratorMessage || `Prepare for battle ${playerOne.name}`
                    }/>
                   
                    <div>
                    <button className='attack' id='attack' onClick={attackFunction}>Attack!</button>
                    <button className="back-to-map" onClick={handleClick}>Run Away!</button>
                    </div>
                </div>
                <div className='reward-box'>
                    <div className='reward-box-content'>
                        Defeat {NPCTwo.name} to receive a reward!
                        <Treasure/>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Room2;






