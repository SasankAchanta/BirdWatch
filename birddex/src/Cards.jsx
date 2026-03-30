function BirdCard({ BirdPic, Birdname, info, position }) {
  //empty style object
  let style = {};

  //if main card, dont move, scale is 1, in front
  if (position === 0) style = { transform: "translateY(0px) scale(1)", zIndex: 3, backgroundColor: "#A88D79", transition: "all 0.3s" };
  //if card is below main card move down, make smaller and change color
  else if (position === 1) style = { transform: "translateY(100px) scale(0.8)", zIndex: 1, backgroundColor: "#6C5544", transition: "all 0.3s" };
  //if card is above main card move up, make smaller and change color
  else if (position === -1) style = { transform: "translateY(-100px) scale(0.8)", zIndex: 2, backgroundColor: "#6C5544", transition: "all 0.3s" };
  //other cards rendered offscreen so animation works when wrapping
  else style = { transform: "translateY(75px) scale(0.8)", zIndex: 0, backgroundColor: "#6C5544"}; 

  function Showinfo() {
    //example popup for button press to show info
    alert("This is a " + info);
  }

  return (
    //Bird card creator
    <div className="birdCard" style={style}>
      <img className="BirdPic" src={BirdPic} alt="BIRD PIC" />
      <h2 className="card-Title">{Birdname}</h2>
      <p className="info">{info}</p>
      <button onClick={Showinfo}>Info</button>
    </div>
  );
}

export default BirdCard;