import React, { Component } from 'react';
import './BranchList.css';
import axios from 'axios';
import { BrowserRouter as Router, Link } from "react-router-dom";

class BranchList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            locations: []
        }
    }

    componentDidMount() {
        axios.get(process.env.REACT_APP_API_URL + "/FdicBranchSearch?institutionName=" + this.props.institution + "&fields=NAME,OFFNAME,ADDRESS,CITY,STALP,ZIP", {
            crossdomain: true,
        })
        .then(response => this.setState({"locations": response.data.data}));
    }

    render() {
        let locations = this.state.locations.map((item, index) =>
            <Link to={"/location/" + encodeURIComponent(item.data.OFFNAME)} key={item.data.OFFNAME} className="list-group-item list-group-item-action">
                <strong>{item.data.OFFNAME}</strong> <small>{item.data.ADDRESS} {item.data.CITY}, {item.data.STALP} {item.data.ZIP}</small>
            </Link>
            // <Link to={{ pathname: "/location", search: "?name="+item.data.OFFNAME }} key={item.data.OFFNAME} className="list-group-item list-group-item-action">
            //     <strong>{item.data.OFFNAME}</strong> <small>{item.data.ADDRESS} {item.data.CITY}, {item.data.STALP} {item.data.ZIP}</small>              
            // </Link>
        );
        return (
            <div className="container">
                <div>
                    <div className="list-group">
                        { locations }
                    </div>
                </div>
            </div>
        );
    }
}

export default BranchList;