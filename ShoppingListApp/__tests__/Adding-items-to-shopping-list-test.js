import 'react-native';
import React from 'react';
import App from '../App';

import {
  render,
  fireEvent,
  update,
  waitFor,
} from '@testing-library/react-native';

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

// Feature: Adding items to a shopping list
// Functional Requirement: As a shopper I want to add shopping items to my shopping list to keep track what items I need to get.

describe('adding a new item to a shopping list', () => {
  beforeAll(init);
  it('given we have a shopping list', async () => {
    const {getByTestId} = app;
    const shoppingList = getByTestId('shopping-list');
    expect(shoppingList).toBeTruthy();
  });
  it('when we add an item to the shopping list', async () => {
    const {getByTestId} = app;
    const input = getByTestId('shopping-list-input');
    fireEvent.changeText(input, itemToAdd);
    const addButton = getByTestId('shopping-list-add');
    fireEvent.press(addButton);
  });
  it('then we have this item in our shopping list', async () => {
    const {queryByTestId} = app;
    await waitFor(() => expect(queryByTestId('item-' + itemToAdd)));
  });

  afterAll(cleanup);
});

describe('adding an existing item to shopping list', async () => {
  beforeAll(init);

  it('given we have a shopping list with specific item', async () => {
    const {getByTestId} = app;
    const shoppingList = getByTestId('shopping-list');
    expect(shoppingList).toBeTruthy();
    const input = getByTestId('shopping-list-input');
    fireEvent.changeText(input, itemToAdd);
    const addButton = getByTestId('shopping-list-add');
    fireEvent.press(addButton);
    const {queryByTestId} = app;
    await waitFor(() => expect(queryByTestId('item-' + itemToAdd)));
  });
  it('when we add an item to the shopping list', async () => {
    const {getByTestId} = app;
    const input = getByTestId('shopping-list-input');
    fireEvent.changeText(input, itemToAdd);
    const addButton = getByTestId('shopping-list-add');
    fireEvent.press(addButton);
  });
  it('then we get a warning that this item in our shopping list', async () => {
    const {queryByTestId} = app;
    await waitFor(() => expect(queryByTestId('warning')));
  });

  afterAll(cleanup);
});
