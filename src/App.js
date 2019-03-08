import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import './App.css';
import InstitutionSearch from './component/InstitutionSearch';
import BranchList from './component/BranchList';

class App extends Component {

  constructor(props) {
    super(props); 
    this.state = {
      institution: ''
    };
    this.selectInstitution = this.selectInstitution.bind(this);
  }
  
  componentDidMount() {
    this.hydrateStateWithLocalStorage();

    // add event listener to save state to localStorage
    // when user leaves/refreshes the page
    window.addEventListener(
      "beforeunload",
      this.saveStateToLocalStorage.bind(this)
    );
  }

  selectInstitution(value) {
    console.log("App::selectInstitution", value);
    this.setState({institution: value}, this.saveStateToLocalStorage);
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

        {/* Navigation */}
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
              </li>
              {this.state.institution !== '' &&
                  <span className="nav-link disabled"><li>Selected: <strong>{this.state.institution}</strong></li></span>
              }
            </ul>
          </div>
        </nav>

        {/* Conditional display of institution selection or branch location lookup */}
        {this.state.institution === '' &&
          <div className="row">
              <div className="col">
                  <InstitutionSearch selectInstitution={this.selectInstitution} />
              </div>
          </div>
        }
        {this.state.institution !== '' &&
          <BranchList institution={this.state.institution} />
        }
      </div>
    )
  }
}

export default App;
