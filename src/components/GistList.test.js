import React from 'react';
import { render, screen } from '@testing-library/react';
import GistList from './GistList';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import gistsReducer from '../slice/HomeSlice';

describe('GistList component', () => {
  let store;
  beforeEach(() => {
    store = configureStore({
      reducer: {
        gists: gistsReducer,
      },
    });
  });

  it('should render "Gist Loading.." message when loading is true', () => {
    render(
      <Provider store={store}>
        <GistList isLoading={true} gist={[]} filterObjectLength={0}/>
      </Provider>
    );
    const loadingMessage = screen.getByText(/Gist Loading\.\./i);
    expect(loadingMessage).toBeInTheDocument();
  });

  it('should render "No Available Data" message when loading is false and gist prop is undefined', () => {
    render(
      <Provider store={store}>
        <GistList isLoading={false} gist={undefined} filterObjectLength={0} />
      </Provider>
    );
    const noDataMessage = screen.getByText(/No Available Data/i);
    expect(noDataMessage).toBeInTheDocument();
  });

  it('should render "No Data Found!" message when loading is false, gist prop is not undefined, and filterObjectLength is 0', () => {
    render(
      <Provider store={store}>
        <GistList isLoading={false} gist={[{ id: '123' }]} filterObjectLength={0} sText={"oliver"} />
      </Provider>
    );
    const noDataFoundMessage = screen.getByText(/No Data Found!/i);
    expect(noDataFoundMessage).toBeInTheDocument();
  });

  it('should render gist data when loading is false, gist prop is not undefined, and filterObjectLength is not 0', () => {
    const testGistData = [
      {
        id: '123',
        owner: {
          avatar_url: 'https://avatars.githubusercontent.com/u/8557526?v=4',
          login: 'testuser',
        },
        description: 'Test gist',
        files: {
          'test-file-1.js': {
            raw_url: 'https://gist.githubusercontent.com/AlenRedek/f48ecca295afaec18c532df2e32817dd/raw/e3fcaff5f1c64f63600881962ce303d68270a212/init.php',
          },
          'test-file-2.js': {
            raw_url: 'hhttps://gist.githubusercontent.com/AlenRedek/f48ecca295afaec18c532df2e32817dd/raw/e3fcaff5f1c64f63600881962ce303d68270a212/init.php',
          },
        },
        created_at: new Date('2022-01-01').toISOString(),
        updated_at: new Date('2022-01-02').toISOString(),
        forks_url: 'https://api.github.com/gists/f48ecca295afaec18c532df2e32817dd/forks',
        comments_url: 'https://api.github.com/gists/f48ecca295afaec18c532df2e32817dd/comments',
        starred_url: 'https://api.github.com/users/AlenRedek/starred{/owner}{/repo}',
      },
    ];

    render(
      <Provider store={store}>
        <GistList isLoading={false} gist={testGistData} filterObjectLength={1} />
      </Provider>
    );

    const gistData = screen.getByText(/testuser/i);
    const gistFiles = screen.getAllByText(/test-file/i);
    expect(gistData).toBeInTheDocument();
    expect(gistFiles.length).toBe(2);
  });
});
