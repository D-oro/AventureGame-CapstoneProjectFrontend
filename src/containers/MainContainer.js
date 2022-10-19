import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Map from "../components/Map";
import Room from "../components/Room";
import ErrorPage from '../components/ErrorPage';
import HomePage from '../components/HomePage';
import RiddlesData from '../components/RiddlesData';
import FinalBoss from '../components/FinalBoss';
import Room2 from '../components/Room2';
import Room3 from '../components/Room3';


const MainContainer = () => {

    return(
        <div>
            <Router>
                <Routes>
                    <Route path="/" element={<HomePage/>} />
                    <Route path="/Map" element={<Map/>} />
                    <Route path="/Room" element={<Room/>} />
                    <Route path="/FinalBoss" element={<FinalBoss/>}/>
                    <Route path="/Room2" element={<Room2 />} />
                    <Route path="/Room3" element = {<Room3 />}/>
                    <Route path="/Riddles" element={<RiddlesData/>} />
                    <Route path="*" element={<ErrorPage />} />
                </Routes>
            </Router>
        </div>

    )
}

export default MainContainer;