import Request from '../helpers/request';
import {useEffect, useState} from 'react';
import { useNavigate } from 'react-router';
import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {Link} from 'react-router-dom';
import '../style/map/Map.css'
import ambient from "../sounds/dungeon_ambient.ogg"

function Map (){

  const enableLevel4 = () =>{
    document.getElementById("Right4").disabled = false;
    document.getElementById("MidRightRight4").disabled = false;
    document.getElementById("MidMidRight4").disabled = false;
    document.getElementById("MidRight4").disabled = false;
    document.getElementById("MidLeft4").disabled = false;
    document.getElementById("Left4").disabled = false;
  }

  const enableLevel3 = () =>{
    document.getElementById("Right3").disabled = false;
    document.getElementById("MidRightRight3").disabled = false;
    document.getElementById("MidMidRight3").disabled = false;
    document.getElementById("MidRight3").disabled = false;
    document.getElementById("MidLeft3").disabled = false;
    document.getElementById("Left3").disabled = false;
  }

  const enableLevel2 = () =>{
    document.getElementById("Right2").disabled = false;
    document.getElementById("MidRightRight2").disabled = false;
    document.getElementById("MidMidRight2").disabled = false;
    document.getElementById("MidRight2").disabled = false;
    document.getElementById("MidLeft2").disabled = false;
    document.getElementById("Left2").disabled = false;
  }

  const enableLevel1 = () =>{
    document.getElementById("Right1").disabled = false;
    document.getElementById("MidRightRight1").disabled = false;
    document.getElementById("MidMidRight1").disabled = false;
    document.getElementById("MidRight1").disabled = false;
    document.getElementById("MidLeft1").disabled = false;
    document.getElementById("Left1").disabled = false;
  }

  const disableLevel4 = () =>{
    document.getElementById("Right4").disabled = true;
    document.getElementById("MidRightRight4").disabled = true;
    document.getElementById("MidMidRight4").disabled = true;
    document.getElementById("MidRight4").disabled = true;
    document.getElementById("MidLeft4").disabled = true;
    document.getElementById("Left4").disabled = true;
  }

  const disableLevel3 = () =>{
    document.getElementById("Right3").disabled = true;
    document.getElementById("MidRightRight3").disabled = true;
    document.getElementById("MidMidRight3").disabled = true;
    document.getElementById("MidRight3").disabled = true;
    document.getElementById("MidLeft3").disabled = true;
    document.getElementById("Left3").disabled = true;
  }

  const disableLevel2 = () =>{
    document.getElementById("Right2").disabled = true;
    document.getElementById("MidRightRight2").disabled = true;
    document.getElementById("MidMidRight2").disabled = true;
    document.getElementById("MidRight2").disabled = true;
    document.getElementById("MidLeft2").disabled = true;
    document.getElementById("Left2").disabled = true;
  }

  const disableLevel1 = () =>{
    document.getElementById("Right1").disabled = true;
    document.getElementById("MidRightRight1").disabled = true;
    document.getElementById("MidMidRight1").disabled = true;
    document.getElementById("MidRight1").disabled = true;
    document.getElementById("MidLeft1").disabled = true;
    document.getElementById("Left1").disabled = true;
  }

//Ladder in third row  
    const useLadder3 = () => {
      enableLevel4();
      if(document.getElementById("Right3").checked === true){
          document.getElementById("Right4").checked = true;
          document.getElementById("Right3").checked = false;
          disableLevel3()
          }
      else{console.log("click start")}
    }

  // Ladder in second row
    const useLadder2 = () => {
      enableLevel3();
      if(document.getElementById("MidLeft2").checked === true){
          document.getElementById("MidLeft3").checked = true;
          document.getElementById("MidLeft2").checked = false;
          disableLevel2()
          }
      if(document.getElementById("Left2").checked === true){
          console.log("click start")
          document.getElementById("Left2").checked = false;
          document.getElementById("MidLeft3").checked = true;
          disableLevel2()
        } 
      else{console.log("click start")}
    }

// Ladder in first row
    const useLadder1 = () => {
      enableLevel2();
      if(document.getElementById("MidLeft1").checked === true){
          document.getElementById("MidLeft2").checked = true;
          document.getElementById("MidLeft1").checked = false;
          disableLevel1()
          }
      if(document.getElementById("MidRight1").checked === true){
          console.log("click start")
          document.getElementById("MidLeft2").checked = true;
          document.getElementById("MidRight1").checked = false;
          disableLevel1()
        } 
      else{console.log("click start")}
    }

    const navigate = useNavigate()

    const goToFinalBoss = () => {
      ambientSound.pause()
      navigate('/finalboss')
    }

    const goToRoom3 = () => {
      ambientSound.pause()
      navigate('/room3')
    }

    const goToRoom2 = () => {
      ambientSound.pause()
      navigate('/room2')
    }

    const goToRiddles = () => {
      ambientSound.pause()
      navigate('/riddles')
    }

    const goToRoom = () => {
      ambientSound.pause()
      navigate('/room')
    }

    const ambientSound = new Audio(
      ambient
    );

    const startGame = () => {
      ambientSound.play()
      if (playerOne.level === 1){
      enableLevel1();
      document.getElementById("Left1").checked = true;
      disableLevel2();
      disableLevel3();
      disableLevel4();
      }
      if (playerOne.level === 2){
      enableLevel1();  
      enableLevel2();
      document.getElementById("Right1").checked = true;
      disableLevel3();
      disableLevel4();
      }
      if (playerOne.level === 3){
      enableLevel1();  
      enableLevel2();
      enableLevel3();
      document.getElementById("Left2").checked = true;
      disableLevel4();
      }
      if (playerOne.level === 4){
      enableLevel1();  
      enableLevel2();
      enableLevel3();  
      document.getElementById("MidLeft3").checked = true;
      }
      if (playerOne.level === 5){
      enableLevel1();  
      enableLevel2();
      enableLevel3();  
      enableLevel4();
      document.getElementById("MidLeft3").checked = true;
        }
      else (console.log(playerOne.level))
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
    <div className="App">
        <header className="towertop"></header>
        <main className="brick-map">

{/* Level 4 */}
        <div className="radioRow4">

          {/* Gate */}
          <button className="gate" onClick={goToFinalBoss}></button>

          <input type="radio" id="Left4" name="Row4" value="Left4" disabled></input>
          <label for="Left4"></label>

          <input type="radio" id="MidLeft4" name="Row4" value="MidLeft4" disabled></input>
          <label for="MidLeft4"></label>

          <input type="radio" id="MidRight4" name="Row4" value="MidRight4" disabled></input>
          <label for="MidRight4"></label>

          <input type="radio" id="MidMidRight4" name="Row4" value="MidMidRight4" disabled></input>
          <label for="MidMidRight4"></label>

          <input type="radio" id="MidRightRight4" name="Row4" value="MidRightRight4" disabled></input>
          <label for="MidRightRight4"></label>

          <input type="radio" id="Right4" name="Row4" value="Right4" disabled></input>
          <label for="Right4"></label>
        </div>

          {/* Floor */}
          <div className="floor"></div>

{/* Level 3*/}
        <div className="radioRow3">
          <input type="radio" id="Left3" name="Row3" value="Left3" disabled></input>
          <label for="Left3"></label>

          {/* Door*/}
          <button className="door" onClick={goToRoom3}></button>

          <input type="radio" id="MidLeft3" name="Row3" value="MidLeft3" disabled></input>
          <label for="MidLeft3"></label>

          {/* Door*/}
          <button className="door" onClick={goToRoom2}></button>

          <input type="radio" id="MidRight3" name="Row3" value="MidRight3" disabled></input>
          <label for="MidRight3"></label>

          <input type="radio" id="MidMidRight3" name="Row3" value="MidMidRight3" disabled></input>
          <label for="MidMidRight3"></label>

          <input type="radio" id="MidRightRight3" name="Row3" value="MidRightRight3" disabled></input>
          <label for="MidRightRight3"></label>

          <input type="radio" id="Right3" name="Row3" value="Right3" disabled></input>
          <label for="Right3"></label>

          {/* Ladder */}
          <button className="ladder" id="ladder3" onClick={useLadder3}></button>
        </div>

          {/* Floor */}
          <div className="floor"></div>

{/* Level 2 */}
        <div className="radioRow2">
          {/* Door*/}
          <button className="door" onClick={goToRiddles}></button>

          <input type="radio" id="Left2" name="Row2" value="Left2" disabled></input>
          <label for="Left2"></label>

          {/* Ladder */}
          <button className="ladder" id="ladder2" onClick={useLadder2}></button>

          <input type="radio" id="MidLeft2" name="Row2" value="MidLeft2" disabled></input>
          <label for="MidLeft2"></label>

          <input type="radio" id="MidRight2" name="Row2" value="MidRight2" disabled></input>
          <label for="MidRight2"></label>

          <input type="radio" id="MidMidRight2" name="Row2" value="MidMidRight2" disabled></input>
          <label for="MidMidRight2"></label>

          <input type="radio" id="MidRightRight2" name="Row2" value="MidRightRight2" disabled></input>
          <label for="MidRightRight2"></label>

          <input type="radio" id="Right2" name="Row2" value="Right2" disabled></input>
          <label for="Right2"></label>
        </div>

          {/* Floor */}
          <div className="floor"></div>

{/* Level 1 */}
        <div className="radioRow1">

          <button className="summon" onClick={startGame}>summon player</button>

          <input type="radio" id="Left1" name="Row1" value="Left1" disabled></input>
          <label for="Left1"></label>

          <input type="radio" id="MidLeft1" name="Row1" value="MidLeft1" disabled></input>
          <label for="MidLeft1"></label>

          {/* Ladder */}
          <button className="ladder" id="ladder1" onClick={useLadder1}></button>

          <input type="radio" id="MidRight1" name="Row1" value="MidRight1" disabled></input>
          <label for="MidRight1"></label>

          <input type="radio" id="MidMidRight1" name="Row1" value="MidMidRight1" disabled></input>
          <label for="MidMidRight1"></label>

          <input type="radio" id="MidRightRight1" name="Row1" value="MidRightRight1" disabled></input>
          <label for="MidRightRight1"></label>

          <input type="radio" id="Right1" name="Row1" value="Right1" disabled></input>
          <label for="Right1"></label>

          {/* Door */}
          <button className="door" onClick={goToRoom}></button>
        </div>

          {/* Floor */}
          <div className="floor"></div>
          </main>
    </div>
  );
}

export default Map