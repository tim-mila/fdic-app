import React, { Component } from 'react';
import './InstitutionList.css';
import InstitutionCard from './InstitutionCard';
import InstitutionConfirm from './InstitutionConfirm';

class InstitutionList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            toConfirm : ''
        }
    }

    handleSelect = (value) => {
        console.log("InstitutionList::handleSelect", value);
        this.setState({toConfirm: value});
    }

    handleConfirm = (value) => {
        console.log("InstitutionList::handleConfirm", value);
        this.props.selectInstitution(value);
    }

    render() {
        let list = this.props.data.map((item, index) => 
            <InstitutionCard data={item} key={item.data.NAME} handleSelect={this.handleSelect} />
        );
        return (
            <div>
                <div className="row">     
                    { list }
                </div>
                {this.state.toConfirm !== '' &&
                    <InstitutionConfirm toConfirm={this.state.toConfirm} handleConfirm={this.handleConfirm} />
                }
            </div>
        );
    }
}

export default InstitutionList;