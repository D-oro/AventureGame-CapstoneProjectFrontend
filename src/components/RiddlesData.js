import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Request from "../helpers/request";
import Narrator from './Narrator';
import Treasure from './Treasure';
import Inventory from './Inventory';
import '../style/riddle-room/RiddleRoom.css'

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
            // console.log(data)
            setRiddlesOne(data);
        })
    }, [])

    const onAnswerClick = (event) => {
        let correctAnswer = riddlesOne.correctAnswer;
        if(event.target.value === correctAnswer){
            setNarratorMessage(`Correct! You are a smart one, aren't you!`)
            setResult('won');
            playerOne.gold += 100
            // console.log(playerOne)
        }
        else{
            setNarratorMessage(`You lose! spikes come out the walls and damage you`)
            setResult('lost');
            playerOne.healthPoints -= 25
        }
    }

    const answerKeys = ["correctAnswer", "wrongAnswerOne", "wrongAnswerTwo", "wrongAnswerThree"]
        .map(value => ({value, sort:Math.random()}))
        .sort((a , b) => a.sort - b.sort)
        .map(({value}) => value)
        // console.log(answerKeys);
    const answerButtons = riddlesOne ? answerKeys.map((key, index) => {
        console.log(key)
        return <button key={index} className='riddle-button' value={riddlesOne[key]} onClick={onAnswerClick}>{riddlesOne[key]}</button>
    }) : null;

    const handleClick = () =>{
        navigate('/map')
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
            <div className='char-name'>Riddle Time!</div>
            
            <div className='char-name'>{NPCOne.name}</div>
            </header>

            <main className='main'>
               <div className='player-box'>
                    {playerOne.name}
               </div>
               <div className='enemy-box'>
                Answer my question to recieve a treasure! Get it wrong and you will be sorry!
               </div>
            </main>

            <footer className='footer'>
                <div className='inventory-box'>
                    <Inventory/>
                </div>
                
                <div className='text-box'>
                    
                <div className='narrator-box'>
                    <Narrator 
                    message={
                        narratorMessage || `${riddlesOne.question}`
                    }/>

                     <div>
                     {result}
                    </div>
                   </div> 
                    {answerButtons}                    
                    <div>
                        <button className="back-to-map" onClick={handleClick}>Run Away!</button>
                    </div>
                </div>
                <div className='reward-box'>
                    <div className='reward-box-content'>
                        Correctly answer the question to get a reward!
                        { result ? <Treasure/> : <></>}
                    </div>
                </div>
            </footer>
        </div>
    )
}







export default RiddlesData



