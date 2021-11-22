import React from 'react';
import {Text, Button, View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

const ListItem = ({data}) => {
  return (
    <View style={styles.listItem}>
      <Text style={styles.listTextItem} testID={'item-' + data.name}>
        {data.name}
      </Text>
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
  },
  listTextItem: {
    borderColor: 'white',
    color: '#383F51',
    paddingLeft: 5,
    fontSize: 20,
    fontFamily: 'FredokaOne-Regular',
  },
});

export default ListItem;
