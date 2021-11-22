import 'react-native';
import React from 'react';
import App from '../App';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import Header from '../components/Header';
import ListItem from '../components/ListItem';

let app = undefined;

const init = async () => {
  app = render(<App />);
};
const itemToAdd = '[TESTING] item649206483ef5';
let itemToDelete = undefined;

const addItem = async text => {
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
  itemToDelete = resData['objectId'];
};

const deleteItem = id => {
  var myHeaders = new Headers();
  myHeaders.append(
    'X-Parse-Application-Id',
    'Sl2YjqXZP1s5DAO7ua0LQTx6JI9iFcPaDFkyLFl2',
  );
  myHeaders.append(
    'X-Parse-REST-API-Key',
    'WghsAislQI0Vq10BmY6tLoq4xnvqUoEDjOtnCafc',
  );

  var raw = '';

  var requestOptions = {
    method: 'DELETE',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };

  fetch('https://parseapi.back4app.com/classes/Item/' + id, requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
};

// Feature: Removing items from a shopping list
// Functional Requirement: As a shopper I want to remove items from my shopping list to get rid of unnecesary items.

// Removing an item from shopping list
describe('Removing a specific item from a shopping list', () => {
  beforeAll(init);
  it('given we have an shopping list with items', async () => {
    const shoppingList = app.getByTestId('shopping-list');
    expect(shoppingList).toBeTruthy();
    const header = render(<Header addItem={addItem} />);
    const input = header.getByTestId('shopping-list-input');

    fireEvent.changeText(input, itemToAdd);
    const addButton = header.getByTestId('shopping-list-add');
    fireEvent.press(addButton);
    app = render(<App />);
    await waitFor(() => expect(app.queryByTestId('item-' + itemToAdd)));
  });
  it('when we remove a specific item from our shopping list', async () => {
    const {getByTestId} = render(
      <ListItem data={{}} deleteItem={deleteItem} />,
    );
    //const deleteButton = getByTestId('item-delete-' + itemToAdd);
    //fireEvent.press(deleteButton);
  });
  it('then we do not have this item in our shopping list', async () => {
    const {queryByTestId} = app;
    //await waitFor(() => expect(queryByTestId('item-' + itemToAdd)));
  });
});
