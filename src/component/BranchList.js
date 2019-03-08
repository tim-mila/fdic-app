import React, { Component } from 'react';
import './BranchList.css';
import axios from 'axios';

class BranchList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            institution : this.props.institution,
            locations: []
        }
    }

    componentDidMount() {
        console.log("BranchList::componentDidMount");
        axios.get(process.env.REACT_APP_API_URL + "/FdicBranchSearch?institutionName=" + this.state.institution + "&fields=NAME,OFFNAME,ADDRESS,CITY,STALP,ZIP", {
            crossdomain: true,
        })
        .then(response => this.setState({"locations": response.data.data}));
    }

    render() {
        let locations = this.state.locations.map((item, index) => 
            <a href="#" className="list-group-item list-group-item-action" key={item.data.OFFNAME}><strong>{item.data.OFFNAME}</strong> <small>{item.data.ADDRESS} {item.data.CITY}, {item.data.STALP} {item.data.ZIP}</small></a>
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