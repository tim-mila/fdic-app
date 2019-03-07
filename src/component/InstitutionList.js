import React, { Component } from 'react';
import './InstitutionCard';
import InstitutionCard from './InstitutionCard';

class InstitutionList extends Component {
    render() {
        let list = this.props.data.map((item, index) => 
            <InstitutionCard data={item} key={item.data.NAME} />
        );
        return (
            <div className="row">     
                { list }
            </div>
        );
    }
}

export default InstitutionList;