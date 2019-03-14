import React, { Component } from 'react';
import debounce from 'lodash/debounce';

class BranchSearch extends Component {

    constructor(props) {
        super(props);
        this.handleSearch = this.handleSearch.bind(this);

        // debounce queries on input
        this.search = debounce(this.search, 500);
    }

    handleSearch(event) {
        this.search(event.target.value + "*");
    }

    search(q) {
        this.props.onSearch(q);
    }

    render() {
        return (
            <div className="row mt-4">
                <div className="col">
                    <form>
                        <div className="form-group">
                            <input type="text" placeholder={"Search for " + this.props.institution + " branch locations..."} className="form-control" onChange={this.handleSearch}/>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default BranchSearch;