function BirdCard({ BirdPic, Birdname, info, Rare, position }) {
  //empty style object
  let style = {};

  //if main card, dont move, scale is 1, in front
  if (position === 0) style = { transform: "translateY(0px) scale(1)", zIndex: 3, backgroundColor: "#E9D1A6", transition: "all 0.3s" };
  //if card is below main card move down, make smaller and change color
  else if (position === 1) style = { transform: "translateY(80px) scale(0.9)", zIndex: 1, backgroundColor: "#C5AD82", transition: "all 0.3s" };
  //if card is above main card move up, make smaller and change color
  else if (position === -1) style = { transform: "translateY(-80px) scale(0.9)", zIndex: 2, backgroundColor: "#C5AD82", transition: "all 0.3s" };
  //if card is 2 away below its smaller and further
  else if (position === 2) style = { transform: "translateY(130px) scale(0.8)", zIndex: 0, backgroundColor: "#AF976C", transition: "all 0.3s" };
  //if card is 2 away above its smaller and further
  else if (position === -2) style = { transform: "translateY(-130px) scale(0.8)", zIndex: 0, backgroundColor: "#AF976C", transition: "all 0.3s" };
  //other cards rendered offscreen so animation works when wrapping
  else style = { transform: "translateY(0px) scale(0.8)", zIndex: 0, backgroundColor: "#AF976C"}; 

  function Showinfo() {
    //example popup for button press to show info
    alert("This is a " + info);
  }

  return (
    //Bird card creator
    <div className="birdCard" style={style}>
      <img className="BirdPic" src={BirdPic} alt="BIRD PIC" />
      <div className="infoBox">
        <p className="Info">{info}</p>
      </div>
      <div className = "TitleBox">
        <h2 className="cardTitle">{Birdname}<br/>
        Rarity: {Rare}</h2>
      </div>
      


    </div>
  );
  //<button className="Button" onClick={Showinfo}>Read More</button>
 
}

export default BirdCard;