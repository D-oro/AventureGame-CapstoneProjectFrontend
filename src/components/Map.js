import { useNavigate } from 'react-router';
import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {Link} from 'react-router-dom';
import '../style/map/Map.css'

function Map (){

//Ladder in third row  
    const useLadder3 = () => {
      if(document.getElementById("Right3").checked == true){
          document.getElementById("Right4").checked = true;
          document.getElementById("Right3").checked = false;

          document.getElementById("Right3").disabled = true;
          document.getElementById("MidRight3").disabled = true;
          document.getElementById("MidLeft3").disabled = true;
          document.getElementById("Left3").disabled = true;
          }
      else{window.alert("I can only go up")}
    }

  // Ladder in second row
    const useLadder2 = () => {
      if(document.getElementById("MidLeft2").checked == true){
          document.getElementById("MidLeft3").checked = true;
          document.getElementById("MidLeft2").checked = false;

          document.getElementById("Right2").disabled = true;
          document.getElementById("MidRight2").disabled = true;
          document.getElementById("MidLeft2").disabled = true;
          document.getElementById("Left2").disabled = true;
          }
      if(document.getElementById("Left2").checked == true){
          window.alert("I can only go up")
          document.getElementById("Left2").checked = false;
          document.getElementById("MidLeft3").checked = true;

          document.getElementById("Right2").disabled = true;
          document.getElementById("MidRight2").disabled = true;
          document.getElementById("MidLeft2").disabled = true;
          document.getElementById("Left2").disabled = true;
        } 
      else{window.alert("I can only go up")}
    }

// Ladder in first row
    const useLadder1 = () => {
      if(document.getElementById("MidLeft1").checked == true){
          document.getElementById("MidLeft2").checked = true;
          document.getElementById("MidLeft1").checked = false;

          document.getElementById("Right1").disabled = true;
          document.getElementById("MidRight1").disabled = true;
          document.getElementById("MidLeft1").disabled = true;
          document.getElementById("Left1").disabled = true;
          }
      if(document.getElementById("MidRight1").checked == true){
          window.alert("I can only go up")
          document.getElementById("MidLeft2").checked = true;
          document.getElementById("MidRight1").checked = false;

          document.getElementById("Right1").disabled = true;
          document.getElementById("MidRight1").disabled = true;
          document.getElementById("MidLeft1").disabled = true;
          document.getElementById("Left1").disabled = true;
        } 
      else{window.alert("I can only go up")}
    }

    const navigate = useNavigate()

    const clickDoor1 = () => {
      navigate('/room')
    }

    const clickDoor2 = () => {
      navigate('/room2')
    }

    const clickDoor3 = () => {
      navigate('/room3')
    }

    const clickDoor4 = () => {
      navigate('/room4')
    }

    const clickDoor5 = () => {
      navigate('/room5')
    }

    const startGame = () => {
      document.getElementById("Left1").checked = true;
    }

  return (
    <div className="App">
      <header className="App-header">

{/* first row from the top */}
        <div className="radioRow4">

{/* Gate */}
          <button className="gate" onClick={clickDoor5}></button>

          <input type="radio" id="Left4" name="Row4" value="Left4"></input>
          <label for="Left4">Left4</label>

          <input type="radio" id="MidLeft4" name="Row4" value="MidLeft4"></input>
          <label for="MidLeft4">MidLeft4</label>

          <input type="radio" id="MidRight4" name="Row4" value="MidRight4"></input>
          <label for="MidRight4">MidRight4</label>

          <input type="radio" id="Right4" name="Row4" value="Right4"></input>
          <label for="Right4">Right4</label>
        </div>

{/* Floor */}
        <div className="floor"></div>

{/* second row from the top */}
        <div className="radioRow3">
          <input type="radio" id="Left3" name="Row3" value="Left3"></input>
          <label for="Left3">Left3</label>

{/* Door*/}
          <button className="door" onClick={clickDoor4}></button>

          <input type="radio" id="MidLeft3" name="Row3" value="MidLeft3"></input>
          <label for="MidLeft3">MidLeft3</label>

{/* Door*/}
          <button className="door" onClick={clickDoor3}></button>

          <input type="radio" id="MidRight3" name="Row3" value="MidRight3"></input>
          <label for="MidRight3">MidRight3</label>

          <input type="radio" id="Right3" name="Row3" value="Right3"></input>
          <label for="Right3">Right3</label>

{/* Ladder */}
          <button className="ladder" onClick={useLadder3}></button>
        </div>
{/* Floor */}
        <div className="floor"></div>

{/* third row from the top */}
        <div className="radioRow2">
{/* Door*/}
          <button className="door" onClick={clickDoor2}></button>

          <input type="radio" id="Left2" name="Row2" value="Left2"></input>
          <label for="Left2">Left2</label>

          {/* Button, looks like a ladder */}
          <button className="ladder" onClick={useLadder2}></button>

          <input type="radio" id="MidLeft2" name="Row2" value="MidLeft2"></input>
          <label for="MidLeft2">MidLeft2</label>

          <input type="radio" id="MidRight2" name="Row2" value="MidRight2"></input>
          <label for="MidRight2">MidRight2</label>

          <input type="radio" id="Right2" name="Row2" value="Right2"></input>
          <label for="Right2">Right2</label>
        </div>

{/* Floor */}
        <div className="floor"></div>

{/* fourth row from the top */}
        <div className="radioRow1">

          <button className="sign" onClick={startGame}></button>

          <input type="radio" id="Left1" name="Row1" value="Left1"></input>
          <label for="Left1">Left1</label>

          <input type="radio" id="MidLeft1" name="Row1" value="MidLeft1"></input>
          <label for="MidLeft1">MidLeft1</label>

{/* Ladder */}
          <button className="ladder" onClick={useLadder1}></button>

          <input type="radio" id="MidRight1" name="Row1" value="MidRight1"></input>
          <label for="MidRight1">MidRight1</label>

          <input type="radio" id="Right1" name="Row1" value="Right1"></input>
          <label for="Right1">Right1</label>

{/* Door */}
          <button className="door" onClick={clickDoor1}></button>
        </div>

{/* Floor */}
        <div className="floor"></div>

      </header>
    </div>
  );
}

            {/* <button>
                <Link to="/room">To the room!</Link>
            </button> */} 

export default Map