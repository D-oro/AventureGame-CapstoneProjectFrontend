import React, {useState, useEffect} from 'react';
import Request from '../helpers/request';
import '../style/Room/Inventory.css'

const Inventory = ({updateHealth}) =>{

        const showInventory = () => {

             if (playerOne.redPotion.healingPoints !=0 ){
                document.getElementById("redPotion").hidden = false;
             }

             if (playerOne.yellowPotion.healingPoints !=0 ){
                document.getElementById("yellowPotion").hidden = false;
             }

             if (playerOne.bluePotion.healingPoints !=0 ){
                document.getElementById("bluePotion").hidden = false;
             }

             if (playerOne.greenPotion.healingPoints !=0 ){
                document.getElementById("greenPotion").hidden = false;
             }
        }

        const redClick = () =>{
            document.getElementById("redPotion").hidden = true;
            updateHealth(playerOne.redPotion.healingPoints)

            const copyPlayerOne = {...playerOne}
            copyPlayerOne.redPotion.healingPoints = 0
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

        const yellowClick = () =>{
            document.getElementById("yellowPotion").hidden = true;
            updateHealth(playerOne.yellowPotion.healingPoints)

            const copyPlayerOne = {...playerOne}
            copyPlayerOne.yellowPotion.healingPoints = 0
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

        const blueClick = () =>{
            document.getElementById("bluePotion").hidden = true;
            updateHealth(playerOne.bluePotion.healingPoints)

            const copyPlayerOne = {...playerOne}
            copyPlayerOne.bluePotion.healingPoints = 0
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

        const greenClick = () =>{
            document.getElementById("greenPotion").hidden = true;
            updateHealth(playerOne.greenPotion.healingPoints)

            const copyPlayerOne = {...playerOne}
            copyPlayerOne.greenPotion.healingPoints = 0
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

    return (
        <div>
            <h3>
                <button className="Inventory" onClick={showInventory}>Show inventory!</button>
            </h3>
                    <button className="redPotion" id="redPotion" onClick={redClick} hidden></button>
                    <button className="yellowPotion" id="yellowPotion" onClick={yellowClick} hidden></button>
                    <button className="bluePotion" id="bluePotion" onClick={blueClick} hidden ></button>
                    <button className="greenPotion" id="greenPotion" onClick={greenClick} hidden ></button>
        </div>
    )
}

export default Inventory;