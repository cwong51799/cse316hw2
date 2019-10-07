import React, { Component } from 'react'
import ListItemCard from './ListItemCard'

export class ListItemsTable extends Component {


    render() {
        return (
            <div id="list_items_container">
                <div className="list_item_task_header">Task</div>
                <div className="list_item_due_date_header">Due Date</div>
                <div className="list_item_status_header">Status</div>
                {
                    this.props.todoList.items.map((todoItem)=>(
                        <ListItemCard 
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
            </div>
        )
    }
}

export default ListItemsTable;
