import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Request from "../helpers/request";

function RiddlesData(){
    const [riddlesOne, setRiddlesOne] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        const request = new Request()
        request.get("/api/riddles")
        .then((data) => {
            console.log(data)
            setRiddlesOne(data);
        })
    }, [])

    const questionOne = riddlesOne.map((riddleOne, index) => {
        return  <div key={index}> {riddleOne.question}</div>

    })

    const answers = riddlesOne.map((riddleOne, index) => {
        return <div key={index}>
            <button>{riddleOne.correctAnswer}</button>
            <button>{riddleOne.wrongAnswerOne}</button>
            <button>{riddleOne.wrongAnswerTwo}</button>
            <button>{riddleOne.wrongAnswerThree}</button>
        </div>
    })

    // const onCorrectAnswerClick = () => {
    //     if (riddlesOne.correctAnswer === riddlesOne.correctAnswer){
    //         return <p>Correct!</p>
    //     }else{
    //     return <p>You lose!</p>
    // }
    // }


    return(
        
        <div>
        {questionOne}
        <li>{answers}</li>
        </div>
    
    )
}

export default RiddlesData