import React, { Component } from 'react'

export class ListItemCard extends Component {
    render() {
        const isCompleted = this.props.listItem.completed;
        return (
            <div className='list_item_card'>
                <div className='list_item_card_description'>
                    {this.props.listItem.description}
                </div>
                <div className='list_item_card_assigned_to'>
                    Assigned To: <strong>{this.props.listItem.assigned_to}</strong>
                </div>
                <div className='list_item_card_due_date'>
                    {this.props.listItem.due_date}
                </div>
                <div className={isCompleted ? 'list_item_card_completed' : 'list_item_card_not_completed'}>
                    {isCompleted ? 'Completed' : 'Pending'}
                </div>

            </div>
        )
    }
}

export default ListItemCard
