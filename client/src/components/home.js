import React from "react";
import ReactDOM from "react-dom";
import backgroundGif from "../img/fortnite.mp4";
import {StyledButton, ButtonGroup, StyledButtonSecondary} from './ui/button';
import Timer from './timer';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {};
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    let payload = {}

    // const form = event.target;
    // const data = new FormData(form);
    // console.log(data);
    // for (let name of data.keys()) {
    //   const input = form.elements[name];
    //   const parserName = input.dataset.parse;
    //   console.log('parser name is', parserName);
    //   if (parserName) {
    //     const parsedValue = inputParsers[parserName](data.get(name))
    //     data.set(name, parsedValue);
    //   }
    // }
    
    // this.setState({
    // 	res: JSON.stringify(data),
    //   invalid: false,
    //   displayErrors: false,
    // });

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
        // 'Access-Control-Allow-Origin':'*',
        // 'Content-Type': 'multipart/form-data'
      },
      body: JSON.stringify({game_state: payload}),
    })
    .then((data) => data.json())
    .then((res) => this.setState({ data: res.data }));;
    console.log(this.state.data);
  }

  // handleSubmit = async e => {
  //   e.preventDefault();
  //   const response = await fetch('/predict', {
  //     method: 'POST',
  //     mode: 'cors',
  //     headers: {
  //       // 'Content-Type': 'application/json',
  //       'Access-Control-Allow-Origin':'*',
  //       'Content-Type': 'multipart/form-data'
  //     },
  //     body: JSON.stringify({ post: this.state.post }),
  //   });
  //   const body = await response.text();
    
  //   this.setState({ responseToPost: body });
  // };

  // async handleSubmit(e) {
  //     e.preventDefault();
  //     const response = await fetch('/predict', {
  //     method: 'POST',
  //     mode: 'cors',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       // 'Access-Control-Allow-Origin':'*',
  //       // 'Content-Type': 'multipart/form-data',
  //     },
  //     body: JSON.stringify({ post: this.state.post }),
  //   });
  //   const body = await response.text();
    
  //   this.setState({ responseToPost: body });
  // };

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

    </div> 
  }
}

var mountNode = document.getElementById("app");
ReactDOM.render(<Home/>, mountNode);