import React, { Component } from 'react';
import Home from './page/home';
import Login from "./page/login";
import Password from './page/password';
import Product from './page/product';
import Regis from './page/regis';
import { BrowserRouter as Router } from 'react-router-dom';
import Body from './template/body';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    return ( 
      <Router> 
      <Body></Body>
      </Router>
     );
  }
}
 
export default App;