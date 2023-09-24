import React, { useState } from "react";
import CurrentLocation from "./currentLocation";
import "./App.css";

function App() {
  const [searchedCity, setSearchedCity] = useState("");

  return (
    <React.Fragment>
      <div className="container">
        <CurrentLocation searchedCity={searchedCity}/>
      </div>
    
    </React.Fragment>
  );
}

export default App;
