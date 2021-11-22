import React from 'react';
import {Text, Button, View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

const ListItem = ({data, deleteItem}) => {
  return (
    <View style={styles.listItem}>
      <Text style={styles.listTextItem} testID={'item-' + data.name}>
        {data.name}
      </Text>
      <Icon
        testID={'item-delete-' + data.name}
        style={styles.icon}
        name="remove"
        size={20}
        color="firebrick"
        onPress={() => {
          deleteItem(data.objectId);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listItem: {
    padding: 25,
    backgroundColor: '#FFC667',
    borderBottomWidth: 2,
    borderColor: 'white',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  listTextItem: {
    borderColor: 'white',
    color: '#383F51',
    paddingLeft: 5,
    fontSize: 20,
    fontFamily: 'FredokaOne-Regular',
    flex: 1,
  },
  icon: {
    flex: 0,
  },
});

export default ListItem;
