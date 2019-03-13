import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import './App.css';
import RoutedApp from './component/RoutedApp';

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
    return (
      <div>
        {this.state.data && 
          <RoutedApp institution={this.state.institution} selectInstitution={this.selectInstitution} />
        }
      </div>
    )
  }
}

export default App;
