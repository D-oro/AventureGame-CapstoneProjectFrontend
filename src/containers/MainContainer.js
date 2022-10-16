import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Map from "../components/Map";
import Room from "../components/Room";
import Room2 from "../components/Room2";
import Room3 from "../components/Room3";
import Room4 from "../components/Room4";
import Room5 from "../components/Room5";
import ErrorPage from '../components/ErrorPage';
import HomePage from '../components/HomePage';


const MainContainer = () => {

    return(
        <div>
            <Router>
                <Routes>
                    <Route path="/" element={<HomePage/>} />
                    <Route path="/Map" element={<Map/>} />
                    <Route path="/Room" element={<Room/>} />
                    <Route path="/Room2" element={<Room2/>} />
                    <Route path="/Room3" element={<Room3/>} />
                    <Route path="/Room4" element={<Room4/>} />
                    <Route path="/Room5" element={<Room5/>} />
                    <Route path="*" element={<ErrorPage />} />
                </Routes>
            </Router>
        </div>

    )
}

export default MainContainer;