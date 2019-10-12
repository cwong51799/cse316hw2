import jsTPS_Transaction from "./jsTPS_Transaction";
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
        if ((this.mostRecentTransaction < 0) || (this.mostRecentTransaction < (this.transactions.size() -1))){
            for (var i=transactions.size()-1;i>this.mostRecentTransaction;i--){
                this.transactions.remove(i);
            }
        }
        this.transactions.push(transaction);
        doTransaction();
    }
    doTransaction(){
        if(hasTransactionToRedo()){
            this.performingDo = true;
            transaction = transactions.get[this.mostRecentTransaction+1];
            transaction.doTransaction();
            this.mostRecentTransaction++;
            this.performingDo = false;
        }
    }
    peekUndo(){
        if (hasTransactionToUndo()){
            return this.transactions[this.mostRecentTransaction];
        }
        else{
            return null;
        }
    }
    peekDo(){
        if (hasTransactionToRedo()){
            return transactions[this.mostRecentTransaction+1];
        }
        else{
            return null;
        }
    }
    undoTransaction(){
        if (hasTransactionToUndo()){
            this.performingUndo = true;
            transaction = transactions[this.mostRecentTransaction];
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
        return this.transactions.size();
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
        return (this.mostRecentTransaction < (this.transactions.size()-1));
    }
    toString() {
        text = "--Number of Transactions: " + transactions.size() + "\n";
        text += "--Current Index on Stack: " + mostRecentTransaction + "\n";
        text += "--Current Transaction Stack:\n";
        for (var i = 0; i <= mostRecentTransaction; i++) {
            jT = transactions.get(i);
            text += "----" + jT.toString() + "\n";
        }
        return text;
    }
}