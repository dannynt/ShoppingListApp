import React, {useState, useEffect} from 'react';
import {View, StyleSheet, FlatList, Alert, Text} from 'react-native';
import ListItem from './components/ListItem';
import Header from './components/Header';

const App = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const getItems = async () => {
      const serverItems = await fetchItems();
      console.log(serverItems['results']);
      setItems(serverItems['results'].reverse());
    };

    getItems();
  }, []);

  const fetchItems = async () => {
    var myHeaders = new Headers();
    myHeaders.append(
      'X-Parse-Application-Id',
      'Sl2YjqXZP1s5DAO7ua0LQTx6JI9iFcPaDFkyLFl2',
    );
    myHeaders.append(
      'X-Parse-REST-API-Key',
      'WghsAislQI0Vq10BmY6tLoq4xnvqUoEDjOtnCafc',
    );

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    const res = await fetch(
      'https://parseapi.back4app.com/classes/Item',
      requestOptions,
    );
    const data = await res.json();
    return data;
  };

  const addItem = async text => {
    if (!text) {
      Alert.alert(
        'You did not enter an item',
        'Please enter an item',
        [
          {
            text: 'OK',
            style: 'cancel',
          },
        ],
        {cancelable: true},
      );
    } else {
      var myHeaders = new Headers();
      myHeaders.append(
        'X-Parse-Application-Id',
        'Sl2YjqXZP1s5DAO7ua0LQTx6JI9iFcPaDFkyLFl2',
      );
      myHeaders.append(
        'X-Parse-REST-API-Key',
        'WghsAislQI0Vq10BmY6tLoq4xnvqUoEDjOtnCafc',
      );

      myHeaders.append('Content-Type', 'text/plain');

      var data = '{"name" : "' + text + '", "checked" : false}';

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: data,
        redirect: 'follow',
      };

      const res = await fetch(
        'https://parseapi.back4app.com/classes/Item',
        requestOptions,
      );

      const resData = await res.json();

      setItems(oldItems => {
        return [{objectId: resData['objectId'], name: text}, ...oldItems];
      });
    }
  };

  return (
    <View style={styles.container}>
      <Header addItem={addItem} />
      <FlatList
        testID="shopping-list"
        data={items}
        renderItem={({item}) => <ListItem data={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default App;
