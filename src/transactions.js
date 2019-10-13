import jsTPS_Transaction from "./jsTPS_Transaction";

class ListNameChange_Transaction{
    constructor(oldName, newName){
        this.oldName = oldName;
        this.newName = newName;
    }
    doTransaction(){
        
    }
}

class OwnerNameChanges_Transactions{
    constructor(oldName, newName){
        this.oldName = oldName;
        this.newName = newName;
    }
}

class ListItemOrderChange_Transaction{
    constructor(oldArray, newArray){
        this.oldArray = oldArray;
        this.newArray = newArray;
    }
}

class ListItemRemoval_Transaction{
    constructor(oldArray, newArray){
        this.oldArray = oldArray;
        this.newArray = newArray;
    }
}

class ListItemEdit_Transaction{
    constructor(oldItem, newItem){
        this.oldItem = oldItem;
        this.newItem = newItem;
    }
}