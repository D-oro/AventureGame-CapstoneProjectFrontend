import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Map from "../components/Map";
import Room from "../components/Room";
import ErrorPage from '../components/ErrorPage';
import HomePage from '../components/HomePage';
import RiddlesData from '../components/RiddlesData';


const MainContainer = () => {

    return(
        <div>
            <Router>
                <Routes>
                    <Route path="/" element={<HomePage/>} />
                    <Route path="/Map" element={<Map/>} />
                    <Route path="/Room" element={<Room/>} />
                    <Route path="/Riddles" element={<RiddlesData/>} />
                    <Route path="*" element={<ErrorPage />} />
                    <Route path="/Riddles" element={<RiddlesData/>}/>
                </Routes>
            </Router>
        </div>

    )
}

export default MainContainer;