import React, { Component } from 'react';
import './BranchDetail.css';
import axios from 'axios';
import BranchDetailLine from './BranchDetailLine';

class BranchDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            branch : {}
        }
    }

    componentDidMount() {
        console.log("BranchDetail::componentDidMount", this.props);
        console.log(this.props.data.match.params.name);
        axios.get(process.env.REACT_APP_API_URL + "/FdicBranchSearch?institutionName=" + this.props.institution + "&q=" + this.props.data.match.params.name, {
            crossdomain: true,
        })
        .then(response => {
            this.setState({"branch": response.data.data[0].data})
        });
    }

    render() {
        // let details = Object.keys(this.state.branch).map(function(key) {
        //     if (this && this.state.branch[key]) {
        //         <BranchDetailLine name={key} value={this.state.branch[key]} key={key} />
        //     }
        // });

        let details = Object.keys(this.state.branch).map((key, index) => 
            <BranchDetailLine name={key} value={this.state.branch[key]} key={key} />
        );

        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h3>Branch Detail</h3>
                        { details }
                    </div>
                    <div className="col">
                        <h3>Notes</h3>
                    </div>
                </div>
            </div>
        );
    }
}

export default BranchDetail;