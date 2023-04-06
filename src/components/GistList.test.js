import React from 'react';
import { render as rtlRender, screen } from '@testing-library/react';
import GistList from './GistList';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import gistsReducer from '../slice/HomeSlice';


describe('GistList component', () => {
  let store;
  let render;
  beforeEach(() => {
    store = configureStore({ reducer: { gists: gistsReducer } });
    render = component => rtlRender(
      <Provider store={store}>
        {component}
      </Provider>
    )
  });

  it('should render "Gist Loading.." message when loading is true', () => {
    render(
        <GistList isLoading={true} gist={[]} filterObjectLength={0}/>
    );
    const loadingMessage = screen.getByText(/Gist Loading\.\./i);
    expect(loadingMessage).toBeInTheDocument();
  });

  it('should render "Some Problem in Loading Data" message when loading is false and gist prop is undefined', () => {
    render(
        <GistList isLoading={false} gist={undefined} filterObjectLength={0} isError={true}/>
    );
    const noDataMessage = screen.getByText(/Some Problem in Loading Data/i);
    expect(noDataMessage).toBeInTheDocument();
  });

  it('should render "No Data Found!" message when loading is false, gist prop is not undefined, and filterObjectLength is 0', () => {
    render(
        <GistList isLoading={false} gist={[{ id: '123' }]} filterObjectLength={0} sText={"oliver"} />
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
          login: 'affanuser',
        },
        description: 'Test gist',
        files: {
          'gist-file-1.js': {
            raw_url: 'https://gist.githubusercontent.com/AlenRedek/f48ecca295afaec18c532df2e32817dd/raw/e3fcaff5f1c64f63600881962ce303d68270a212/init.php',
          },
          'gist-file-2.js': {
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
        <GistList isLoading={false} gist={testGistData} filterObjectLength={1} />
    );

    const gistData = screen.getByText(/affanuser/i);
    const gistFiles = screen.getAllByText(/gist-file/i);
    expect(gistData).toBeInTheDocument();
    expect(gistFiles.length).toBe(2);
  });
});
