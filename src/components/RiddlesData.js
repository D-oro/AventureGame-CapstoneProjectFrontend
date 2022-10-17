import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Request from "../helpers/request";

function RiddlesData(){
    const [riddlesOne, setRiddlesOne] = useState([]);
    const [result, setResult] = useState('');
    const navigate = useNavigate()

    useEffect(() => {
        const riddleid = 1
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
        }else{
            setResult("You lose!");
        }
    }
  


    return(
        
        <div>
        <div> {riddlesOne.question}</div>
        <div>
            <button value={riddlesOne.correctAnswer} onClick={onCorrectAnswerClick} >{riddlesOne.correctAnswer}</button>
            <button value={riddlesOne.wrongAnswerOne} onClick={onCorrectAnswerClick} >{riddlesOne.wrongAnswerOne}</button>
            <button >{riddlesOne.wrongAnswerTwo}</button>
            <button >{riddlesOne.wrongAnswerThree}</button>
        </div>
        <div>
            <p>{result}</p>
        </div>
        </div>
    
    )
}

export default RiddlesData;