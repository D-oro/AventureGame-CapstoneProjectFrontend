import React from 'react';
import {Link} from 'react-router-dom';

function Map (){

    return (
        <div>
            <button>
                <Link to="/room">To the room!</Link>
            </button>
        </div>
    )
}

export default Map