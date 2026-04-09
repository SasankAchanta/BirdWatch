import React from "react";
import BirdCard from "./Cards.jsx";
import Scroll from "./Scroll.js";
import {useState} from 'react';
import question from './questionmark.png';

function Grid({newPage}){
    return(
    <div> 

        <button onClick={() => newPage('Scroll')}></button>        
    </div>
    );
}

export default Grid;