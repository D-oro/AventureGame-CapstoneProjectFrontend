import React, {useState, useEffect} from 'react';
import Request from '../helpers/request';
import '../style/Room/Treasure.css'

// button, updates weapon on backend

const Treasure = () =>{

   

    const [playerOne, setPlayerOne] = useState(null);
    

        useEffect(() => {
            const request = new Request()
            request.get("/api/players")
            .then((data) => {
            setPlayerOne(data[0]);
            })   
        }, [])

        const openTreasure = () => {
        
            const treasure = document.getElementById("treasure-popup");
            treasure.classList.toggle("show")
            const copyPlayerOne = {...playerOne}
            const request = new Request()
            copyPlayerOne.gold += 100
            
            
            request.put("/api/players", copyPlayerOne)
            .then((res) => {
                return res.json()
            })
            .then((data) =>{
                console.log(data)
            })
    
            setPlayerOne(copyPlayerOne)
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