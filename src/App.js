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
    this.selectInstitution = this.selectInstitution.bind(this);
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

  selectInstitution(value) {
    console.log("App::selectInstitution", value);
    this.setState({institution: value});
  }

  render() {
    return (
      <div>
        {this.state.institution === '' &&
          <div className="row">
              <div className="col">
                  <InstitutionSearch selectInstitution={this.selectInstitution} />
              </div>
          </div>
        }
        {this.state.institution !== '' &&
          <div className="alert alert-success">{this.state.institution}</div>
        }
      </div>
    )
  }
}

export default App;
