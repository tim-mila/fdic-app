import React, { Component } from 'react';


class BranchNoteCreate extends Component {

    constructor(props) {
        super(props);
        this.state = { note: '' };
        this.saveNote = this.saveNote.bind(this);
        this.cancel = this.cancel.bind(this);
        this.noteChange = this.noteChange.bind(this);
    }

    saveNote() {
        this.props.saveNote(this.state.note);
    }

    cancel() {
        this.props.cancelNote();
    }

    noteChange(e) {
        this.setState({note: e.target.value});
    }

    render() {
        return (
            <div>
                <div className="row mb-2">
                    <div className="col">
                        <textarea className="form-control" rows="5" value={this.state.note} onChange={this.noteChange}></textarea>
                    </div>
                </div>
                <div className="row">
                    <div className="col text-right">
                        <button className="btn btn-primary mr-1" onClick={this.saveNote}>Save</button>
                        <button className="btn btn-light" onClick={this.cancel}>Cancel</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default BranchNoteCreate;