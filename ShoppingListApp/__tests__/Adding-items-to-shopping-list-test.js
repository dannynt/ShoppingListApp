import 'react-native';
import React from 'react';
import App from '../App';
import Header from '../components/Header';

import {render, fireEvent, waitFor} from '@testing-library/react-native';

let app = undefined;
const itemToAdd = '[TESTING] item649206483ef5';

const init = async () => {
  app = render(<App />);
};

const cleanup = async () => {
  const {getByTestId} = app;
  const deleteButton = getByTestId('item-delete-' + itemToAdd);
  fireEvent.press(deleteButton);
};

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
};

// Feature: Adding items to a shopping list
// Functional Requirement: As a shopper I want to add shopping items to my shopping list to keep track what items I need to get.

describe('adding a new item to a shopping list', () => {
  beforeAll(init);
  it('given we have a shopping list', async () => {
    const shoppingList = app.getByTestId('shopping-list');
    expect(shoppingList).toBeTruthy();
  });
  it('when we add an item to the shopping list', async () => {
    const header = render(<Header addItem={addItem} />);
    const input = header.getByTestId('shopping-list-input');

    fireEvent.changeText(input, itemToAdd);
    const addButton = header.getByTestId('shopping-list-add');
    fireEvent.press(addButton);
  });
  it('then we have this item in our shopping list', async () => {
    app = render(<App />);
    await waitFor(() => expect(app.queryByTestId('item-' + itemToAdd)));
  });

  afterAll(cleanup);
});
