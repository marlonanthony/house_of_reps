import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom' 

import AppNavbar from './components/layout/AppNavbar'
import Landing from './components/layout/Landing'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Footer from './components/layout/Footer'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <AppNavbar />
          <Route exact path='/' component={ Landing } />
          <div className='container'>
            <Route exact path='/register' component={ Register } />
            <Route exact path='/login' component={ Login } />
          </div>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
