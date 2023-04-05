import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import App, { gistContext } from './App';

// create a mock Redux store
const mockStore = configureStore([]);
const store = mockStore({
  home: {
    gistData: [
      { id: '1000', owner: { login: 'affanuser' } },
      { id: '90000', owner: { login: 'otheruser' } },
    ],
    gistLoading: false,
  },
});

describe('App', () => {
  it('renders the app and shows a list of gists', async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    // wait for the API call to complete and the data to be displayed
    await waitFor(() => {
      expect(screen.getByText(/affanuser/i)).toBeInTheDocument();
      expect(screen.getByText(/otheruser/i)).toBeInTheDocument();
    });
  });

  it('filters the gists by name when the search text changes', async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    // type a search query into the input field
    const searchInput = await screen.findByRole('textbox');
    userEvent.type(searchInput, 'affan');

    // wait for the filtered data to be displayed
    await waitFor(() => {
      expect(screen.getByText(/affanuser/i)).toBeInTheDocument();
      expect(screen.queryByText(/otheruser/i)).not.toBeInTheDocument();
    });
  });

});
