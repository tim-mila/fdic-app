import React, { Component } from 'react';
import axios from 'axios';
import BranchSearch from './BranchSearch';
import BranchListView from './BranchListView';
import Loading from './Loading';

class BranchView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            institution: props.institution,
            locations: [],
            totalLocations: 0,
            currentOffset: 0,
            terms: "",
            loading: false
        }

        this.onSearch = this.onSearch.bind(this);
        this.onLoadMore = this.onLoadMore.bind(this);
    }

    componentDidMount() {
        this.getData(true, 0, "");
    };

    onSearch(q) {
        this.getData(true, 0, q);
    };

    onLoadMore() {
        this.getData(false, this.state.currentOffset + 10, this.state.terms);
    };

    getData = (reset, offset, q) => {
        console.log("BranchView::getData::" + this.state.institution, reset);

        let url = process.env.REACT_APP_API_URL + "/FdicBranchSearch?institutionName=" + this.state.institution + "&fields=NAME,OFFNAME,ADDRESS,CITY,STALP,ZIP&offset=" + offset;
        if (q !== "") {
            url += "&q=" + q;
        }

        if (reset) {
            this.setState({loading: true});
        }
        
        axios.get(url, {
            crossdomain: true,
        }).then(response => {
            if (reset) {
                this.setState({loading: false, locations: response.data.data, totalLocations: response.data.meta.total, currentOffset: parseInt(response.data.meta.parameters.offset), terms: q});
            }
            else {
                let locations = this.state.locations;
                response.data.data.forEach(element => {
                    locations.push(element);
                });
                this.setState({loading: false, locations: locations, totalLocations: response.data.meta.total, currentOffset: parseInt(response.data.meta.parameters.offset), terms: q});
            }
        });
    };

    render() {
        let canLoadMore = this.state.totalLocations > (10 + this.state.currentOffset);
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <BranchSearch institution={this.state.institution} onSearch={this.onSearch} />
                    </div>
                </div>
                {this.state.loading && 
                    <div className="mt-2">
                        <Loading message="Loading branch locations"/>
                    </div>
                }
                {!this.state.loading && 
                    <div className="row">
                        <div className="col">
                            <BranchListView locations={this.state.locations} canLoadMore={canLoadMore} onLoadMore={this.onLoadMore} />
                        </div>
                    </div>
                }
            </div>
            
            
                
        );
    }
}

export default BranchView;