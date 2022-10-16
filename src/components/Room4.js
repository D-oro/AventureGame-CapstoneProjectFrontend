import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router';
import '../style/Room/Room4.css'
import Request from '../helpers/request';
import Narrator from './Narrator';
import Treasure from './Treasure';
import Inventory from './Inventory';

const Room4 = () =>{

    const navigate = useNavigate()

    const handleClick = () =>{
     navigate('/map')
    }

    const attackEnemy = () => {
        const npcFourCopy = {...NPCFour}
        const modifiers = Array(-5, -4, -3, -2, -1, 0, 1, 2);
        const modifier = modifiers[Math.floor(Math.random()*modifiers.length)];
        const modifiedAttackValue = playerOne.weapon.attackPoints + modifier;
        npcFourCopy.healthPoints -=  modifiedAttackValue
        setNarratorMessage(`${playerOne.name} attacks ${npcFourCopy.name} for ${modifiedAttackValue} damage`)
        setNPCFour(npcFourCopy)
    }

    const attackPlayer = () => {
        const npcFourCopy = {...NPCFour}
        const modifiers = Array(-5, -4, -3, -2, -1, 0, 1, 2);
        const modifier = modifiers[Math.floor(Math.random()*modifiers.length)];
        const modifiedAttackValue = npcFourCopy.attackValue + modifier;
        playerOne.healthPoints -=  modifiedAttackValue
        setNarratorMessage(`${npcFourCopy.name} attacks ${playerOne.name} for ${modifiedAttackValue} damage`)
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

    const [NPCFour, setNPCFour] = useState(null);
    const [playerOne, setPlayerOne] = useState(null);
    const [narratorMessage, setNarratorMessage] = useState('');

        useEffect(() => {
            const request = new Request()
            request.get("/api/npcs")
            .then((data) => {
            setNPCFour(data[2]);
            })
        }, [])

        useEffect(() => {
            const request = new Request()
            request.get("/api/players")
            .then((data) => {
            setPlayerOne(data[0]);
            })   
        }, [])

        if(!NPCFour){
            return "Loading..."
        }

        if(!playerOne){
            return "Loading..."
        }

    return(
        <div className='room-container4'>
            <header className='header4'>
            <progress className='health-bar4' id="playerHealth" value={playerOne.healthPoints} max={playerOne.startHealthPoints}></progress>
            <div className='char-name4'>{playerOne.name}</div>
            <img className='vs-img4' src={require(`../images/vs-41949.png`)} alt='oopsie'/>
            <div className='char-name4'>{NPCFour.name}</div>
            <progress className='health-bar4' id="enemyHealth" value={NPCFour.healthPoints} max={NPCFour.startHealthPoints}></progress>
            </header>

            <main className='main4'>
               <div className='player-box4'>
                    {playerOne.name}
               </div>
               <div className='enemy-box4'>
                    {NPCFour.name}
               </div>
            </main>

            <footer className='footer4'>
                <div className='inventory-box4'>
                    <Inventory/>
                </div>
                
                <div className='text-box4'>
                    
                    
                    <Narrator 
                    message={
                        narratorMessage || `Prepare for battle ${playerOne.name}`
                    }/>
                   
                    <div>
                    <button className='attack' id='attack' onClick={attackFunction}>Attack!</button>
                    <button className="back-to-map" onClick={handleClick}>Run Away!</button>
                    </div>
                </div>
                <div className='reward-box4'>
                    <div className='reward-box-content3'>
                        Defeat {NPCFour.name} to receive a reward!
                        <Treasure/>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Room4;






