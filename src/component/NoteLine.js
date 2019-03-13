import React, { Component } from 'react';

class NoteLine extends Component {

    render() {
        return (
            <div className="list-group-item list-group-item-action">
                { this.props.note }
            </div>
        );
    }
}

export default NoteLine;