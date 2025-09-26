import { createSlice } from "@reduxjs/toolkit";
import { Projects } from "../../../types/project.types";


const initialState = {} as Projects;

export const projectSlice = createSlice({
    name: 'projectList',
    initialState,
    reducers: {
        setProjectList: (state, { payload: data }) => {
            return data;
        },
        clearProjectList: () => {
            return {} as Projects;
        }
    }
});

export const { actions, reducer } = projectSlice;

export default projectSlice.reducer;