class NameChange_Transaction{
    constructor(todoList, newValue, type){
        this.todoList = todoList;
        this.oldOwner = todoList.owner;
        this.oldName = todoList.name;
        this.newValue = newValue;
        this.type = type;
    }
    doTransaction(){
        if (this.type === "owner"){
            this.todoList.owner = this.newValue;
        }
        else if (this.type === "name"){
            this.todoList.name = this.newValue;
        }
    }
    undoTransaction(){
        if (this.type === "owner"){
            this.todoList.owner = this.oldOwner;
        }
        else if (this.type === "name"){
            this.todoList.name = this.oldName;
        }
    }
    toString(){
        return "NameChange Transaction";
    }
}
// Item will move in a direction Up or Down.
class ListChange_Transaction{
    constructor(todoList, key, type){
        this.todoList = todoList;
        this.key = key;
        this.type = type;
    }
    doTransaction(){
        if (this.type == "moveUp"){
            var holder = this.todoList.items[this.key-1];
            this.todoList.items[this.key-1] = this.todoList.items[this.key];
            this.todoList.items[this.key] = holder;
        }
        else if (this.type == "moveDown"){
            var holder = this.todoList.items[this.key+1];
            this.todoList.items[this.key+1] = this.todoList.items[this.key];
            this.todoList.items[this.key] = holder;
        }
        else if (this.type == "delete") {// else its delete
            this.deletedItem = this.todoList.items[this.key];
            console.log(this.deletedItem);
            this.todoList.items.splice(this.key,1); // remove the element
        }
    }
    // Delete undo not working, something about overlapping keys.
    undoTransaction(){
        if (this.type === "moveUp"){
            var holder = this.todoList.items[this.key];
            this.todoList.items[this.key] = this.todoList.items[this.key-1];
            this.todoList.items[this.key-1] = holder;
        }
        else if (this.type === "moveDown"){
            var holder = this.todoList.items[this.key];
            this.todoList.items[this.key] = this.todoList.items[this.key+1];
            this.todoList.items[this.key+1] = holder;
        }
        else if (this.type === "delete") {// else its delete
            this.deletedItem = this.todoList.items[this.key];
            this.todoList.items.splice(this.key,0,this.deletedItem); // at the index, remove 0 elements, then insert the deleted item
        }
    }
    toString(){
        return "List change transaction";
    }
}

class ListItemEdit_Transaction{
    constructor(array, key, newItem){
        this.array = array;
        this.key = key;
        this.oldItem = array[key];
        this.newItem = newItem;
    }
    doTransaction(){
        this.array[this.key] = this.newItem;
    }
    undoTransaction(){
        this.array[this.key] = this.oldItem;
    }
    toString(){
        return "Item Edit Transaction";
    }
}

export {
    NameChange_Transaction,
    ListChange_Transaction,
    ListItemEdit_Transaction
}