import React from "react";
import ReactDOM from "react-dom";
import backgroundGif from "../img/tfue.mp4";
import {StyledButton, ButtonGroup, StyledButtonSecondary} from './ui/button';
import posed from 'react-pose';
import './styles.css';
import Timer from './timer';

const Sidebar = posed.ul({
open: {
x: '0%',
delayChildren: 200,
staggerChildren: 50,
opacity: 1
},
closed: { x: '0%', delay: 300, opacity: 0}
});
const Item = posed.li({
open: { y: 0, opacity: 1 },
closed: { y: 20, opacity: 0 }
});


class Home extends React.Component{
  constructor() {
    super();
    this.state = {isOpen: false};
    // console.log(this.state);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.generateGameState = this.generateGameState.bind(this);
    this.viaForm = false;
  }

  handleSubmit(event) {
    let data;
    let payload = {};
    event.preventDefault();

    if(this.viaForm) {
      data = new FormData(event.target);
    }
    else {
      data = this.generateGameState(this.state);
    }

    console.log(data);
    for (let name of data.keys()) {
      if (name !== 'undefined') {
        payload[name] = data.get(name);
      }
    }

    fetch('http://localhost:5000/predict', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({game_state: payload}),
    })
    .then((res) => res.json())
    .then((data) => this.setState({challenges: data.challenges, challengeReceived: true}));
  }

  componentDidMount() {
    setTimeout(this.toggle(), 1000);
  }

  toggle() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  sendData(data) {
    console.log(data);
    let payload = {};
    // for (let name of data.keys()) {
    //   if (name !== 'undefined') {
    //     payload[name] = data.get(name);
    //   }
    // }

    fetch('http://localhost:5000/predict', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({game_state: payload}),
    })
    .then((res) => res.json())
    .then((data) => this.setState({challenges: data.challenges, challengeReceived: true}));
  }

  generateGameState(state) {
    // seconds = this.props.seconds;
    console.log(state);
    // this.sendData(state);
    switch(state) {
      case 800:
        break;
      case 700:
        break;
      default:
          this.sendData({
          "time": state.seconds,
          "kills": 20,
          "players": 80,
          "vehicle": false,
          })
    }
  }

  render() {
    const { isOpen } = this.state;
    let challenges;
    // console.log(this.state);
    if (this.state.challengeReceived) {
      console.log(this.state);
      challenges = 
      <Sidebar className="sidebar" pose={isOpen ? 'open' : 'closed'}>
        <Item className="item">
          {this.state.challenges[0]}
        </Item>
      </Sidebar>
      }
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
            <form onSubmit={this.handleSubmit}>
              <p>Kills</p>
	            <input type='text' placeholder='Kills' name='kills' defaultValue='0'/>
              <p>Remaining players</p>
	            <input type='text' placeholder='Players' name='players' defaultValue='100'/>
              <p>Time</p>
	            <input type='text' placeholder='time' name='time' defaultValue='15:00'/>
              <Timer sendSeconds={this.generateGameState}></Timer>
	            <StyledButton>Send data</StyledButton>
	          </form>
         </div>
      </div>
      
          <video autoPlay loop muted inline height="100%" width="100%">
              <source src={backgroundGif} type="video/mp4"></source>
          </video>
          {challenges}
    </div> 
  }
}

var mountNode = document.getElementById("app");
ReactDOM.render(<Home/>, mountNode);