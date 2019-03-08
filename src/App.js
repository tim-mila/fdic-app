import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import './App.css';
import Header from './component/Header';
import InstitutionSearch from './component/InstitutionSearch';
import BranchList from './component/BranchList';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import BranchDetail from './component/BranchDetail';

class App extends Component {

  constructor(props) {
    super(props); 
    this.state = {
      data: false,
      institution: ''
    };
    this.selectInstitution = this.selectInstitution.bind(this);
  }
  
  componentDidMount() {
    this.hydrateStateWithLocalStorage();

    // add event listener to save state to localStorage
    // when user leaves/refreshes the page
    // window.addEventListener(
      // "beforeunload",
      // this.saveStateToLocalStorage.bind(this)
    // );
  }

  selectInstitution(value) {
    this.setState({institution: value}, this.saveStateToLocalStorage);
  }

  hydrateStateWithLocalStorage() {
    // for all items in state
    for (let key in this.state) {
      // if the key exists in localStorage
      if (localStorage.hasOwnProperty(key)) {
        // get the key's value from localStorage
        let value = localStorage.getItem(key);
        console.log("App::hydrateStateWithLocalStorage " + key, value);

        // parse the localStorage string and setState
        try {
          value = JSON.parse(value);
          this.setState({ [key]: value });
        } catch (e) {
          // handle empty string
          this.setState({ [key]: value });
        }
      }
    }
    this.setState({data: true}, function() {console.log(this.state);});
  }

  saveStateToLocalStorage() {
    // for every item in React state
    for (let key in this.state) {
      console.log("save to local storage " + key, this.state[key]);
      // save to localStorage
      localStorage.setItem(key, JSON.stringify(this.state[key]));
    }
  }


  render() {

    // Short-cicuit rendering while we wait for hydration to complete
    if (!this.state.data) {
      return  <Header />
    }

    return (
      <div>

        {/* Navigation */}
        <Header institution={this.state.institution} />

        {/* Conditional display of institution selection */}
        {this.state.institution === '' &&
          <InstitutionSearch selectInstitution={this.selectInstitution} />
        }

        {/* Conditional display of branch locations */}
        {this.state.institution !== '' &&
          <Switch>            
            <Route path="/location/:name"  render={props => <BranchDetail institution={this.state.institution} data={props}/>}  />
            <Route path="/" render={props => <BranchList institution={this.state.institution}/>} />
            {/* <Route path="/location/:name(*)" render={props => <BranchDetail {...props} />} /> */}
          </Switch>
        }
      </div>
    )
  }
}

export default App;
