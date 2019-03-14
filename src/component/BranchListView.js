import React, { Component } from 'react';
import { Link } from "react-router-dom";

class BranchListView extends Component {
    
    constructor(props) {
        super(props)

        this.loadMore = this.loadMore.bind(this);
    }

    componentDidMount() {
        console.log("BranchListView::componentDidMount::");
    }

    loadMore() {
        this.props.onLoadMore();
    }

    render() {
        let locations = this.props.locations.map((item, index) =>
            <Link to={"/branch/" + encodeURIComponent(item.data.OFFNAME)} key={index} className="list-group-item list-group-item-action">
                <span>
                    <strong>{item.data.OFFNAME}</strong> <small>{item.data.ADDRESS} {item.data.CITY}, {item.data.STALP} {item.data.ZIP}</small>
                </span>
            </Link>
        );
        
        return (
            <div>
                {this.props.locations.length > 0 &&
                    <div className="row">
                        <div className="col">
                            <div className="list-group mt-2">
                                { locations }
                            </div>
                        </div>
                    </div>
                }
                {this.props.canLoadMore &&
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
        );
    }
}

export default BranchListView;