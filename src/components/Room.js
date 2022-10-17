import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import '../style/Room/Room.css'
import Request from '../helpers/request';
import Narrator from './Narrator';
import Treasure from './Treasure';
import Inventory from './Inventory';

const Room = () => {

    const [NPCOne, setNPCOne] = useState(null);
    const [playerOne, setPlayerOne] = useState(null);
    const [narratorMessage, setNarratorMessage] = useState('');
    const NPCOneRef = useRef(NPCOne)
    const playerOneRef = useRef(playerOne)
    NPCOneRef.current = NPCOne
    playerOneRef.current = playerOne

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

    useEffect(() => {
        const npcOneCopy = { ...NPCOne }
        const playerOneCopy = { ...playerOne }
        if (npcOneCopy.healthPoints <= 0) {
            setTimeout(() => {
                setNarratorMessage(`you have killed ${NPCOne.name} well fought ${playerOne.name}`)
            }, 3000)

        } else if (playerOneCopy.healthPoints <= 0) {
            setTimeout(() => {
                setNarratorMessage(`you have been defeated Game Over!`)
            }, 3000)

        }
    })

    const navigate = useNavigate()

    const handleClick = () => {
        navigate('/map')
    }

    const updateHealth = (healthAmount) => {
        const copyPlayerOne = {...playerOne}
        copyPlayerOne.healthPoints += healthAmount
        setPlayerOne(copyPlayerOne)
    }

    const attackEnemy = () => {
        const npcOneCopy = { ...NPCOne }
        const modifiers = [-5, -4, -3, -2, -1, 0, 1, 2];
        const modifier = modifiers[Math.floor(Math.random() * modifiers.length)];
        const modifiedAttackValue = playerOne.weapon.attackPoints + modifier;
        const playerAccuracy = Math.floor(Math.random() * 4 + 1);
        if (playerAccuracy > 1) {
            npcOneCopy.healthPoints -= modifiedAttackValue
            setNarratorMessage(`${playerOne.name} attacks ${npcOneCopy.name} for ${modifiedAttackValue} damage`)
            setNPCOne(npcOneCopy)
        } else {
            setNarratorMessage(`${npcOneCopy.name} dodges ${playerOne.name}'s attack.`)
        }
    }

    const attackPlayer = () => {
        const npcOneCopy = { ...NPCOne }
        const modifiers = [-5, -4, -3, -2, -1, 0, 1, 2];
        const modifier = modifiers[Math.floor(Math.random() * modifiers.length)];
        const modifiedAttackValue = npcOneCopy.attackValue + modifier;
        const enemyAccuracy = Math.floor(Math.random() * 4 + 1);
        if (enemyAccuracy > 1) {
            playerOne.healthPoints -= modifiedAttackValue
            setNarratorMessage(`${npcOneCopy.name} attacks ${playerOne.name} for ${modifiedAttackValue} damage`);
        } else {
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
        if (NPCOne.healthPoints > 0 && playerOne.healthPoints > 0) {
            attackEnemy();
        } else {
            return;
        }
        disableButton();
        setTimeout(() => {
            if (playerOneRef.current.healthPoints > 0 && NPCOneRef.current.healthPoints > 0) {
                attackPlayer();
            }
        }, 3500);
    }




    if (!NPCOne) {
        return "Loading..."
    }

    if (!playerOne) {
        return "Loading..."
    }

    return (
        <div className='room-container'>
            <header className='header'>
                <progress className='health-bar' id="playerHealth" value={playerOne.healthPoints} max={playerOne.startHealthPoints}></progress>
                <div className='char-name'>{playerOne.name}</div>
                <img className='vs-img' src={require(`../images/vs-41949.png`)} alt='oopsie' />
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
                    <Inventory updateHealth={updateHealth}/>
                </div>

                <div className='text-box'>

                    <Narrator
                        message={
                            narratorMessage || `Prepare for battle ${playerOne.name}`
                        } />

                    <div>
                        <button className='attack' id='attack' onClick={attackFunction}>Attack!</button>
                        <button className="back-to-map" onClick={handleClick}>Run Away!</button>
                    </div>
                </div>
                <div className='reward-box'>
                    <div className='reward-box-content'>
                        Defeat {NPCOne.name} to receive a reward!
                        { NPCOne.healthPoints <= 0 ? <Treasure /> : <></>}
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Room;