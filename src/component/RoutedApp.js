import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import InstitutionSearch from './InstitutionSearch';
import BranchView from './BranchView';
import BranchDetail from './BranchDetail';
import Header from './Header';

class RoutedApp extends Component {

    constructor(props) {
        super(props); 
        this.selectInstitution = this.selectInstitution.bind(this);
    }

    selectInstitution(value) {
        this.props.selectInstitution(value);    
    }

    componentWillReceiveProps(props) {
        console.log("RoutedApp::componentWillReceiveProps", props);
    }

    render() {
        return (
            <div>
                <Router>
                    <div>
                        <Header institution={this.props.institution} />
                        { this.props.institution !== '' && <Redirect to='/locations' push/> }
                        <Route path="/branch/:name" render={props => <BranchDetail institution={this.props.institution} data={props} /> }  />
                        <Route path="/locations" render={props => <BranchView institution={this.props.institution}/> }  />
                        <Route path="/" exact render={props => <InstitutionSearch selectInstitution={this.selectInstitution} institution={this.props.institution} />} />
                    </div>
                </Router>
            </div>
        );
    }
}

export default RoutedApp;