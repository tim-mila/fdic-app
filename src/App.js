import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import './App.css';
import './component/InstitutionSearch';
import InstitutionSearch from './component/InstitutionSearch';

class App extends Component {

  constructor(props) {
    super(props); 
    this.state = {
      institution: ''
    };
  }

  componentDidMount() {
    this.hydrateStateWithLocalStorage();

    // // add event listener to save state to localStorage
    // // when user leaves/refreshes the page
    // window.addEventListener(
    //   "beforeunload",
    //   this.saveStateToLocalStorage.bind(this)
    // );

    console.log("Hello App Component");
  }

  hydrateStateWithLocalStorage() {
    // for all items in state
    for (let key in this.state) {
      // if the key exists in localStorage
      if (localStorage.hasOwnProperty(key)) {
        // get the key's value from localStorage
        let value = localStorage.getItem(key);

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
  }

  render() {
    return (
      <div className="container">
          <div className="row">
              <div className="col">
                  <InstitutionSearch/>
              </div>
          </div>
      </div>
    )
  }
}

export default App;
