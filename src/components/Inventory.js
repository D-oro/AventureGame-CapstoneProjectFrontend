import React, {useState, useEffect} from 'react';
import Request from '../helpers/request';
import '../style/Room/Inventory.css'

const Inventory = () =>{

        const checkPotionNames = () => {

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
                <button className="Inventory" onClick={checkPotionNames}>Show inventory!</button>
            </h3>
                    <button className="redPotion" id="redPotion" hidden></button>
                    <button className="bluePotion" id="bluePotion" hidden></button>
                    <button className="greenPotion" id="greenPotion" hidden></button>
                    <button className="yellowPotion" id="yellowPotion" hidden></button>
        </div>
    )
}

export default Inventory;