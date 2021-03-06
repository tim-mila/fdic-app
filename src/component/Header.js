import React, { Component } from 'react';
import { Link } from "react-router-dom";

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
                            {this.props.institution === '' &&       
                                <Link to={"/"} className="nav-link" href="/">
                                    <span>Home</span>
                                </Link>            
                            }
                            {this.props.institution !== '' &&       
                                <Link to={"/locations"} className="nav-link" href="/">
                                    <span>Home:&nbsp;<strong>{this.props.institution}</strong></span>
                                </Link>            
                            }
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}

export default Header;