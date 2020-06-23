import React, {useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import CheckBox from 'react-native-check-box';

import {db} from '../config';
export default function ToDoItem({
  todoItem: {todoItem: name, done},
  id,
  base,
  flg,
}) {
  const [doneState, setDone] = useState(done);

  const onCheck = () => {
    setDone(!doneState);
    db.ref(base).update({
      [id]: {
        todoItem: name,
        done: !doneState,
      },
    });
  };

  return (
    <>
      {!done && !flg ? (
        <View style={styles.todoItem}>
          <CheckBox
            checkBoxColor="skyblue"
            onClick={onCheck}
            isChecked={doneState}
          />
          <Text style={[styles.todoText, {opacity: doneState ? 0.2 : 1}]}>
            {name}
          </Text>
        </View>
      ) : (
        <></>
      )}
      {flg ? (
        <View style={styles.todoItem}>
          <CheckBox
            checkBoxColor="skyblue"
            onClick={onCheck}
            isChecked={doneState}
          />
          <Text style={[styles.todoText, {opacity: doneState ? 0.2 : 1}]}>
            {name}
          </Text>
        </View>
      ) : (
        <></>
      )}
    </>
  );
}
const styles = StyleSheet.create({
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
});
