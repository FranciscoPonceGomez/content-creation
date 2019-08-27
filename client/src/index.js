import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//Views
import Home from './components/Home';

ReactDOM.render(

	<Router>
	  <App>
		  <Route exact path='/' component={Home}/>
	  </App>
	</Router>

,document.getElementById('root'));