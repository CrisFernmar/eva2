
import {NavLink} from 'react-router-dom';
import React from 'react';
import { useParams } from 'react-router-dom';

const URL = () => {
    const { id } = useParams(); 
    return (
        <div>
            <h2>{id}</h2>
        </div>
    );
}

export default URL;