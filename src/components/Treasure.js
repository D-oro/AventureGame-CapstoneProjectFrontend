import React, {useState, useEffect} from 'react';
import Request from '../helpers/request';
import '../style/Room/Treasure.css'
import coins from "../sounds/coins.wav"

// button, updates gold on backend and in state

const Treasure = ({updateGold}) =>{

    const [playerOne, setPlayerOne] = useState(null);
    
        useEffect(() => {
            const request = new Request()
            request.get("/api/players")
            .then((data) => {
            setPlayerOne(data[0]);
            })   
        }, [])

        const coinSound = new Audio(
            coins
        )

        const openTreasure = () => {
            coinSound.play()
            const treasure = document.getElementById("treasure-popup");
            treasure.classList.toggle("show")
            const copyPlayerOne = {...playerOne}
            updateGold(100)
            .then(() => {
                setPlayerOne(copyPlayerOne)})
            .then(() => {
                const copyPlayerOne = {...playerOne}
                const request = new Request()
                request.put("/api/players", copyPlayerOne)})
            .then((res) => {
                    return res.json()
                })
                .then((data) =>{
                    console.log(data)
                })
        }

        if(!playerOne){
            return "Loading..."
           }

    return(
        <div>   
            <div className="treasure" id="treasure" onClick={openTreasure}>
                <span className="treasuretext" id="treasure-popup"></span>
            </div>        
        </div>
    )
}

export default Treasure