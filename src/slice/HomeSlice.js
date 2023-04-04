import { createSlice } from '@reduxjs/toolkit';



export const homeSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {
        getGist: state => {
            state.gistLoading = true;
        },
        gistSuccess: (state, payload) => {
            state.gistLoading = false;
            state.gistData = payload;
        },
        gistFailed: (state, payload) => {
            state.gistLoading = false;
            state.gistError = payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const {
    getGist,
    gistSuccess,
    gistFailed
} = homeSlice.actions;

export default homeSlice.reducer;