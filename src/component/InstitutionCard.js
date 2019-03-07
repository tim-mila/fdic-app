import React, { Component } from 'react';

class InstitutionCard extends Component {
    render() {
        return (
            <div className="col-md-4 col-sm-6 col-xs-1">
                <div className="card">
                    <div className="card-body">
                        <div className="card-title">{this.props.data.data.NAME}</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default InstitutionCard;