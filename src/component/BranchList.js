import React, { Component } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import Loading from './Loading';

class BranchList extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            totalLocations: 0,
            currentOffset: 0,
            locations: []
        }
        this.loadMore = this.loadMore.bind(this);
    }

    getData = (institution, offset) => {
        console.log("BranchList::getData::" + window.location.href, institution);
        axios.get(process.env.REACT_APP_API_URL + "/FdicBranchSearch?institutionName=" + institution + "&fields=NAME,OFFNAME,ADDRESS,CITY,STALP,ZIP&offset=" + offset, {
            crossdomain: true,
        }).then(response => {
            let locations = this.state.locations;
            response.data.data.forEach(element => {
                locations.push(element);
            });
            this.setState({"locations": locations, totalLocations: response.data.meta.total, currentOffset: parseInt(response.data.meta.parameters.offset)});
        });
    }

    componentDidMount() {
        console.log("BranchList::componentDidMount::" + window.location.href, this.props.institution);
        this.getData(this.props.institution, 0);
    }

    // componentWillReceiveProps(props) {
    //     console.log("BranchList::componentWillReceiveProps::" + window.location.href, props.institution);
    //     this.getData(props.institution, 0);
    // }

    loadMore() {
        console.log("Load more locations");
        this.getData(this.props.institution, this.state.currentOffset + 10);
    }


    render() {
        let locations = this.state.locations.map((item) =>
            <Link to={"/branch/" + encodeURIComponent(item.data.OFFNAME)} key={item.data.OFFNAME} className="list-group-item list-group-item-action">
                <span>
                    <strong>{item.data.OFFNAME}</strong> <small>{item.data.ADDRESS} {item.data.CITY}, {item.data.STALP} {item.data.ZIP}</small>
                </span>
            </Link>
        );
        let canLoadMore = this.state.totalLocations > (10 + this.state.currentOffset);
        
        return (
            <div>
                <div className="container">
                    <div>
                        {locations.length === 0 && 
                            <div className="mt-2">
                                <Loading message="Loading branch locations"/>
                            </div>
                        }
                        {locations.length > 0 && 
                            <div className="list-group mt-2">
                                { locations }
                            </div>
                        }
                        {canLoadMore &&
                            <div className="row mt-2">
                                <div className="col">
                                    <hr/>
                                </div> 
                                <div className="col-2 text-center">
                                    <button className="btn btn-light" onClick={this.loadMore}>Load More</button>
                                </div>
                                <div className="col">
                                    <hr/>
                                </div> 
                            </div>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default BranchList;