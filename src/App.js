import React, { Component } from 'react';
import testTodoListData from './TestTodoListData.json'
import HomeScreen from './components/home_screen/HomeScreen'
import ItemScreen from './components/item_screen/ItemScreen'
import ListScreen from './components/list_screen/ListScreen'

const AppScreen = {
  HOME_SCREEN: "HOME_SCREEN",
  LIST_SCREEN: "LIST_SCREEN",
  ITEM_SCREEN: "ITEM_SCREEN"
}

class App extends Component {
  state = {
    currentScreen: AppScreen.HOME_SCREEN,
    todoLists: testTodoListData.todoLists,
    currentList: null
  }

  goHome = () => {
    this.setState({currentScreen: AppScreen.HOME_SCREEN});
    this.setState({currentList: null});
  }

  loadList = (todoListToLoad) => {
    this.setState({currentScreen: AppScreen.LIST_SCREEN});
    this.setState({currentList: todoListToLoad});
    console.log("currentList: " + this.state.currentList);
    console.log("currentScreen: " + this.state.currentScreen);
  }
  // These methods will assume that the button is unclickable
  // if the operation is invalid (like it can't move up).
 moveUp = (key) =>{
    const todoListItems = this.state.currentList.items;
    if (key === 0){ // if it's the first element
      return;
    }
    // Swap the item up.
    const swapHolder = todoListItems[key];
    todoListItems[key] = todoListItems[key-1];
    todoListItems[key-1] = swapHolder;
    this.refreshKeys();
    /* Swap keys too
    const keyHolder = todoListItems[key].key;
    todoListItems[key].key = todoListItems[key-1].key;
    todoListItems[key-1].key = keyHolder;*/
    this.setState(()=>{  // reload the state by refreshing the currentList
      console.log("setting state");
      return {currentList: this.state.currentList};
    }); // reload the state
  }
  moveDown = (key) =>{
    const todoListItems = this.state.currentList.items;
    if (key === todoListItems.length-1){ // if it's the last element
      return;
    }
    // Swap the item up.
    const swapHolder = todoListItems[key];
    todoListItems[key] = todoListItems[key+1];
    todoListItems[key+1] = swapHolder;
    this.refreshKeys();
    /* Swap keys too
    const keyHolder = todoListItems[key].key;
    todoListItems[key].key = todoListItems[key+1].key;
    todoListItems[key+1].key = keyHolder;*/
    this.setState(()=>{  // reload the state by refreshing the currentList
      console.log("setting state");
      return {currentList: this.state.currentList};
    }); // reload the state
  }
  deleteItem = (key) =>{
    const todoListItems = this.state.currentList.items;
    todoListItems.splice(key,1); // remove the element
    this.refreshKeys();
    this.setState(()=>{  // reload the state by refreshing the currentList
      console.log("setting state");
      return {currentList: this.state.currentList};
    }); // reload the state?
  }

  refreshKeys(){
    const todoListItems = this.state.currentList.items;
    for (var i=0;i<todoListItems.length;i++){
      todoListItems[i].key = i;
    }
  }




  render() {
    switch(this.state.currentScreen) {
      case AppScreen.HOME_SCREEN:
        return <HomeScreen 
        loadList={this.loadList.bind(this)} 
        todoLists={this.state.todoLists} />;
      case AppScreen.LIST_SCREEN:            
        return <ListScreen
          goHome={this.goHome.bind(this)}
          todoList={this.state.currentList}
          moveUp = {this.moveUp}
          moveDown = {this.moveDown}
          deleteItem = {this.deleteItem}
          />;
      case AppScreen.ITEM_SCREEN:
        return <ItemScreen />;
      default:
        return <div>ERROR</div>;
    }
  }
}

export default App;