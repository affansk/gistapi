import React, { createContext, useEffect, useMemo, useCallback, useReducer } from 'react';
import styled from 'styled-components'
import Header from "./components/Header";
import GistList from "./components/GistList";
import GlobalStyles from "./GlobalStyle";
import { useDispatch, useSelector } from 'react-redux';
import { getGist } from './slice/HomeSlice'
export const gistContext = createContext(null);


/* I am using Local useReducer, as it is better approach then useState, when you have multiple States on Scree. as it makes code very clean */

const GistLocalReducer = (prevState, action) => {
  switch (action.type) {
    case 'setGistList':
      return {
        ...prevState,
        gistList: action.payload,
      };
    case 'setFilterGist':
      return {
        ...prevState,
        filterGist: action.payload,
      };
    case 'setSText':
      return {
        ...prevState,
        sText: action.payload,
      };
    default:
      break;
  }
};

const localInitialState = {
  gistList: [],
  filterGist: [],
  sText: '',
};

const App = () => {
  const dispatch = useDispatch();
  const [localState, dispatcher] = useReducer(GistLocalReducer, localInitialState);
  const { gistList, filterGist, sText } = localState;
  const gist = useSelector(state => state?.home); // this is redux selector to catch data globally within the app
  const { gistLoading,gistError } = gist;
  /*
  * This useEffect Hooks call Data fronm API
  * Input: get method to call api
  * Output: it will return array of object from api response
  */
  useEffect(() => {
    const fetchData = async () => {
      dispatch(
        getGist()
      );
    };
    fetchData()
  }, [dispatch]);


  /*
 * This useEffect Hooks set gist List in State, so we an filter data for later use without calling API Again
 * Input: Gist Data comes from API and then we set the state
 * Output: will set the state for later use
 */

  useEffect(() => {
    if (gist?.gistData !== undefined) {
      dispatcher({ type: 'setGistList', payload: gist?.gistData });
    }
  }, [gist]);

  /*
 * This useMemo Hooks use to avoid re render of component for better performance
 * Input: use component inside usememo, and when required we can pass dependency, whenever we want to update this component based on event
 * Output: will give memoize format of component
 */

  const memoizeHeader = useMemo(() => {
    return (
      <Header />
    );
  }, []);

  /*
* This useMemo Hooks use to avoid re render of component for better performance, it will only re render when list of data changes
* Input: use component inside usememo, and when required we can pass dependency, whenever we want to update this component based on event
* Output: will give memoize format of component
*/

  const memoizeGistList = useMemo(() => {
    return (
      <GistList gist={filterGist.length > 0 ? filterGist : gistList} filterObjectLength={filterGist?.length} isLoading={gistLoading} sText={sText} isError={gistError ? true : false} />
    );
  }, [gistList, filterGist, gistLoading, sText,gistError]);

  /*
* This Method is using useCallback and getting called from search Component via context
* Input: will take input
* Output: will filter out the list by name
*/
  const searchTextGist = useCallback((event) => {
    const text = event.target.value.trim().toLowerCase();
    dispatcher({ type: 'setSText', payload: text }); // setSText(text);
    const getFilteredData = filterByName(gistList, text);
    dispatcher({ type: 'setFilterGist', payload: getFilteredData }); //setFilterGist(getFilteredData);
  }, [gistList]);

  /*
* This Method is using useCallback and getting called from searchText Method, it will filter the list by name and show you those details.
* Input: will take Text as Input
* Output: will filter out the list by name
*/
  const filterByName = useCallback((object, text) => {
    return object.filter(item => {
      const { owner } = item;
      return owner?.login.toLowerCase().includes(text);
    });
  }, []);


  // From Here it starts the main jsx where you return the View
  // i am using context hook to pass function refrence to deep down component. so i dont need to create hierrachy by passing ref function to parent
  return (
    <gistContext.Provider value={{
      searchText: searchTextGist
    }}>
      <Wrapper className="App" data-testid="app">
        <GlobalStyles />
        {memoizeHeader}
        {memoizeGistList}
      </Wrapper>
    </gistContext.Provider>
  );
}

const Wrapper = styled.div`
  font-size: 14px;
  line-height: 1.5;
`;

export default App;
