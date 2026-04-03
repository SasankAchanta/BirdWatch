import {useState} from 'react';

function BirdCard({ BirdPic, Birdname, info, Rarity, position}) {
  //empty style object
  let style = {};
  const [showInfo, setShowInfo] = useState(false);

  if(!showInfo){
  //if main card, dont move, scale is 1, in front
  if (position === 0) style = { transform: "translateY(0px) scale(1)", zIndex: 3, backgroundColor: "#E9D1A6", transition: "all 0.5s" };
  else if (position === 1) style = { transform: "translateY(-80px) scale(0.9)", zIndex: 1, backgroundColor: "#C5AD82", transition: "all 0.3s" };
  else if (position === -1) style = { transform: "translateY(80px) scale(0.9)", zIndex: 2, backgroundColor: "#C5AD82", transition: "all 0.3s" };
  else if (position === 2) style = { transform: "translateY(-130px) scale(0.8)", zIndex: 0, backgroundColor: "#AF976C", transition: "all 0.3s" };
  else if (position === -2) style = { transform: "translateY(130px) scale(0.8)", zIndex: 0, backgroundColor: "#AF976C", transition: "all 0.3s" };
  //other cards rendered offscreen so animation works when wrapping
  else style = { transform: "translateY(0px) scale(0.8)", zIndex: -1, backgroundColor: "#AF976C", transition: "all 0.3s"}; 
  }
  return (
    //Bird card creator + info card
    <div className="birdCard" style={style}>
      <img className="BirdPic" src={BirdPic} alt="BIRD PIC" />
      <div className="infoBox">
        <p className="Info">{info}</p>
        <button className="readMore" onClick={() => setShowInfo(true)}>Read More</button>
      </div>
      <div className = "TitleBox">
        <h2 className="cardTitle">{Birdname}<br/>
        <br/>
        Rarity: {Rarity}</h2>
      </div>
      {showInfo && <div className="infoPopUP">
        <button className="BackButton" onClick={() => setShowInfo(false)}> BACK </button>
        <p className="CardInfo">{info}</p>
        </div>}    
    </div>
  ); 
}

export default BirdCard;