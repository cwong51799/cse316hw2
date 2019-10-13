class jsTPS{
    transactions = [];
    mostRecentTransaction = -1;
    performingDo = false;
    performingUndo = false;
    isPerformingDo() {
        return this.performingDo;
    }
    isPerformingUndo(){
        return this.performingUndo;
    }
    addTransaction(transaction){
        if ((this.mostRecentTransaction < 0) || (this.mostRecentTransaction < (this.transactions.length -1))){
            for (var i=this.transactions.length-1;i>this.mostRecentTransaction;i--){
                this.transactions.remove(i);
            }
        }
        this.transactions.push(transaction);
        this.doTransaction();
    }
    doTransaction(){
        if(this.hasTransactionToRedo()){
            this.performingDo = true;
            var transaction = this.transactions[this.mostRecentTransaction+1];
            transaction.doTransaction();
            this.mostRecentTransaction++;
            this.performingDo = false;
        }
    }
    peekUndo(){
        if (this.hasTransactionToUndo()){
            return this.transactions[this.mostRecentTransaction];
        }
        else{
            return null;
        }
    }
    peekDo(){
        if (this.hasTransactionToRedo()){
            return this.transactions[this.mostRecentTransaction+1];
        }
        else{
            return null;
        }
    }
    undoTransaction(){
        if (this.hasTransactionToUndo()){
            this.performingUndo = true;
            var transaction = this.transactions[this.mostRecentTransaction];
            transaction.undoTransaction();
            this.mostRecentTransaction--;
            this.performingUndo = false;
        }
    }
    clearAllTransactions(){
        this.transactions = [];
        this.mostRecentTransaction = -1;
    }
    getSize(){
        return this.transactions.length;
    }
    getRedoSize(){
        return (this.getSize() - this.mostRecentTransaction - 1);
    }
    getUndoSize(){
        return (this.mostRecentTransaction + 1);
    }
    hasTransactionToUndo(){
        return this.mostRecentTransaction >= 0;
    }
    hasTransactionToRedo(){
        return (this.mostRecentTransaction < (this.transactions.length-1));
    }
    toString() {
        var text = "--Number of Transactions: " + this.transactions.length + "\n";
        text += "--Current Index on Stack: " + this.mostRecentTransaction + "\n";
        text += "--Current Transaction Stack:\n";
        for (var i = 0; i <= this.mostRecentTransaction; i++) {
            var jT = this.transactions.get(i);
            text += "----" + jT.toString() + "\n";
        }
        return text;
    }
}

export default jsTPS;