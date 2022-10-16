import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router';
import '../style/Room/Room.css'
import Request from '../helpers/request';
import Narrator from './Narrator';
import Treasure from './Treasure';
import Inventory from './Inventory';

const Room = () =>{

    const navigate = useNavigate()

    const handleClick = () =>{
     navigate('/map')
    }

    useEffect(() => {
        const npcOneCopy = {...NPCOne}
        const playerOneCopy = {...playerOne}
        if(npcOneCopy.healthPoints <= 0){
            setTimeout(() => {
                setNarratorMessage(`you win`)
            }, 5000)
            
            
               
            
        }else if(playerOneCopy.healthPoints <= 0){
            setTimeout(() => {
                setNarratorMessage(`you lose`)
            }, 5000)
            
        } 
    })

    

    const attackEnemy = () => {
        const npcOneCopy = {...NPCOne}
        const modifiers = [-5, -4, -3, -2, -1, 0, 1, 2];
        const modifier = modifiers[Math.floor(Math.random()*modifiers.length)];
        const modifiedAttackValue = playerOne.weapon.attackPoints + modifier;
        const playerAccuracy = Math.floor(Math.random()* 4 + 1);  
        if(playerAccuracy > 1){
        npcOneCopy.healthPoints -=  modifiedAttackValue
        setNarratorMessage(`${playerOne.name} attacks ${npcOneCopy.name} for ${modifiedAttackValue} damage`)
        setNPCOne(npcOneCopy)
        }else{
            setNarratorMessage(`${npcOneCopy.name} dodges ${playerOne.name}'s attack.`)
        }
       
    
    }

    const attackPlayer = () => {
        const npcOneCopy = {...NPCOne}
        const modifiers = [-5, -4, -3, -2, -1, 0, 1, 2];
        const modifier = modifiers[Math.floor(Math.random()*modifiers.length)];
        const modifiedAttackValue = npcOneCopy.attackValue + modifier;
        const enemyAccuracy = Math.floor(Math.random()* 4 + 1);
        if(enemyAccuracy > 1){
        playerOne.healthPoints -=  modifiedAttackValue
        setNarratorMessage(`${npcOneCopy.name} attacks ${playerOne.name} for ${modifiedAttackValue} damage`);
        }else{
            setNarratorMessage(`${playerOne.name} dodges ${npcOneCopy.name}'s attack`)
        }
    }

    const btn = document.getElementById('attack') 
    function disableButton() {
        btn.disabled = true;
        setTimeout(() => {
            btn.disabled = false;
        }, 5000)
    }

    const attackFunction = () => {
    if(NPCOne.healthPoints > 0 && playerOne.healthPoints > 0){
    attackEnemy();
    }else{
        return;
    }if(playerOne.healthPoints > 0 && NPCOne.healthPoints > 0){
    disableButton();
        setTimeout(() => {
            attackPlayer();
        }, 3500);
    }else{
        return;
    }
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
            <div className='char-name'>{playerOne.name}</div>
            <img className='vs-img' src={require(`../images/vs-41949.png`)} alt='oopsie'/>
            <div className='char-name'>{NPCOne.name}</div>
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
                        Defeat {NPCOne.name} to receive a reward!
                        <Treasure/>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Room;








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