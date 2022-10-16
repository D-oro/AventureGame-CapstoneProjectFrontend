import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router';
import '../style/Room/Room5.css'
import Request from '../helpers/request';
import Narrator from './Narrator';
import Treasure from './Treasure';
import Inventory from './Inventory';

const Room5 = () =>{

    const navigate = useNavigate()

    const handleClick = () =>{
     navigate('/map')
    }

    const attackEnemy = () => {
        const npcFiveCopy = {...NPCFive}
        const modifiers = Array(-5, -4, -3, -2, -1, 0, 1, 2);
        const modifier = modifiers[Math.floor(Math.random()*modifiers.length)];
        const modifiedAttackValue = playerOne.weapon.attackPoints + modifier;
        npcFiveCopy.healthPoints -=  modifiedAttackValue
        setNarratorMessage(`${playerOne.name} attacks ${npcFiveCopy.name} for ${modifiedAttackValue} damage`)
        setNPCFive(npcFiveCopy)
    }

    const attackPlayer = () => {
        const npcFiveCopy = {...NPCFive}
        const modifiers = Array(-5, -4, -3, -2, -1, 0, 1, 2);
        const modifier = modifiers[Math.floor(Math.random()*modifiers.length)];
        const modifiedAttackValue = npcFiveCopy.attackValue + modifier;
        playerOne.healthPoints -=  modifiedAttackValue
        setNarratorMessage(`${npcFiveCopy.name} attacks ${playerOne.name} for ${modifiedAttackValue} damage`)
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

    const [NPCFive, setNPCFive] = useState(null);
    const [playerOne, setPlayerOne] = useState(null);
    const [narratorMessage, setNarratorMessage] = useState('');

        useEffect(() => {
            const request = new Request()
            request.get("/api/npcs")
            .then((data) => {
            setNPCFive(data[4]);
            })
        }, [])

        useEffect(() => {
            const request = new Request()
            request.get("/api/players")
            .then((data) => {
            setPlayerOne(data[0]);
            })   
        }, [])

        if(!NPCFive){
            return "Loading..."
        }

        if(!playerOne){
            return "Loading..."
        }

    return(
        <div className='room-container5'>
            <header className='header5'>
            <progress className='health-bar5' id="playerHealth" value={playerOne.healthPoints} max={playerOne.startHealthPoints}></progress>
            <div className='char-name5'>{playerOne.name}</div>
            <img className='vs-img5' src={require(`../images/vs-41949.png`)} alt='oopsie'/>
            <div className='char-name5'>{NPCFive.name}</div>
            <progress className='health-bar5' id="enemyHealth" value={NPCFive.healthPoints} max={NPCFive.startHealthPoints}></progress>
            </header>

            <main className='main5'>
               <div className='player-box5'>
                    {playerOne.name}
               </div>
               <div className='enemy-box5'>
                    {NPCFive.name}
               </div>
            </main>

            <footer className='footer5'>
                <div className='inventory-box5'>
                    <Inventory/>
                </div>
                
                <div className='text-box5'>
                    
                    
                    <Narrator 
                    message={
                        narratorMessage || `Prepare for battle ${playerOne.name}`
                    }/>
                   
                    <div>
                    <button className='attack' id='attack' onClick={attackFunction}>Attack!</button>
                    <button className="back-to-map" onClick={handleClick}>Run Away!</button>
                    </div>
                </div>
                <div className='reward-box5'>
                    <div className='reward-box-content3'>
                        Defeat {NPCFive.name} to receive a reward!
                        <Treasure/>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Room5;






