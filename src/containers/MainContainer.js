import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Map from "../components/Map";
import Room from "../components/Room";
import ErrorPage from '../components/ErrorPage';

const MainContainer = () => {

    return(
        <div>
            <Router>
                <Routes>
                    <Route path="/Map" element={<Map/>} />
                    <Route path="/Room" element={<Room/>} />
                    <Route path="*" element={<ErrorPage />} />
                </Routes>
            </Router>
        </div>

    )
}

export default MainContainer;