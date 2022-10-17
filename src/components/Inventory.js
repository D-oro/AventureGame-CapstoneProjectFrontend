import React, {useState, useEffect} from 'react';
import Request from '../helpers/request';
import '../style/Room/Inventory.css'

const Inventory = ({updateHealth}) =>{

        const showInventory = () => {

            const allPotionsNames = potions.map((potion) => {
                return (potion.name)
            })

             if (allPotionsNames.includes("Love Potion")){
                document.getElementById("redPotion").hidden = false;
             }

             if (allPotionsNames.includes("Yellow Potion")){
                document.getElementById("yellowPotion").hidden = false;
             }

             if (allPotionsNames.includes("Blue Potion")){
                document.getElementById("bluePotion").hidden = false;
             }

             if (allPotionsNames.includes("Green Potion")){
                document.getElementById("greenPotion").hidden = false;
             }
        }

        const redClick = () =>{
            document.getElementById("redPotion").hidden = true;
            updateHealth(20)
            const request = new Request()
            request.delete(`/api/potions/${1}`)
        }

        const yellowClick = () =>{
            document.getElementById("yellowPotion").hidden = true;
            updateHealth(30)
            const request = new Request()
            request.delete(`/api/potions/${2}`)
        }

        const blueClick = () =>{
            document.getElementById("bluePotion").hidden = true;
            updateHealth(40)
            const request = new Request()
            request.delete(`/api/potions/${3}`)
        }

        const greenClick = () =>{
            document.getElementById("greenPotion").hidden = true;
            updateHealth(50)
            const request = new Request()
            request.delete(`/api/potions/${4}`)
        }

    const [potions, setPotions] = useState(null);

    useEffect(() => {
        const request = new Request()
        request.get("/api/potions")
        .then((data) => {
        setPotions(data);
        })   
    }, [])

    if(!potions){
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