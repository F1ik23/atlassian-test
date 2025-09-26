import { createSlice } from "@reduxjs/toolkit";


const initialState: string = '';

export const selectedProjectSlice = createSlice({
    name: 'selectedProject',
    initialState,
    reducers: {
        setSelectedProject: (state, { payload: data }) => {
            return data;
        },
        clearSelectedProject: () => {
            return initialState;
        }
    }
});

export const { actions, reducer } = selectedProjectSlice;

export default selectedProjectSlice.reducer;