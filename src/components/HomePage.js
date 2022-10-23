import '../style/home_page/HomePage.css'
import { useNavigate } from 'react-router';
import React, {useState, useEffect} from 'react';
import Request from '../helpers/request';

const HomePage = () =>{

    const navigate = useNavigate()

    const handleClick = () =>{
        navigate('/map')
    }

    const[userName, setUserName] = useState("")

    const handleItemInput = (event) => {
        setUserName(event.target.value);
      }  

    const saveUserName = (event) => {
        event.preventDefault();

        const copyPlayerOne = {...playerOne}
        copyPlayerOne.name = userName
        const request = new Request()
        request.put("/api/players", copyPlayerOne)
        .then((res) => {
            return res.json()
        })
        .then((data) =>{
            console.log(data)
        })
        setPlayerOne(copyPlayerOne)
        setUserName("")
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

return(
    <div className="home-page">

        <header className="header-text">
            Welcome! This is a super cool game! Made by Aimee, Doro and Johnny
        </header>

        <main className="main-body">
            <form className="form" onSubmit={saveUserName}>
                <label htmlFor="username">Your name:</label>
                <input type="text" name="username" className="nameinput" placeholder="cookie monster" value={userName} onChange={handleItemInput}></input>
                <button className="name-button" type="submit">save</button>
            </form>

            <button className="start-game" onClick={handleClick}>To the game!</button>
        </main>

        <footer className="footer-text">
            so cool!
        </footer>
    </div>
)

}

export default HomePage;