import React, { Component } from 'react';
import './InstitutionSearch.css';
import axios from 'axios';
import debounce from 'lodash/debounce';
import InstitutionList from './InstitutionList';

class InstitutionSearch extends Component {

    constructor(props) {
        super(props);
        this.handleSearch = this.handleSearch.bind(this);
        this.selectInstitution = this.selectInstitution.bind(this);

        this.state = { institutions: [] };

        // debounce queries on input
        this.search = debounce(this.search, 500);
    }

    handleSearch(event) {
        this.search(event.target.value + "*");
    }

    search(q) {
        axios.get(process.env.REACT_APP_API_URL + "/FdicInstitutionSearch?q=" + q + "&fields=NAME", {
            crossdomain: true,
        })
        .then(response => this.setState({"institutions": response.data.data}));
    }

    selectInstitution(value) {
        console.log("InstitutionSearch::selectInstitution", value);
        this.props.selectInstitution(value);
    }

    render() {
        console.log("InstitutionSearch::render::" + window.location.href, this.props.institution);
        return (
            <div>
                <div className="container institution-search">
                    <div className="row">
                        <div className="col">
                            <form>
                                <div className="form-group">
                                    <input type="text" placeholder="Search for financial institutions..." className="form-control" onChange={this.handleSearch}/>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <InstitutionList data={this.state.institutions} selectInstitution={this.selectInstitution} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default InstitutionSearch;