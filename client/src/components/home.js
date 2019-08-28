import React from "react";
import ReactDOM from "react-dom";
import backgroundGif from "../img/fortnite.mp4";
import {StyledButton, ButtonGroup, StyledButtonSecondary} from './ui/button';
import Timer from './timer';

class Home extends React.Component {
  render() {
    return <div style={{display: 'flex', justifyContent: 'center'}}>
      <div>
          {/* <ButtonGroup>
                <p>Kills</p>
                <StyledButton
                  style={{ marginRight: '1.7em' }}
                  // onClick={onFindWord}
                >
                  +
                </StyledButton>
                <input>
                  4
                </input>
                <StyledButtonSecondary
                  style={{ marginLeft: '1.7em' }}
                  // onClick={onReset}
                >
                  -
                </StyledButtonSecondary>
          </ButtonGroup>
          <ButtonGroup>
                <StyledButton
                  style={{ marginRight: '1.7em' }}
                  // onClick={onFindWord}
                >
                  +
                </StyledButton>
                <input>
                  4
                </input>
                <StyledButtonSecondary
                  style={{ marginLeft: '1.7em' }}
                  // onClick={onReset}
                >
                  -
                </StyledButtonSecondary>
          </ButtonGroup>
          <ButtonGroup>
                <StyledButton
                  style={{ marginRight: '1.7em' }}
                  // onClick={onFindWord}
                >
                  +
                </StyledButton>
                <div>
                  4
                </div>
                <StyledButtonSecondary
                  style={{ marginLeft: '1.7em' }}
                  // onClick={onReset}
                >
                  -
                </StyledButtonSecondary>
          </ButtonGroup> */}
          <div className='gameState'>
	          <form method='POST' action='/predict'>
              <p>Kills</p>
	            <input type='text' placeholder='Kills' name='kills' defaultValue='0'/>
              <p>Remaining players</p>
	            <input type='text' placeholder='Players' name='players' defaultValue='0'/>
              <p>time</p>
	            <input type='text' placeholder='time' name='time' defaultValue='15:00'/>
              {/* <Timer></Timer> */}
	            <StyledButton>Send data</StyledButton>
	          </form>
         </div>
      </div>
      
          <video autoPlay loop muted inline height="100%" width="100%">
              <source src={backgroundGif} type="video/mp4"></source>
          </video>

    </div> 
  }
}

var mountNode = document.getElementById("app");
ReactDOM.render(<Home/>, mountNode);