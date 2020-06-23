import React, {useState} from 'react';
import {View, StyleSheet, Modal, TouchableHighlight, Text} from 'react-native';

import DropDownPicker from 'react-native-dropdown-picker';
import Feather from 'react-native-vector-icons/Feather';
Feather.loadFont();

export default function Choice({databaseOption}) {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.container}>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <DropDownPicker
              items={[
                {label: 'ToDo Test', value: '/todosTest'},
                {label: 'ToDo', value: '/todos'},
                {label: 'Agenda Test', value: '/agendaTest'},
              ]}
              labelStyle={{fontSize: 14, color: '#000'}}
              dropDownStyle={{backgroundColor: '#fafafa'}}
              defaultIndex={0}
              containerStyle={{height: 40, width: 200}}
              onChangeItem={(item) => databaseOption({database: item.value})}
              placeholder="Switch the database"
            />

            <TouchableHighlight
              style={styles.close}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}>
              <Text style={styles.textClose}>Close</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
      <TouchableHighlight
        style={styles.openButton}
        onPress={() => {
          setModalVisible(true);
        }}>
        <Text style={styles.textStyle}>Select Database</Text>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    marginTop: 60,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    width: '90%',
    height: '80%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 20,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textClose: {
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
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
  close: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: '#fff',
  },
  store: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: '#39ff14',
  },
});
