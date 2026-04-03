import React from "react";
import {useState} from 'react';
import Scroll from "./Scroll.js";
import Grid from "./Grid.js"

function App() {
  const [Cpage, NewCPage] = useState('Scroll');

  return (
    <div className="App">
      {Cpage === 'Scroll' && <Scroll newPage={NewCPage}/>}
      {Cpage === 'Grid' && <Grid newPage={NewCPage}/>}
    </div>
  );
}

export default App;