import React, {Component, useState} from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  TextInput,
} from 'react-native';

const ModalApp = ({sendData}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [item, setItem] = useState('');

  function submit() {
    if (item === '') {
      Alert.alert('Warning!', 'Empty text not accept');
      return;
    }
    sendData({item});
    setItem('');
  }
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Tasks</Text>
            <TextInput
              placeholder="Add new Todo"
              value={item}
              style={styles.textInput}
              onChangeText={(text) => setItem(text)}
              onSubmitEditing={this.submit}
            />
            <TouchableHighlight style={styles.store} onPress={submit}>
              <Text style={styles.textStyle}>Save</Text>
            </TouchableHighlight>

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
        <Text style={styles.textStyle}>Add Task</Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
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

export default ModalApp;
