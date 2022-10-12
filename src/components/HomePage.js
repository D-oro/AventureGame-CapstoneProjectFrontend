import '../style/home_page/HomePage.css'
import { useNavigate } from 'react-router';
import React from 'react';

const HomePage = () =>{

    const navigate = useNavigate()

    const handleClick = () =>{
        navigate('/map')
    }

return(
    <div className="home-page">
        <header>
        Welcome! This is a super cool game!

        </header>

        <main>
            <button className="start-game" onClick={handleClick}>To the game!</button>
        </main>

        <footer>
            so cool!
        </footer>
    </div>
)

}

export default HomePage;