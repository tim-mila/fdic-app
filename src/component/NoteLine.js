import React, { Component } from 'react';

class NoteLine extends Component {

    render() {
        return (
            <div className="row">
                <div className="col">
                    { this.props.note }
                </div>
            </div>
        );
    }
}

export default NoteLine;