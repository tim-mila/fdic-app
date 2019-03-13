import React, { Component } from 'react';

class BranchDetailLine extends Component {

    render() {
        return (
            <div className="list-group-item list-group-item-action">
                <strong>{this.props.name}</strong>: {this.props.value}
            </div>
        );
    }
}

export default BranchDetailLine;