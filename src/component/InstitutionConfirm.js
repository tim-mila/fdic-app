import React, { Component } from 'react';

class InstitutionConfirm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            toConfirm: props.toConfirm
        };
        this.confirmInstitution = this.confirmInstitution.bind(this);
    }

    confirmInstitution(event) {
        event.preventDefault();
        console.log("InstitutionConfirm::confirmInstitution",event);
        this.props.handleConfirm(event.target.value);
    }

    render() {
        return (
            <div className="row">
                <div className="col">
                    <div className="alert alert-primary">
                        Selected <strong>{this.state.toConfirm}</strong> : <button className="btn btn-success" value={this.state.toConfirm} onClick={this.confirmInstitution}>Confirm</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default InstitutionConfirm;