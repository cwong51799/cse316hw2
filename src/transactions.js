class NameChange_Transaction{
    constructor(pointer, newName){
        this.pointer = pointer;
        this.oldName = pointer.value;
        this.newName = newName;
    }
    doTransaction(){
         this.pointer.value = this.newName;
    }
    undoTransaction(){
        this.pointer.value = this.oldName;
    }
    toString(){
        return "Change name from " + this.oldName + " to " + this.newName;
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
        else{// else its delete
            this.deletedItem = this.todoList.items[this.key];

        }
    }
    undoTransaction(){
        this.todoList.items = this.oldArray;
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

export default ListChange_Transaction;