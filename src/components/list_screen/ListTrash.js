import React, { Component } from 'react'
import DeleteConfirmation from './DeleteConfirmation'

export class ListTrash extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clicked : this.props.clicked // only load the dialog if it is clicked
        };
    }
    handleClick(){
        console.log("Trash can clicked!");
        // Makes it so that any click will close the dialog, which is good.
        this.setState({clicked: !this.state.clicked});
    }
    render() {
        console.log("ListTrash RENDER CALLED");
        return (
            <div id="list_trash" onClick = {(e)=>this.handleClick()}>
                <DeleteConfirmation deleteList = {this.props.deleteList} 
                                    todoList = {this.props.todoList}
                                    loadList = {this.props.loadList}
                                    showDialog = {this.state.clicked}>
                                    </DeleteConfirmation>
                                    &#128465;
            </div>
        )
    }
}

export default ListTrash
