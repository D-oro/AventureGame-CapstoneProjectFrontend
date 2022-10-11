import './App.css';
import React, {useEffect, useState} from 'react';
import Request from './helpers/request';

function App() {
   const [players, setPlayers] = useState([]);

   useEffect(() => {

    const request = new Request()
    request.get("/api/players")
    .then((data) => {
      console.log(data)
      setPlayers(data);
    })   
  }, [])


  const allHealthPoints = players.map((player, index) =>{
    return <li key={index}>
      {player.healthPoints}
    </li>
  })

  return (
    <div>
        {allHealthPoints}
    </div>
  )
  
}

export default App;
