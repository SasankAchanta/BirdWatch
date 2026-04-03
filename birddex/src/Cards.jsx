  import {useState} from 'react';
  import Grid from "./Grid.js"

  function BirdCard({ BirdPic, Birdname, info, Rarity, position, newPage}) {
    //empty style object
    let style = {};
    const [showInfo, setShowInfo] = useState(false);

    if(!showInfo){
    //if main card, dont move, scale is 1, in front
    if (position === 0) style = { transform: "translateY(0px) scale(.9)", zIndex: 3, backgroundColor: "#E9D1A6", transition: "all 0.5s" };
    else if (position === 1) style = { transform: "translateY(-80px) scale(0.8)", zIndex: 1, backgroundColor: "#C5AD82", transition: "all 0.3s" };
    else if (position === -1) style = { transform: "translateY(80px) scale(0.8)", zIndex: 2, backgroundColor: "#C5AD82", transition: "all 0.3s" };
    else if (position === 2) style = { transform: "translateY(-130px) scale(0.7)", zIndex: 0, backgroundColor: "#AF976C", transition: "all 0.3s" };
    else if (position === -2) style = { transform: "translateY(130px) scale(0.7)", zIndex: 0, backgroundColor: "#AF976C", transition: "all 0.3s" };
    //other cards rendered offscreen so animation works when wrapping
    else style = { transform: "translateY(0px) scale(0.8)", zIndex: -1, backgroundColor: "#AF976C", transition: "all 0.3s"}; 
    }

    let knownbird = true;
    if(Birdname === "Unknown Bird"){
      knownbird = false;
    }

    return (
      //Bird card creator
      <div className="birdCard" style={style}>

      <div className="top">
        <img className="BirdPic" src={BirdPic} alt="BIRD PIC" />
        <div className = "TitleBox">
          <h2 className="cardTitle">{Birdname}<br/><br/>Rarity: {Rarity}</h2>
        </div>
      </div>



        <div className="infoBox">
          <p className="Info">{info}</p>
          {knownbird && <button className="readMore" onClick={() => newPage('Grid')}>Read More</button>}
        </div>
        
      </div>
    ); 
  }

  export default BirdCard;