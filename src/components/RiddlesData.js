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

    useEffect(() => {
        const riddleQuestions = [1,2,3,4];
        const randomRiddle = riddleQuestions[Math.floor(Math.random()*riddleQuestions.length)];
        const riddleid = randomRiddle
        const request = new Request()
        request.get(`/api/riddles/${riddleid}`)
        .then((data) => {
            console.log(data)
            setRiddlesOne(data);
        })
    }, [])

    const onCorrectAnswerClick = (event) => {
        let correctAnswer = riddlesOne.correctAnswer;
        if(event.target.value === correctAnswer){
            setResult("Correct!");
            playerOne.gold += 100
            console.log(playerOne)
        }else{
            setResult("You lose!");
            playerOne.healthPoints -= 25
        }
    }

    const handleClick = () =>{
        navigate('/map')
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
            
            <div className='char-name'>{NPCOne.name}</div>
            </header>

            <main className='main'>
               <div className='player-box'>
                    {playerOne.name}
               </div>
               <div className='enemy-box'>
                Answer my question to recieve a treasure! Get it wrong and you will die!
               </div>
            </main>

            <footer className='footer'>
                <div className='inventory-box'>
                    <Inventory/>
                </div>
                
                <div className='text-box'>
                    
                    
                    <Narrator 
                    message={
                        narratorMessage || `${riddlesOne.question}`
                    }/>

                    <button value={riddlesOne.correctAnswer} onClick={onCorrectAnswerClick}>{riddlesOne.correctAnswer}</button>
                    <button value={riddlesOne.wrongAnswerOne} onClick={onCorrectAnswerClick}>{riddlesOne.wrongAnswerOne}</button>
                    <button value={riddlesOne.wrongAnswerTwo} onClick={onCorrectAnswerClick}>{riddlesOne.wrongAnswerTwo}</button>
                    <button value={riddlesOne.wrongAnswerThree} onClick={onCorrectAnswerClick}>{riddlesOne.wrongAnswerThree}</button>
                   
                    <div>
                    <div>
                    <p>{result}</p>
                    </div>
                   
                    <button className="back-to-map" onClick={handleClick}>Run Away!</button>
                    </div>
                </div>
                <div className='reward-box'>
                    <div className='reward-box-content'>
                        Correctly answer the question to get a reward!
                        <Treasure/>
                    </div>
                </div>
            </footer>
        </div>
    )
}







export default RiddlesData



