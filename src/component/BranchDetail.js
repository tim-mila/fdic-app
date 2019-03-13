import React, { Component } from 'react';
import './BranchDetail.css';
import axios from 'axios';
import BranchDetailLine from './BranchDetailLine';
import BranchNoteCreate from './BranchNoteCreate';
import NoteLine from './NoteLine';

class BranchDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            branch : {},
            startNote: false,
            notes: []
        }
        this.startNote = this.startNote.bind(this);
        this.saveNote = this.saveNote.bind(this);
        this.cancelNote = this.cancelNote.bind(this);
    }

    componentDidMount() {
        this.hyrdateComponent();
        axios.get(process.env.REACT_APP_API_URL + "/FdicBranchSearch?institutionName=" + this.props.institution + "&q=" + this.props.data.match.params.name, {
            crossdomain: true,
        })
        .then(response => {
            this.setState({"branch": response.data.data[0].data})
        });
    }

    startNote() {
        this.setState({startNote: true});
    }

    saveNote(note) {
        this.state.notes.push(note);
        this.setState({startNote: false, notes: this.state.notes}, this.saveToLocalStorage);
    }
    
    cancelNote() {
        this.setState({startNote: false});
    }

    hyrdateComponent() {
        let value = localStorage.getItem(this.localStorageKey());
        if (value) {
            this.setState({notes: JSON.parse(value)});
        }
    }

    saveToLocalStorage() {
        localStorage.setItem(this.localStorageKey(), JSON.stringify(this.state.notes));
    }

    localStorageKey() {
        let key = this.props.institution + ":" + this.props.data.match.params.name;
        key = key.replace(/\s+/g, '-').toLowerCase();
        return key;
    }

    render() {

        let details = Object.keys(this.state.branch).map((key, index) => 
            <BranchDetailLine name={key} value={this.state.branch[key]} key={key} />
        );
        
        let notes = this.state.notes.map((item, index) =>
            <NoteLine note={item} key={index} />
        );

        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h3>{this.props.data.match.params.name}</h3>
                        { details }
                    </div>
                    <div className="col">
                        <h3>Notes</h3>
                        { notes }
                        <div className="row">
                            <div className="col">
                                {!this.state.startNote && <button className="btn btn-primary" onClick={this.startNote}>Add Note</button>  }
                                {this.state.startNote && <BranchNoteCreate saveNote={this.saveNote} cancelNote={this.cancelNote} /> }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default BranchDetail;