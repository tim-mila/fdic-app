import React, { Component } from 'react';

class BranchDetailLine extends Component {

    render() {
        return (
            <div className="row">
                <div className="col"><strong>{this.props.name}</strong></div>
                <div className="col">{this.props.value}</div>
            </div>
        );
    }
}

export default BranchDetailLine;