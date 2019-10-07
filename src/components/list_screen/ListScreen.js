import React, { Component } from 'react'
import ListHeading from './ListHeading'
import ListItemsTable from './ListItemsTable'
import ListTrash from './ListTrash'
import PropTypes from 'prop-types';

export class ListScreen extends Component {
    // Had to use state change if I wanted it to update
    constructor(props) {
        super(props);
        this.state = {
            owner: this.props.todoList.owner,
            name: this.props.todoList.name,
            todoList: this.props.todoList
        };
    }
    handleOwnerChange(event){
        this.props.todoList.owner = event.target.value;
        this.setState({owner: this.props.todoList.owner});
    }
    handleNameChange(event){
        console.log(event.target.value);
        this.props.todoList.name = event.target.value;
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

 // These methods will assume that the button is unclickable
  // if the operation is invalid (like it can't move up).
  // 10/7/19 1:12AM, can maybe put these further into the project with states of their own.
    moveUp = (key) =>{
        const todoListItems = this.props.todoList.items;
        if (key === 0){ // if it's the first element
        return;
        }
        // Swap the item up.
        const swapHolder = todoListItems[key];
        todoListItems[key] = todoListItems[key-1];
        todoListItems[key-1] = swapHolder;
        this.refreshKeys();
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
        const swapHolder = todoListItems[key];
        todoListItems[key] = todoListItems[key+1];
        todoListItems[key+1] = swapHolder;
        this.refreshKeys();
        this.setState(()=>{  // reload the state by refreshing the currentList
        console.log("setting state");
        return {todoList: this.props.todoList};
        }); // reload the state
    }
    deleteItem = (key) =>{
        const todoListItems = this.props.todoList.items;
        todoListItems.splice(key,1); // remove the element
        this.refreshKeys();
        this.setState(()=>{  // reload the state by refreshing the currentList
        console.log("setting state");
        return {todoList: this.props.todoList};
        }); // reload the state?
    }

    // Sets the keys of each item to it's position in the array
    refreshKeys(){
        const todoListItems = this.state.todoList.items;
        for (var i=0;i<todoListItems.length;i++){
        todoListItems[i].key = i;
        }
    }

    render() {
        console.log("LIST SCREEN RENDER METHOD CALLED");
        return (
            <div id="todo_list">
                <ListHeading goHome={this.props.goHome} />
                <ListTrash />
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
                                />
            </div>
        )
    }
}

export default ListScreen
