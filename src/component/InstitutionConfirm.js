import React, { Component } from 'react';

class InstitutionConfirm extends Component {

    constructor(props) {
        super(props);
        this.confirmInstitution = this.confirmInstitution.bind(this);
    }

    confirmInstitution(event) {
        event.preventDefault();
        this.props.handleConfirm(event.target.value);
    }

    render() {
        return (
            <div className="row mt-2">
                <div className="col">
                    <div className="alert alert-primary">
                        Selected <strong>{this.props.toConfirm}</strong> : <button className="btn btn-success" value={this.props.toConfirm} onClick={this.confirmInstitution}>Confirm</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default InstitutionConfirm;