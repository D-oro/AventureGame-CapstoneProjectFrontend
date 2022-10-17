import React, {useState, useEffect} from 'react';
import Request from '../helpers/request';
import '../style/Room/Inventory.css'

const Inventory = () =>{

    const showInventory = () =>{
        const copyPlayerOne = {...playerOne}
        if (copyPlayerOne.potions[0] != null){
            document.getElementById("redPotion").hidden = false;
        }
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

    return (
        <div>
            <h3>
                <button className="Inventory" onClick={showInventory}>Show inventory!</button>
            </h3>
                    <button className="redPotion" id="redPotion" hidden></button>
                    <button className="bluePotion" id="bluePotion" hidden></button>
                    <button className="greenPotion" id="greenPotion" hidden></button>
                    <button className="yellowPotion" id="yellowPotion" hidden></button>
        </div>
    )
}

export default Inventory