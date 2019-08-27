import React from "react";
import ReactDOM from "react-dom";
import backgroundGif from "../img/fortnite.mp4";

class Home extends React.Component {
  render() {
    return <div style={{display: 'flex', justifyContent: 'center'}}>
          <video autoPlay loop muted inline height="100%" width="100%">
              <source src={backgroundGif} type="video/mp4"></source>
          </video>
    </div> 
  }
}

var mountNode = document.getElementById("app");
ReactDOM.render(<Home/>, mountNode);