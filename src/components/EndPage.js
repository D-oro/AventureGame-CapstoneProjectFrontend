import React, {useState, useEffect} from 'react';
import Request from '../helpers/request';
import { useNavigate } from 'react-router';
import '../style/EndPage.css'
// import endmusic from "../sounds/happy_adventure.wav"

const EndPage = () =>{

    const navigate = useNavigate()

    const handleMapClick = () =>{
        // endSound.pause()
        navigate('/map')
    }

    const handleResultsClick = () =>{
        document.getElementById("results").hidden=false;
        // endSound.play()
    }

    // const endSound = new Audio(
    //     endmusic
    // )

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
    <div className="end-page">

        <header className="header-text">
            Well played! You are a true adventurer!
        </header>

        <main>
            <button className="results-button" onClick={handleResultsClick}>Your results:</button>
            <div className="results" id="results" hidden>
                <table>
                    <tr>
                        <td className="player"></td>
                        <td>{playerOne.name}</td>
                    </tr>
                    <tr>
                        <td className="goldcoin"></td>
                        <td>{playerOne.gold} gold collected</td>
                    </tr>
                    <tr>
                        <td className="riddler"></td>
                        <td>1 riddle solved</td>
                    </tr>
                    <tr>
                    <td className="foe"></td>
                        <td>4 foes defeated</td>
                    </tr>
                </table>
            </div>
        </main>

        <footer className="footer-text">
            <button className="start-game" onClick={handleMapClick}>Play again!</button>
            <div className="credits">This super cool game was our big final project during the 16 week intensive coding bootcamp at Codeclan in Glasgow. 
            Big thanks to all of the amazing instructors for your support, wit, and kindness. You are amazing!
            </div>
        </footer>
    </div>
)

}

export default EndPage;