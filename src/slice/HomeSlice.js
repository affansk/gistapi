import { createSlice } from '@reduxjs/toolkit';
 export var initialState ={
    gistLoading : false,
    gistData : undefined,
    gistError : undefined
}

export const homeSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {
        getGist: state => {
            state.gistLoading = true;
        },
        gistSuccess: (state, data) => {
            state.gistLoading = false;
            state.gistData = data?.payload;
        },
        gistFailed: (state, data) => {
            state.gistLoading = false;
            state.gistError = data?.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const {
    getGist,
    gistSuccess,
    gistFailed,
} = homeSlice.actions;

export default homeSlice.reducer;