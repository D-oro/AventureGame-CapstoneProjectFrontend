import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import '../style/Room/FinalBoss.css';
import Request from '../helpers/request';
import Narrator from './Narrator';
import Treasure from './Treasure';
import Inventory from './Inventory';
import swing1 from '../sounds/swing.wav';
import cluck from '../sounds/ChickenSoundEffect.mp3'
import monsterDeath from "../sounds/shade12.wav"
import block from "../sounds/sword_clash.9.ogg"
import MusicPlayer from './MusicPlayer';

const FinalBoss = () => {
    
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
                setNPCOne(data[3]);
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
            monsterDeathSound.play();
            setTimeout(() => {
                setNarratorMessage(`you have killed ${NPCOne.name} well fought ${playerOne.name}! Claim your reward.`)
            }, 3000)

        } else if (playerOneCopy.healthPoints <= 0) {
            setTimeout(() => {
                setNarratorMessage(`you have been defeated Game Over!`)
            }, 3000)
        }
    })

    const attackSound = new Audio(
        swing1
    );

    const monsterSound = new Audio(
        cluck
    );

    const monsterDeathSound = new Audio(
        monsterDeath
    );

    const blockSound = new Audio(
        block
    ); 
   
    const navigate = useNavigate()

    const handleLeaveRoom = () => {

        const copyPlayerOne = {...playerOne}
        copyPlayerOne.level = 1
        copyPlayerOne.healthPoints = copyPlayerOne.startHealthPoints
        const request = new Request()
        request.put("/api/players", copyPlayerOne)
        .then(() => {
            setPlayerOne(copyPlayerOne)
            navigate('/endpage')
        })
    }

    const handleClickGameOver = () => {
        navigate('/')
    }

    const updateHealth = (healthAmount) => {
        const copyPlayerOne = {...playerOne}
        copyPlayerOne.healthPoints += healthAmount
        setPlayerOne(copyPlayerOne)
    }

    const updateGold = (goldAmount) => {
        const copyPlayerOne = {...playerOne}
        copyPlayerOne.gold += goldAmount
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
            attackSound.play();
        } else {
            setNarratorMessage(`${npcOneCopy.name} dodges ${playerOne.name}'s attack.`)
            blockSound.play();
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
            monsterSound.play();
        } else {
            setNarratorMessage(`${playerOne.name} dodges ${npcOneCopy.name}'s attack`)
            blockSound.play();
        }
    }

    const btnAtk = document.getElementById('attack')
    function disableButtonAttack() {
        btnAtk.disabled = true;
        setTimeout(() => {
            btnAtk.disabled = false;
        }, 5000)
    }

    const btnBlk = document.getElementById('block')
    function disableButtonBlock() {
        btnBlk.disabled = true;
        setTimeout(() => {
            btnBlk.disabled = false;
        }, 5000)
    }

    const attackFunction = () => {
        if (NPCOne.healthPoints > 0 && playerOne.healthPoints > 0) {
            attackEnemy();
        } else {
            return;
        }
        disableButtonAttack();
        disableButtonBlock();
        setTimeout(() => {
            if (playerOneRef.current.healthPoints > 0 && NPCOneRef.current.healthPoints > 0) {
                attackPlayer();
            }
        }, 3500);
    }

    const blockFunction = () => {
        if (NPCOne.healthPoints > 0 && playerOne.healthPoints > 0) {
            setNarratorMessage(`${playerOne.name} attempts to block the next attack!`);
        } else {
            return;
        }
        disableButtonAttack();
        disableButtonBlock();
        setTimeout(() => {
            if (playerOneRef.current.healthPoints > 0 && NPCOneRef.current.healthPoints > 0) {
                blockEnemy();
            }
        }, 3500);
    }

    const blockEnemy = () => {
        const npcOneCopy = { ...NPCOne }
        const modifiers = [-5, -4, -3, -2, -1, 0, 1, 2];
        const modifier = modifiers[Math.floor(Math.random() * modifiers.length)];
        const modifiedAttackValue = Math.round(npcOneCopy.attackValue + modifier) / 2;
        const enemyAccuracy = Math.floor(Math.random() * 4 + 1);
        if (enemyAccuracy > 2.5) {
            playerOne.healthPoints -= modifiedAttackValue
            setNarratorMessage(`${npcOneCopy.name} gets through ${playerOne.name}'s block and hits for ${modifiedAttackValue} damage`);
            monsterSound.play()
        } else {
            setNarratorMessage(`${playerOne.name} fully blocks ${npcOneCopy.name}'s attack`)
            blockSound.play()
        }
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
               { playerOne.healthPoints <= 0 ? <div className='player-box-alt'> {playerOne.name} is dead!</div>:<div className='player-box'>{playerOne.name}</div>}
                { NPCOne.healthPoints <= 0 ? <div className='enemy-box-alt-boss'>{NPCOne.name} is dead!</div>: <div className='enemy-box-boss'>{NPCOne.name}</div>}
            </main>

            <footer className='footer'>
                <div className='inventory-box'>
                    <div className='gold'>GOLD : {playerOne.gold}</div>
                    <Inventory updateHealth={updateHealth}/>
                    <MusicPlayer />
                </div>
                
                <div className='text-box'>
                    <div className='narrator-box'>
                    <Narrator
                        message={
                            narratorMessage || `Prepare for battle ${playerOne.name}!`
                        } />
                    </div>
                    <div className='button-bar'>
                        <button className='attack' id='attack' onClick={attackFunction}>Attack!</button>
                        <button className='block' id='block' onClick={blockFunction}>Block!</button>
                    </div>
                    <></>
                    <div>
                        { NPCOne.healthPoints <= 0 ? <button className="back-to-map" onClick={handleLeaveRoom}>Leave Room!</button> : <></>}
                        { playerOne.healthPoints <= 0 ? <button className='back-to-home' onClick={handleClickGameOver}>Return To Home</button> : <></>}
                    </div>
                </div>
                <div className='reward-box'>
                    <div className='reward-box-content'>
                        Defeat {NPCOne.name} to receive a reward!
                        { NPCOne.healthPoints <= 0 ? <Treasure updateGold={updateGold}/> : <></>}
                </div>
                </div>
            </footer>
        </div>
    )
}

export default FinalBoss;