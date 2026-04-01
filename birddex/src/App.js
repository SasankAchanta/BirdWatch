import './App.css';
import { useState } from 'react';
import BirdCard from './Cards.jsx';
  
import americanGoldfinch from './american goldfinch.png';
import barnOwl from './barn owl.png';
import CBE from './carmine bee eater.png';
import question from './questionmark.png';

function App(){ 
//Bird array
const birds = [
    { BirdPic: americanGoldfinch, Birdname: "American Goldfinch",  Rare: "Common",
       info: "The American goldfinch (Spinus tristis) is a small North American bird in the finch family. It is migratory, ranging from mid-Alberta to North Carolina during the breeding season, and from just south of the Canada–United States border to Mexico during the winter..."},
    { BirdPic: barnOwl, Birdname: "Barn Owl", info: "White Owl", Rare: "Uncommon" },
    { BirdPic: CBE, Birdname: "Carmine Bee Eater", info: "Red Birb", Rare: "Common" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rare: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rare: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rare: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rare: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rare: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rare: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rare: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rare: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rare: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rare: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rare: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rare: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rare: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rare: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rare: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rare: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rare: "?" },
    { BirdPic: question, Birdname: "Unknown Bird", info: "What is this?", Rare: "?" }
];

//sets index values to 0
const [Index, NewIndex] = useState(0);

  //calculates the next card based on current position
  const getPosition = (index, current, total) => {
    let diff = index - current;

    if (diff > total / 2){
      diff -= total;
    }
    if (diff < -total / 2){
      diff += total;
    }

    return diff;
  };

  //scroll
  let wheelDist = 0;
  const scrollWheel = (e) => {
    wheelDist += e.deltaY;
    //if the mouse wheel is scrolled up scroll the cards up 
    if(wheelDist <= -70) {
      //add 1 to index then mod by length of birds, returns to first card once lenght is reached 
      NewIndex((Index + 1) % birds.length); 
      wheelDist = 0;
    } 
    //if the mouse wheel is scrolled down scroll the cards down else 
    if(wheelDist >= 70){ 
      //subtract 1 from index then mod by length of birds, returns to first card once lenght is reached 
      NewIndex((Index - 1 + birds.length) % birds.length); 
      wheelDist = 0;
    }
  };


  return (
    //div that handels scroll 
    <div className="CardContainer" onWheel={scrollWheel}>
      
      {birds.map((bird, index) => {  //loop through the birds array and make a card for each one

        //find how far the card is from the current index, 0 = current, 1 = above, -1 = below, all others are hidden
        const position = getPosition(index, Index, birds.length);

        //doesnet render cards if they are more than 2 cards away from current index
        if(Math.abs(position) > 3){
          return null;
        }

        return (
          //card maker for each bird, key used to keep track of each card, position also given 
          <BirdCard
            key={index}
            BirdPic={bird.BirdPic}
            Birdname={bird.Birdname}
            info={bird.info}
            Rare={bird.Rare}
            position={position}
          />
        );
      })}

    </div>
  );
}

export default App;