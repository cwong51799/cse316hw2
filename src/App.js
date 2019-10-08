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
    currentList: null,
    currentItem: null
  }

  goHome = () => {
    this.setState({currentScreen: AppScreen.HOME_SCREEN});
    this.setState({currentList: null});
  }

  // Move to item screen, don't replace the current list.
  goItemScreen = (item) => {
    this.setState({
      currentItem: item,
      currentScreen: AppScreen.ITEM_SCREEN})
  }
  loadList = (todoListToLoad) => {
    this.setState({currentScreen: AppScreen.LIST_SCREEN});
    this.setState({currentList: todoListToLoad});
    console.log("currentList: " + this.state.currentList);
    console.log("currentScreen: " + this.state.currentScreen);
  }
  deleteList = (key) => {
    const todoLists = this.state.todoLists;
    todoLists.splice(key,1); // remove the element
    this.refreshListKeys();
    this.goHome();
  }
  // Sets the key of the list relative to its position on the array. Useful for when a list is deleted.
  refreshListKeys(){
    const todoList = this.state.todoLists;
    for (var i=0;i<todoList.length;i++){
        todoList[i].key = i;
    }
  }
/// What does the binding do?
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
          loadList = {this.loadList}
          deleteList = {this.deleteList}
          goItemScreen = {this.goItemScreen.bind(this)}
          />;
      case AppScreen.ITEM_SCREEN:
        return <ItemScreen 
          loadList = {this.loadList}
          todoList = {this.state.currentList}
          todoItem = {this.state.currentItem}
          />;
      default:
        return <div>ERROR</div>;
    }
  }
}

export default App;