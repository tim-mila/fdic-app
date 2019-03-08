import React, { Component } from 'react';
import { BrowserRouter as Router, Link } from "react-router-dom";

class Header extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link to={"/"} className="nav-link" href="/">Home <span className="sr-only">(current)</span></Link>
                    </li>
                    {this.props.institution !== '' &&
                    <li className="nav-item">
                        <Link to={"/"} className="nav-link" href="/">
                            <span>Selected: <strong>{this.props.institution}</strong></span> <span className="sr-only">(current)</span>
                        </Link>
                    </li>
                    }
                    </ul>
                </div>
            </nav>
        );
    }
}

export default Header;