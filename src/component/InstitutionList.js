import React, { Component } from 'react';
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
        this.setState({toConfirm: value});
    }

    handleConfirm = (value) => {
        this.props.selectInstitution(value);
    }

    render() {
        let list = this.props.data.map((item, index) => 
            <InstitutionCard data={item} key={item.data.NAME} handleSelect={this.handleSelect} />
        );
        return (
            <div className="institution-list">
                {list.length === 0 &&
                    <div className="row">
                        <div className="col">
                            <div className="alert alert-secondary" role="alert">
                                No institutions found
                            </div>
                        </div>
                    </div>
                }
                {list.length > 0 &&
                <div className="row">
                    { list }
                </div>
                }
                {this.state.toConfirm !== '' &&
                    <InstitutionConfirm toConfirm={this.state.toConfirm} handleConfirm={this.handleConfirm} />
                }
            </div>
        );
    }
}

export default InstitutionList;