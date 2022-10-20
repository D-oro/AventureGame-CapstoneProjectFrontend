import '../style/home_page/HomePage.css'
import { useNavigate } from 'react-router';
import React from 'react';
import Narrator from './Narrator';
import { useState } from 'react';

const EndPage = () =>{

    const [narratorMessage, setNarratorMessage] = useState('');
    const navigate = useNavigate()

    const handleClick = () =>{
        navigate('/map')
    }

return(
    <div className="home-page">

        <header className="header-text">
            <Narrator 
            message={
                narratorMessage || `Congtatulations, you won!`
            }/>
        </header>

        <main>
            <button className="start-game" onClick={handleClick}>Play again!</button>
        </main>

        <footer className="footer-text">
            Sometimes you win, sometimes you lose...
        </footer>
    </div>
)

}

export default EndPage;