import React, { Component } from 'react';
import axios from 'axios';
import {Route, NavLink} from 'react-router-dom';

import './App.css';
import SmurfForm from './components/SmurfForm';
import Smurfs from './components/Smurfs';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smurfs: [],
    };
  }

  load = data => {
    this.setState({smurfs: data})
  }

  componentDidMount() {
    axios.get("http://localhost:3333/smurfs")
      .then(res => this.load(res.data))
      .catch(err => console.log(err))
  }

  postSmurf = smurf => {
    axios.post("http://localhost:3333/smurfs", smurf)
      .then(res => this.load(res.data))
      .catch(err => console.log(err))
  }

  deleteSmurf = id => {
    axios.delete(`http://localhost:3333/smurfs/${id}`)
      .then(res => this.load(res.data))
      .catch(err => console.log(err))
  }

  updateSmurf = smurf => {
    axios.put(`http://localhost:3333/smurfs/${smurf.id}`, smurf)
      .then(res => this.load(res.data))
      .catch(err => console.log(err))
  }

  render() {
    return (
      <div className="App">
        <div className="nav-bar">
          <NavLink exact to="/" activeClassName="activeNavLink">Home</NavLink>
          <NavLink to="/smurf-form" activeClassName="activeNavLink">Add Smurfs</NavLink>
        </div>

        <Route exact path="/" render={props => <Smurfs {...props} smurfs={this.state.smurfs} deleteSmurf={this.deleteSmurf}/>} />
        <Route path="/smurf-form" render={props => <SmurfForm {...props} postSmurf={this.postSmurf} />} />
      </div>
    );
  }
}

export default App;
