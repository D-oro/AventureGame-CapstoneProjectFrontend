import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Request from "../helpers/request";
import Narrator from './Narrator';
import Treasure from './Treasure';
import Inventory from './Inventory';
import '../style/riddle-room/RiddleRoom.css'
import laugh from "../sounds/evil_laugh_02.ogg"
import MusicPlayer from './MusicPlayer';

function RiddlesData(){
    const [riddlesOne, setRiddlesOne] = useState([]);
    const [result, setResult] = useState('');
    const navigate = useNavigate()

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

    useEffect(() => {
        const riddleQuestions = [1,2,3,4];
        const randomRiddle = riddleQuestions[Math.floor(Math.random()*riddleQuestions.length)];
        const riddleid = randomRiddle
        const request = new Request()
        request.get(`/api/riddles/${riddleid}`)
        .then((data) => {
            setRiddlesOne(data);
        })
    }, [])

    const laughSound = new Audio(
        laugh
    );

    const onAnswerClick = (event) => {
        let correctAnswer = riddlesOne.correctAnswer;
        if(event.target.value === correctAnswer){
            setNarratorMessage(`Correct! You are a smart one, aren't you!`)
            setResult('won');
        }
        else{
            setNarratorMessage(`You lose! spikes come out the ground and impale you... GAME OVER!`)
            setResult('lost');
            laughSound.play()
            playerOne.healthPoints -= playerOne.startHealthPoints
        }
    }

    const answerKeys = ["correctAnswer", "wrongAnswerOne", "wrongAnswerTwo", "wrongAnswerThree"]
        .map(value => ({value, sort:Math.random()}))
        .sort((a , b) => a.sort - b.sort)
        .map(({value}) => value)
    const answerButtons = riddlesOne ? answerKeys.map((key, index) => {
        console.log(key)
        return <button key={index} className='riddle-button' id='riddle-button' value={riddlesOne[key]} onClick={onAnswerClick}>{riddlesOne[key]}</button>
    }) : null;

    const handleClickGameOver = () => {
        navigate('/')
    }

    const updateGold = (goldAmount) => {
        const copyPlayerOne = {...playerOne}
        copyPlayerOne.gold += goldAmount
        setPlayerOne(copyPlayerOne)
    }

    const handleClick = () =>{
        const copyPlayerOne = {...playerOne}
        copyPlayerOne.level +=1
        const request = new Request()
        request.put("/api/players", copyPlayerOne)
        .then(() => {
            setPlayerOne(copyPlayerOne)
            navigate('/map')
       })
    }

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
            
            <div className='char-name'>The Riddler</div>
            </header>

            <main className='main'>
               
               { playerOne.healthPoints <= 0 ? <div className='player-box-riddle-alt'>{playerOne.name} is dead! <img className="spikes" src={require(`../images/3_spikes.png`)} alt="spikes"/></div>:<div className='player-box-riddle'>{playerOne.name}</div>}
             
               <div className='enemy-box-riddle'>
                Risky business... Answer my question to recieve a treasure!
               </div>
            </main>

            <footer className='footer'>
                <div className='inventory-box'>
                    <div className='gold'>GOLD : {playerOne.gold}</div>
                    <Inventory/>
                    <MusicPlayer />
                </div>
                
                <div className='text-box'>
                    
                <div className='narrator-box'>
                    <Narrator 
                    message={
                        narratorMessage || `${riddlesOne.question}`
                    }/>

                    
                   </div> 
                 { playerOne.healthPoints <= 0 || result === 'won' ? <></> : [answerButtons] }                    
                    <div>
                        { result === 'won' ? <button className="back-to-map" onClick={handleClick}>Leave Room!</button> : <></>}
                        { result === 'lost' ? <button className='back-to-home' onClick={handleClickGameOver}>Return To Home</button> : <></>}

                    </div>
                </div>
                <div className='reward-box'>
                    <div className='reward-box-content'>
                        Correctly answer the question to get a reward!
                        {  result === 'won' ? <Treasure updateGold={updateGold}/> : <></>}
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default RiddlesData;