import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from '../src/components/Home';

ReactDOM.render(

	<Router>
	  <App>
		  <Route exact path='/' component={Home}/>
	  </App>
	</Router>

,document.getElementById('root'));