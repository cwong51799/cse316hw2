import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { ListNewItem_Transaction } from '../../transactions';

export class ItemScreen extends Component {
    constructor(props) {
        super(props);
        if (this.props.todoItem === undefined){
            this.state={
                newDesc : "",
                newAssigned : "",
                newDate : "",
                newCompleted : false,
                newItem : true
            }
        }
        else{
            this.state={
                newDesc : this.props.todoItem.description,
                newAssigned : this.props.todoItem.assigned_to,
                newDate : this.props.todoItem.due_date,
                newCompleted : this.props.todoItem.completed,
                newItem : false
            }
        }
    }
    handleDescChange(event){
        console.log("HANDLING DESCRIPTION CHANGE: " + event.target.value);
        this.setState(
            {newDesc : event.target.value}
        )
    }
    handleAssignedToChange(event){
        console.log("HANDLING ASSIGNED TO CHANGE: " + event.target.value);
        this.setState(
            {newAssigned : event.target.value}
        )
    }
    handleDueDateChange(event){
        console.log("HANDLING DUE DATE CHANGE: " + event.target.value);
        this.setState(
            {newDate : event.target.value}
        )
    }
    handleCompletedChange(){
        console.log(this.state.newCompleted);
        this.setState(
            {newCompleted: !this.state.newCompleted}
        )
    }
    submitItem(){
        // Officialize the changes
        // If it's a new item
        if (this.state.newItem === true){
            var oldArray = Array.from(this.props.todoList.items); // copy of original array
            var createdItem = {
                description: this.state.newDesc,
                assigned_to : this.state.newAssigned,
                due_date : this.state.newDate,
                completed : this.state.newCompleted
            };
            this.props.todoList.items.push(createdItem);
            var newArray = Array.from(this.props.todoList.items);
            this.props.jsTPS.addTransaction(new ListNewItem_Transaction(this.props.todoList, oldArray, newArray));
            this.props.jsTPS.doTransaction();
        }
        else{
            var oldItem = this.props.todoItem;
            this.props.todoItem.description = this.state.newDesc;
            this.props.todoItem.assigned_to = this.state.newAssigned;
            this.props.todoItem.due_date = this.state.newDate;
            this.props.todoItem.completed = this.state.newCompleted;
        }

        this.props.loadList(this.props.todoList);
    }

    render() {
        return (
            <div id="item_form_container">
                <div id="item_heading">Item</div>
                <div className="promptInputDiv"><span className="item_prompt" id="item_description_prompt">Description:</span>
                <input className= "item_input" type = "text" id="item_description_textfield" onChange = {(e)=>this.handleDescChange(e)} defaultValue={this.state.newDesc || ''}/></div>
                <div className="promptInputDiv"><span className="item_prompt" id="item_assigned_to_prompt">Assigned to:</span>
                <input className= "item_input" type = "text" id="item_assigned_to_textfield" onChange = {(e)=>this.handleAssignedToChange(e)} defaultValue={this.state.newAssigned || ''}/></div>
                <div className="promptInputDiv"><span className="item_prompt" id="item_due_date_prompt">Due Date:</span>
                <input className= "item_input" type = "date" id="item_due_date_textfield" onChange = {(e)=>this.handleDueDateChange(e)} defaultValue={this.state.newDate || ''}/></div>
                <div className="promptInputDiv"><span className="item_prompt" id="item_completed_prompt" >Completed:</span>
                <input className= "item_input" type = "checkbox" id="item_completed_checkbox" onChange = {(e)=>this.handleCompletedChange()} checked={this.state.newCompleted || false}/></div>
                <div id="submitOrCancelDiv">
                    <button className= "buttons" onClick = {(e)=>this.submitItem()}>Submit</button>
                    <button className= "buttons" onClick = {(e)=>this.props.loadList(this.props.todoList)}>Cancel</button>
                    </div>
            </div>// make these buttons nicer
        )
    }
}

ItemScreen.propTypes = {
    todoItem: PropTypes.object.isRequired
}

export default ItemScreen
