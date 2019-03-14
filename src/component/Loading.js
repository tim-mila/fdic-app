import React, { Component } from 'react';

class Loading extends Component {

    render() {
        return (
            <div className="d-flex justify-content-center">
                <div className="spinner-border text-secondary" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
                
                <h4 className="text-secondary ml-4">{this.props.message}</h4>
            </div>
        );
    }
}

export default Loading;