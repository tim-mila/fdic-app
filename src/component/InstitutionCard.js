import React, { Component } from 'react';
import './InstitutionCard.css';

class InstitutionCard extends Component {

    constructor(props) {
        super(props);
        this.selectInstitution = this.selectInstitution.bind(this);
    }

    selectInstitution(event) {
        event.preventDefault();
        console.log("InstitutionCard::",event);
        this.props.handleSelect(event.target.value);
    }

    render() {
        return (
            <div className="col-md-4 col-sm-6 col-xs-1">
                <div className="card">
                    <div className="card-body">
                        <div className="card-title">
                            <strong>{this.props.data.data.NAME}</strong>
                        </div>
                        <div className="card-body">
                            <button className="btn btn-primary" onClick={this.selectInstitution} value={this.props.data.data.NAME}>Select</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default InstitutionCard;