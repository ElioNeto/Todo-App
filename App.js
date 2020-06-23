import React from 'react';
import {StyleSheet, ScrollView, View, Button, Alert, Text} from 'react-native';

import ToDoItem from './src/components/Todo';
import ModalApp from './src/components/Modal';
import Choice from './src/components/Choice';

import {db} from './src/config';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      todos: {},
      presentToDo: '',
      base: '/initial',
      flg: false,
      view: 'initial',
    };
    this.addNewTodo = this.addNewTodo.bind(this);
    this.clearTodos = this.clearTodos.bind(this);
    this.sendData = this.sendData.bind(this);
    this.showAll = this.showAll.bind(this);
    this.showToDo = this.showToDo.bind(this);
    this.selectDatabase = this.selectDatabase.bind(this);
  }

  componentDidMount() {
    db.ref(this.state.base).on('value', (querySnapShot) => {
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
    db.ref(this.state.base).push({
      done: false,
      todoItem: this.state.presentToDo,
    });
    Alert.alert('Action!', 'A new To-do item was created');
    this.setState({
      presentToDo: '',
    });
  }

  clearTodos() {
    db.ref(this.state.base).remove();
  }

  sendData(data) {
    if (!data) {
      Alert.alert('Warning!', 'Empty text not accept');
      return;
    }
    db.ref(this.state.base).push({
      done: false,
      todoItem: data.item,
    });
    Alert.alert('Action!', 'A new To-do item was created');
  }

  selectDatabase(data) {
    this.setState({
      todos: [],
    });
    let base = data.database;
    this.setState({base: base});
    db.ref(base).on('value', (querySnapShot) => {
      let snap = querySnapShot.val() ? querySnapShot.val() : {};
      let todoItems = {...snap};
      this.setState({
        todos: todoItems,
      });
    });
    base === '/todosTest' ? this.setState({view: 'ToDo'}) : {};
    base === '/todos' ? this.setState({view: 'ToDo'}) : {};
    base === '/agendaTest' ? this.setState({view: 'Agenda'}) : {};
  }

  showAll() {
    this.setState({flg: true});
  }

  showToDo() {
    this.setState({flg: false});
  }

  render() {
    let todosKeys = Object.keys(this.state.todos);
    return (
      <>
        {this.state.view === 'initial' ? (
          <>
            <ScrollView
              style={styles.container}
              contentContainerStyle={styles.contentContainerStyle}>
              <Choice
                databaseOption={this.selectDatabase}
                style={styles.choice}
              />
              <View style={styles.list}>
                {todosKeys.length > 0 ? (
                  todosKeys.map((key) => (
                    <ToDoItem
                      key={key}
                      id={key}
                      todoItem={this.state.todos[key]}
                      base={this.state.base}
                      flg={true}
                    />
                  ))
                ) : (
                  <Text>No todo item</Text>
                )}
              </View>
            </ScrollView>
          </>
        ) : (
          <></>
        )}
        {this.state.view === 'ToDo' ? (
          <>
            <ScrollView
              style={styles.container}
              contentContainerStyle={styles.contentContainerStyle}>
              <Choice
                databaseOption={this.selectDatabase}
                style={styles.choice}
              />
              <ModalApp sendData={this.sendData} />
              <View style={styles.list}>
                {todosKeys.length > 0 ? (
                  todosKeys.map((key) => (
                    <ToDoItem
                      key={key}
                      id={key}
                      todoItem={this.state.todos[key]}
                      base={this.state.base}
                      flg={this.state.flg}
                    />
                  ))
                ) : (
                  <Text>No todo item</Text>
                )}
              </View>
            </ScrollView>
            <View style={styles.done}>
              {!this.state.flg ? (
                <Button title="Show all" onPress={this.showAll} color="blue" />
              ) : (
                <Button
                  title="Show ToDo"
                  onPress={this.showToDo}
                  color="blue"
                />
              )}
            </View>
            <View style={styles.clear}>
              <Button
                title="Clear todos"
                onPress={this.clearTodos}
                color="red"
              />
            </View>
          </>
        ) : (
          <></>
        )}
        {this.state.view === 'Agenda' ? (
          <>
            <ScrollView
              style={styles.container}
              contentContainerStyle={styles.contentContainerStyle}>
              <Choice
                databaseOption={this.selectDatabase}
                style={styles.choice}
              />
              {/* <ModalApp sendData={this.sendData} /> */}
              <View style={styles.list}>
                {todosKeys.length > 0 ? (
                  todosKeys.map((key) => (
                    <ToDoItem
                      key={key}
                      id={key}
                      todoItem={this.state.todos[key]}
                      base={this.state.base}
                      flg={this.state.flg}
                    />
                  ))
                ) : (
                  <Text>No todo item</Text>
                )}
              </View>
            </ScrollView>
          </>
        ) : (
          <></>
        )}
      </>
    );
  }
}

const styles = StyleSheet.create({
  choice: {
    flex: 5,
    backgroundColor: 'white',
    alignItems: 'center',
    marginBottom: 110,
  },
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
