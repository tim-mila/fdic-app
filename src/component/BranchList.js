import React, { Component } from 'react';
import './BranchList.css';
import axios from 'axios';
import { Link } from "react-router-dom";

class BranchList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            locations: []
        }
    }

    getData = (institution) => {
        console.log("BranchList::getData::" + window.location.href, institution);
        axios.get(process.env.REACT_APP_API_URL + "/FdicBranchSearch?institutionName=" + institution + "&fields=NAME,OFFNAME,ADDRESS,CITY,STALP,ZIP", {
            crossdomain: true,
        })
        .then(response => this.setState({"locations": response.data.data}));
    }

    componentDidMount() {
        console.log("BranchList::componentDidMount::" + window.location.href, this.props.institution);
        this.getData(this.props.institution);
    }

    componentWillReceiveProps(props) {
        console.log("BranchList::componentWillReceiveProps::" + window.location.href, props.institution);
        this.getData(props.institution);
    }

    render() {
        console.log("BranchList::render::" + window.location.href, this.props.institution);
        let locations = this.state.locations.map((item) =>
            <Link to={"/branch/" + encodeURIComponent(item.data.OFFNAME)} key={item.data.OFFNAME} className="list-group-item list-group-item-action">
                <span>
                    <strong>{item.data.OFFNAME}</strong> <small>{item.data.ADDRESS} {item.data.CITY}, {item.data.STALP} {item.data.ZIP}</small>
                </span>
            </Link>
        );
        return (
            <div>
                <div className="container">
                    <div>
                        <div className="list-group">
                            { locations }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default BranchList;