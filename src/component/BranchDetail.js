import React, { Component } from 'react';
import './BranchDetail.css';
import axios from 'axios';

class BranchDetail extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log("BranchDetail::componentDidMount", this.props);
        console.log(this.props.data.match.params.name);
        axios.get(process.env.REACT_APP_API_URL + "/FdicBranchSearch?institutionName=" + this.props.institution + "&q=" + this.props.data.match.params.name, {
            crossdomain: true,
        })
        .then(response => this.setState({"locations": response.data.data}));
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        Branch Detail
                    </div>
                </div>
            </div>
        );
    }
}

export default BranchDetail;