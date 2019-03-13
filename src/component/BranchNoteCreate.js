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
        console.log("Save note", this.state.note);
        this.props.saveNote(this.state.note);
    }

    cancel() {
        console.log("Cancel note");
        this.props.cancelNote();
    }

    noteChange(e) {
        console.log("Note change", e.target.value);
        this.setState({note: e.target.value});
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col">
                        <textarea className="form-control" rows="5" value={this.state.note} onChange={this.noteChange}></textarea>
                    </div>
                </div>
                <div className="row">
                    <div className="col text-right">
                        <button className="btn btn-primary" onClick={this.saveNote}>Save</button>
                        <button className="btn btn-light" onClick={this.cancel}>Cancel</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default BranchNoteCreate;