import React, { Component } from 'react'
import ListHeading from './ListHeading'
import ListItemsTable from './ListItemsTable'
import ListTrash from './ListTrash'
import PropTypes from 'prop-types';

export class ListScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            owner: this.props.todoList.owner,
            name: this.props.todoList.name
        };
    }
    handleOwnerChange(event){
        this.props.todoList.owner = event.target.value;
        this.setState({owner: event.target.value});
    }
    handleNameChange(event){
        this.props.todoList.name = event.target.value;
        this.setState({name: event.target.value});
    }
    getListName() {
        if (this.props.todoList) {
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
                                moveUp = {this.props.moveUp}
                                moveDown = {this.props.moveDown}
                                deleteItem = {this.props.deleteItem}
                                />
            </div>
        )
    }
}

export default ListScreen
