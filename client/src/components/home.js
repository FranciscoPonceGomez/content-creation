import React from "react";
import ReactDOM from "react-dom";
import backgroundGif from "../img/fortnite.mp4";
import {StyledButton, ButtonGroup, StyledButtonSecondary} from './ui/button';
import posed from 'react-pose';
import './styles.css';
import Timer from './timer';

const { isOpen } = true;
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
    console.log(this.state);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    let payload = {}

    for (let name of data.keys()) {
      if (name !== 'undefined') {
        payload[name] = data.get(name);
      }
    }
    console.log(payload);

    fetch('http://localhost:5000/predict', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({game_state: payload}),
    })
    .then((data) => data.json())
    .then((res) => this.setState({ data: res.data }));;
    console.log(this.state.data);
  }

  componentDidMount() {
    setTimeout(this.toggle(), 1000);
  }

  toggle() {
    console.log(this.state.isOpen);
    // this.setState({ isOpen: !this.state.isOpen });
    this.state.isOpen = !this.state.isOpen;
    console.log(this.state.isOpen);
  }

  render() {
    const { isOpen } = this.state;
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
            {/* <form method='POST' action='/predict'> */}
            <form onSubmit={this.handleSubmit}>
              <p>Kills</p>
	            <input type='text' placeholder='Kills' name='kills' defaultValue='0'/>
              <p>Remaining players</p>
	            <input type='text' placeholder='Players' name='players' defaultValue='100'/>
              <p>Time</p>
	            <input type='text' placeholder='time' name='time' defaultValue='15:00'/>
              {/* <Timer></Timer> */}
	            <StyledButton>Send data</StyledButton>
	          </form>
         </div>
      </div>
      
          <video autoPlay loop muted inline height="100%" width="100%">
              <source src={backgroundGif} type="video/mp4"></source>
          </video>
      <Sidebar className="sidebar" pose={isOpen ? 'open' : 'closed'}>
        <Item className="item">Hello</Item>
        <Item className="item" />
        <Item className="item" />
      </Sidebar>
    </div> 
  }
}

var mountNode = document.getElementById("app");
ReactDOM.render(<Home/>, mountNode);