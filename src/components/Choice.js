import React, {useState} from 'react';
import {View, Picker, StyleSheet, Button} from 'react-native';

export default function Choice({databaseOption}) {
  const [database, setDatabase] = useState('todosTest');
  function submit() {
    databaseOption({database});
  }
  return (
    <View style={styles.container}>
      <Picker
        selectedValue={database}
        style={{height: 50, width: 150}}
        onValueChange={(itemValue, itemIndex) => setDatabase(itemValue)}>
        <Picker.Item label="Test" value="/todosTest" />
        <Picker.Item label="PRD" value="/todos" />
      </Picker>
      <Button title="Change" onPress={submit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 60,
  },
});
