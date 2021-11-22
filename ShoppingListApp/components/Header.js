import React, {useState} from 'react';
import {View, StyleSheet, Alert, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

const Header = ({addItem}) => {
  const [newItemText, setNewItemText] = useState('');

  return (
    <View style={styles.headerStyle}>
      <TextInput
        style={styles.textInput}
        testID="shopping-list-input"
        placeholder="Enter item"
        onChangeText={text => {
          setNewItemText(text);
        }}
        value={newItemText}
      />
      <Icon
        name="plus-circle"
        size={45}
        color="#383F51"
        testID="shopping-list-add"
        onPress={() => {
          addItem(newItemText);
          setNewItemText('');
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headerStyle: {
    paddingTop: 5,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  textInput: {
    fontFamily: 'FredokaOne-Regular',
    fontSize: 30,
    width: '55%',
    borderBottomWidth: 4,
    paddingBottom: -4,
    marginBottom: 15,
    borderColor: '#383F51',
    textAlign: 'center',
  },
});

export default Header;
