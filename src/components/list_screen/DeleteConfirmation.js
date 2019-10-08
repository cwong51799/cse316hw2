import React, { Component } from 'react'

export class DeleteConfirmation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reload: true
        };
    }

    render() {
        console.log("DeleteConfirmation RENDER CALLED");
        if (this.props.showDialog === true){
            console.log("Showing the Dialog!");
            return (
                <div id = "delete_confirmation"> <div id="deleteTitle">Delete this List?</div>
                    <p id="msg1"><strong>Are you sure you want to delete this list?</strong></p>
                    <div id="delete_options"> 
                        <button id="delete_confirmed" className="buttons" onClick = {(e)=>this.props.deleteList(this.props.todoList.key)}> Yes</button> 
                        <button id="delete_unconfirmed" className="buttons"> No</button>
                    </div>
                <p id="msg2">This list will not be retrievable.</p>
                </div>
            )
        }
        // Return nothing if not clicked
        else{
            return (<div></div>);
        }
    }
}

export default DeleteConfirmation
