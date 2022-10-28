import React, {useState, useEffect} from 'react';
import Request from '../helpers/request';
import '../style/Room/Inventory.css'

const Inventory = ({updateHealth}) =>{

        const showInventory = () => {

             if (redPotion.healingPoints !==0 ){
                document.getElementById("redPotion").hidden = false;
             }

             if (yellowPotion.healingPoints !==0 ){
                document.getElementById("yellowPotion").hidden = false;
             }

             if (bluePotion.healingPoints !==0 ){
                document.getElementById("bluePotion").hidden = false;
             }

             if (greenPotion.healingPoints !==0 ){
                document.getElementById("greenPotion").hidden = false;
             }
        }

        const redClick = () =>{
            document.getElementById("redPotion").hidden = true;
            updateHealth(playerOne.redPotion.healingPoints)

            const copyRedPotion = {...redPotion}
            copyRedPotion.healingPoints = 0
            const request = new Request()
            request.put("/api/redpotions", copyRedPotion)
            .then((res) => {
                return res.json()
            })
            .then((data) =>{
                console.log(data)
            })
            setRedPotion(copyRedPotion)
        }

        const yellowClick = () =>{
            document.getElementById("yellowPotion").hidden = true;
            updateHealth(playerOne.yellowPotion.healingPoints)

            const copyYellowPotion = {...yellowPotion}
            copyYellowPotion.healingPoints = 0
            const request = new Request()
            request.put("/api/yellowpotions", copyYellowPotion)
            .then((res) => {
                return res.json()
            })
            .then((data) =>{
                console.log(data)
            })
            setYellowPotion(copyYellowPotion)
        }

        const blueClick = () =>{
            document.getElementById("bluePotion").hidden = true;
            updateHealth(playerOne.bluePotion.healingPoints)

            const copyBluePotion = {...bluePotion}
            copyBluePotion.healingPoints = 0
            const request = new Request()
            request.put("/api/bluepotions", copyBluePotion)
            .then((res) => {
                return res.json()
            })
            .then((data) =>{
                console.log(data)
            })
            setBluePotion(copyBluePotion)
        }

        const greenClick = () =>{
            document.getElementById("greenPotion").hidden = true;
            updateHealth(playerOne.greenPotion.healingPoints)

            const copyGreenPotion = {...greenPotion}
            copyGreenPotion.healingPoints = 0
            const request = new Request()
            request.put("/api/greenpotions", copyGreenPotion)
            .then((res) => {
                return res.json()
            })
            .then((data) =>{
                console.log(data)
            })
            setGreenPotion(copyGreenPotion)
        }

        const [playerOne, setPlayerOne] = useState(null);
        const [redPotion, setRedPotion] = useState(null);
        const [yellowPotion, setYellowPotion] = useState(null);
        const [bluePotion, setBluePotion] = useState(null);
        const [greenPotion, setGreenPotion] = useState(null);

        useEffect(() => {
            const request = new Request()
            request.get("/api/players")
            .then((data) => {
            setPlayerOne(data[0]);
            })   
        }, [])

        useEffect(() => {
            const request = new Request()
            request.get("/api/redpotions")
            .then((data) => {
            setRedPotion(data[0]);
            })   
        }, [])

        useEffect(() => {
            const request = new Request()
            request.get("/api/yellowpotions")
            .then((data) => {
            setYellowPotion(data[0]);
            })   
        }, [])

        useEffect(() => {
            const request = new Request()
            request.get("/api/bluepotions")
            .then((data) => {
            setBluePotion(data[0]);
            })   
        }, [])

        useEffect(() => {
            const request = new Request()
            request.get("/api/greenpotions")
            .then((data) => {
            setGreenPotion(data[0]);
            })   
        }, [])

        if(!playerOne){
            return "Loading..."
           }

        if(!redPotion){
            return "Loading..."
           }

        if(!yellowPotion){
            return "Loading..."
           }

        if(!bluePotion){
            return "Loading..."
           }

        if(!greenPotion){
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