import React, { Component } from 'react'
import ListItemCard from './ListItemCard'

export class ListItemsTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todoList: this.props.todoList
        };
    }
    sortByTask(){
        this.props.todoList.items.sort(function(item1,item2){
            if (item1.description > item2.description){
                return 1;
            }
            else if(item1.description < item2.description){
                return -1;
            }
            else return 0;
        })
        this.setState({
            todoList: this.props.todoList
        });
    }
    sortByDueDate(){
        this.props.todoList.items.sort(function(item1,item2){
            if (item1.due_date > item2.due_date){
                return 1;
            }
            else if(item1.due_date < item2.due_date){
                return -1;
            }
            else return 0;
        })
        this.setState({
            todoList: this.props.todoList
        });
    }
    sortByStatus(){
        this.props.todoList.items.sort(function(item1,item2){
            if (item1.completed < item2.completed){
                return 1;
            }
            else if(item1.completed > item2.completed){
                return -1;
            }
            else return 0;
        })
        this.setState({
            todoList: this.props.todoList
        });
    }
    render() {
        this.props.refreshKeys(this.props.todoList);
        return (
            <div id="list_items_container">
                <div className= "list_item_header_card">
                    <div className="list_item_task_header" onClick = {(e) => this.sortByTask()}>Task</div>
                    <div className="list_item_due_date_header" onClick = {(e) => this.sortByDueDate()}>Due Date</div>
                    <div className="list_item_status_header" onClick = {(e) => this.sortByStatus()}>Status</div>
                </div>
                {
                    this.props.todoList.items.map((todoItem)=>(
                        <ListItemCard 
                            goItemScreen = {this.props.goItemScreen}
                            key={todoItem.key}
                            listItem={todoItem} 
                            // Pass down the todoList so that each list item
                            // has a marker to the list and it can move up/down/delete
                            listSize = {this.props.todoList.items.length}
                            moveUp = {this.props.moveUp}
                            moveDown = {this.props.moveDown}
                            deleteItem = {this.props.deleteItem}
                            />
                    ))
                }
                <div className="list_item_add_card" onClick = {(e)=>this.props.goItemScreen()}>+</div>

            </div>
        )
    }
}

export default ListItemsTable;
