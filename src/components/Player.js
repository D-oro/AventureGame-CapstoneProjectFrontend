import './App.css';
import React, {useEffect, useState} from 'react';
import Request from './helpers/request';

function App() {

  // const levelUp = () =>{
  //   const copyPlayerOne = {...playerOne}
  //   copyPlayerOne.level += 1
  //   const request = new Request()
  //   request.put("/api/players", copyPlayerOne)
  //   .then((res) => {
  //       return res.json()
  //   })
  //   .then((data) =>{
  //       console.log(data)
  //   })
  //   setPlayerOne(copyPlayerOne)
  // }

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
