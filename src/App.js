import React, { createContext, useEffect, useState, useMemo } from 'react';
import styled from 'styled-components'
import Header from "./components/Header";
import GistList from "./components/GistList";
import GlobalStyles from "./GlobalStyle";
import { useDispatch, useSelector } from 'react-redux';
import { getGist } from './slice/HomeSlice'
export const gistContext = createContext(null);
const App = () => {
  const dispatch = useDispatch();
  const gist = useSelector(state => state?.home); // this is redux selector to catch data globally within the app
  const [gistList, setGistList] = useState([]) // this will setstate once api gives response

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
      setGistList(gist?.gistData)
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
      <GistList gist={gistList} />
    );
  }, [gistList]);

  /*
* This Method is getting called from search Component via context
* Input: will take input
* Output: will filter out the list by name
*/
  const searchText = (event) => {
    console.log("text", event.target.value)
  }


  // From Here it starts the main jsx where you return the View
  // i am using context jook to pass function refrence to deep down component. so i dont need to create hierrachy by passing function to parent
  return (
    <gistContext.Provider value={{
      searchText:searchText
    }}> 
      <Wrapper className="App" data-testid="app">
        {memoizeHeader}
        {memoizeGistList}
        <GlobalStyles />
      </Wrapper>
    </gistContext.Provider>
  );
}

const Wrapper = styled.div`
  font-size: 14px;
  line-height: 1.5;
`;

export default App;
