import React, {useState} from 'react';
import {View, Picker, StyleSheet, Button} from 'react-native';

import DropDownPicker from 'react-native-dropdown-picker';
import Feather from 'react-native-vector-icons/Feather';
Feather.loadFont();

export default function Choice({databaseOption}) {
  return (
    <View style={styles.container}>
      <DropDownPicker
        items={[
          {label: 'TEST', value: '/todosTest'},
          {label: 'PRD', value: '/todos'},
        ]}
        labelStyle={{fontSize: 14, color: '#000'}}
        dropDownStyle={{backgroundColor: '#fafafa'}}
        defaultIndex={0}
        containerStyle={{height: 40, width: 200}}
        onChangeItem={(item) => databaseOption({database: item.value})}
        placeholder="Switch the database"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    marginTop: 60,
  },
});
