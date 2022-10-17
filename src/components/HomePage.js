import '../style/home_page/HomePage.css'
import { useNavigate } from 'react-router';
import React from 'react';
import Narrator from './Narrator';
import { useState } from 'react';

const HomePage = () =>{

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
                narratorMessage || `Welcome! This is a super cool game! Made by Aimee, Doro and Johnny`
            }/>
        </header>

        <main>
            <button className="start-game" onClick={handleClick}>To the game!</button>
        </main>

        <footer className="footer-text">
            so cool!
        </footer>
    </div>
)

}

export default HomePage;