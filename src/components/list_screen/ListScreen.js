import React, { Component } from 'react'
import ListHeading from './ListHeading'
import ListItemsTable from './ListItemsTable'
import ListTrash from './ListTrash'
import {ListChange_Transaction, NameChange_Transaction,ListItemEdit_Transaction} from '../../transactions'
import PropTypes from 'prop-types';

export class ListScreen extends Component {
    // Had to use state change if I wanted it to update
    constructor(props) {
        super(props);
        this.state = {
            owner: this.props.todoList.owner,
            name: this.props.todoList.name,
            todoList: this.props.todoList,
            jsTPS : this.props.jsTPS
        };
        this.jsTPS = this.props.jsTPS;
        this.ctrlDown = false;
        document.body.onkeydown = function(e) {
            if (e.keyCode === 17 || e.keyCode === 91){
                this.ctrlDown = true;
            }
            if (this.ctrlDown && e.keyCode === 90){
                e.preventDefault();
                var undoButton = document.getElementById("undo");
                undoButton.click();
            }
            else if (this.ctrlDown && e.keyCode === 89){
                e.preventDefault();
                var redoButton = document.getElementById("redo");
                redoButton.click();
            }
        }
        document.body.onkeyup = function(e) {
            if (e.keyCode == 17 || e.keyCode == 91) {
              this.ctrlDown = false;
            };
        };
        // Refresh the keys upon loading, this is needed for when a new element
    }
    assignControls(){

    }
    handleOwnerChange(event){
        var transaction = new NameChange_Transaction(this.props.todoList,event.target.value, "owner");
        this.jsTPS.addTransaction(transaction);
        this.jsTPS.doTransaction();
        this.setState({owner: this.props.todoList.owner});
    }
    handleNameChange(event){
        var transaction = new NameChange_Transaction(this.props.todoList,event.target.value, "name");
        this.jsTPS.addTransaction(transaction);
        this.jsTPS.doTransaction();
        this.setState({name: this.props.todoList.name});
    }
    getListName() {
        if (this.state.todoList) {
            let name = this.state.name;
            return name;
        }
        else
            return "";
    }
    getListOwner() {
        if (this.props.todoList) {
            let owner = this.state.owner;
            return owner;
        }
        else
            return "";
    }
  // Buttons where operations are invalid should be disabled but I'll add exceptions anyway
    moveUp = (key) =>{
        if (key === 0){ // if it's the first element
        return;
        }
        // Swap the item up.
        var transaction = new ListChange_Transaction(this.props.todoList, key, "moveUp");
        this.jsTPS.addTransaction(transaction);
        this.jsTPS.doTransaction();
        this.setState(()=>{  // reload the state by refreshing the currentList
        console.log("setting state");
        return {todoList: this.props.todoList};
        }); // reload the state
    }
    moveDown = (key) =>{
        const todoListItems = this.props.todoList.items;
        if (key === todoListItems.length-1){ // if it's the last element
            return;
        }
        // Swap the item up.
        var transaction = new ListChange_Transaction(this.props.todoList, key, "moveDown");
        this.jsTPS.addTransaction(transaction);
        this.jsTPS.doTransaction();
        this.setState(()=>{  // reload the state by refreshing the currentList
        console.log("setting state");
        return {todoList: this.props.todoList};
        }); // reload the state
    }
    deleteItem = (key) =>{
        var transaction = new ListChange_Transaction(this.props.todoList, key, "delete");
        this.jsTPS.addTransaction(transaction);
        this.jsTPS.doTransaction();
        this.setState(()=>{  // reload the state by refreshing the currentList
        console.log("setting state");
        return {todoList: this.props.todoList};
        }); // reload the state?
    }
    // Sets the keys of each item to it's position in the array
    refreshKeys(todoList){
        const todoListItems = todoList.items;
        for (var i=0;i<todoListItems.length;i++){
            todoListItems[i].key = i;
        }
    }
    undo(){
        this.jsTPS.undoTransaction();
        this.refreshKeys(this.props.todoList);
        this.setState(()=>{  // reload the state by refreshing the currentList
            console.log("setting state");
            return {todoList: this.props.todoList,
                    owner: this.props.todoList.owner,
                    name: this.props.todoList.name
                    };
        });
    }
    redo(){
        this.jsTPS.doTransaction();
        this.refreshKeys(this.props.todoList);
        this.setState(()=>{  // reload the state by refreshing the currentList
            console.log("setting state");
            return {todoList: this.props.todoList,
                    owner: this.props.todoList.owner,
                    name: this.props.todoList.name,
                    };
        });
    }
    handleKeyPress(e){
        console.log(e.keyCode);
    }
    render() {
        this.refreshKeys(this.props.todoList);
        console.log("ListScreen RENDER CALLED");
        return (
            <div id="todo_list">
                <ListHeading goHome={this.props.goHome} />
                <ListTrash deleteList = {this.props.deleteList} 
                           todoList = {this.props.todoList}
                           loadList = {this.props.loadList}
                           />
                <button id = "undo" onClick={e=>this.undo()} hidden> UNDO BUTTON </button>
                <button id = "redo" onClick={e=>this.redo()} hidden> REDO BUTTON </button>
                <div id="list_details_container">
                    <div id="list_details_name_container" className="text_toolbar">
                        <span id="list_name_prompt">Name:</span>
                        <input 
                            value={this.getListName()} 
                            type="text" 
                            id="list_name_textfield" 
                            onChange={e=>this.handleNameChange(e)}
                            />
                    </div>
                    <div id="list_details_owner_container" className="text_toolbar">
                        <span id="list_owner_prompt">Owner:</span>
                        <input 
                            value={this.getListOwner()}
                            type="text" 
                            id="list_owner_textfield" 
                            onChange={e=>this.handleOwnerChange(e)}
                            />
                    </div>
                </div>
                <ListItemsTable todoList={this.props.todoList}
                                moveUp = {this.moveUp}
                                moveDown = {this.moveDown}
                                deleteItem = {this.deleteItem}
                                goItemScreen = {this.props.goItemScreen}
                                refreshKeys = {this.refreshKeys}
                                jsTPS = {this.jsTPS}
                                />
            </div>
        )
    }
}

export default ListScreen
