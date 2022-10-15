import React, {useState, useEffect} from 'react';
import Request from '../helpers/request';
import '../style/Room/Treasure.css'

// button, updates weapon on backend

const Treasure = () =>{

    const openTreasure = () => {
        const treasure = document.getElementById("treasure-popup");
        treasure.classList.toggle("show")

        const copyPlayerOne = {...playerOne}
        copyPlayerOne.weapon.name = "Axe"
        copyPlayerOne.weapon.attackPoints = 25
        const request = new Request()
        request.put("/api/players", copyPlayerOne)
        .then((res) => {
            return res.json()
        })
        .then((data) =>{
            console.log(data)
        })

        setPlayerOne(copyPlayerOne)
    }

    const [playerOne, setPlayerOne] = useState(null);

        useEffect(() => {
            const request = new Request()
            request.get("/api/players")
            .then((data) => {
            setPlayerOne(data[0]);
            })   
        }, [])

        if(!playerOne){
            return "Loading..."
           }

    return(
        <div>   
            <div className="treasure" onClick={openTreasure}>
                <span className="treasuretext" id="treasure-popup"></span>
            </div>
        </div>
    )
}

export default Treasure