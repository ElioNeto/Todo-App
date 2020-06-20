import React from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Button,
  TextInput,
  Alert,
  Text,
} from 'react-native';

import ToDoItem from './src/components/Todo';
import ModalApp from './src/components/Modal';
import {db} from './src/config';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      todos: {},
      presentToDo: '',
    };
    this.addNewTodo = this.addNewTodo.bind(this);
  }
  componentDidMount() {
    db.ref('/todos').on('value', (querySnapShot) => {
      let data = querySnapShot.val() ? querySnapShot.val() : {};
      let todoItems = {...data};
      this.setState({
        todos: todoItems,
      });
    });
  }
  addNewTodo() {
    if (!this.state.presentToDo) {
      Alert.alert('Warning!', 'Empty text not accept');
      return;
    }
    db.ref('/todos').push({
      done: false,
      todoItem: this.state.presentToDo,
    });
    Alert.alert('Action!', 'A new To-do item was created');
    this.setState({
      presentToDo: '',
    });
  }
  clearTodos() {
    db.ref('/todos').remove();
  }

  sendData() {
    console.log('chegou carai');
  }
  render() {
    let todosKeys = Object.keys(this.state.todos);
    return (
      <>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainerStyle}>
          <TextInput
            placeholder="Add new Todo"
            value={this.state.presentToDo}
            style={styles.textInput}
            onChangeText={(e) => {
              this.setState({
                presentToDo: e,
              });
            }}
            onSubmitEditing={this.addNewTodo}
          />
          <Button
            title="Add new To do item"
            onPress={this.addNewTodo}
            color="lightgreen"
          />
          {/*  <ModalApp sendData={this.sendData} /> */}

          <View style={styles.list}>
            {todosKeys.length > 0 ? (
              todosKeys.map((key) => (
                <ToDoItem key={key} id={key} todoItem={this.state.todos[key]} />
              ))
            ) : (
              <Text>No todo item</Text>
            )}
          </View>
        </ScrollView>
        <View style={styles.done}>
          <Button title="Show all" onPress={() => {}} color="blue" />
        </View>
        <View style={styles.clear}>
          <Button title="Clear todos" onPress={this.clearTodos} color="red" />
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginBottom: 110,
  },
  contentContainerStyle: {
    alignItems: 'center',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#afafaf',
    width: '80%',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 20,
    fontSize: 20,
    marginTop: 60,
  },
  todoItem: {
    flexDirection: 'row',
    marginVertical: 10,
    alignItems: 'center',
  },
  todoText: {
    borderColor: '#afafaf',
    paddingHorizontal: 5,
    paddingVertical: 7,
    borderWidth: 1,
    borderRadius: 5,
    marginRight: 10,
    minWidth: '50%',
    textAlign: 'center',
  },
  clear: {
    position: 'absolute',
    bottom: 20,
    flex: 1,
    alignItems: 'center',
    width: '100%',
  },
  done: {
    position: 'absolute',
    bottom: 60,
    flex: 1,
    alignItems: 'center',
    width: '100%',
  },
  list: {
    marginTop: 20,
  },
});

export default App;
