import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { api } from './api/api';
import taskReducer from './api/taskSlice/taskSlice';
import projectReducer from './api/projectSlice/projectSlice';
import selectedProjectReducer from './api/projectSlice/selectedProjectSlice';

const reducers = combineReducers({
    selectedProject: selectedProjectReducer,
    projectList: projectReducer,
    taskList: taskReducer,
    [api.reducerPath]: api.reducer,
});

export const store = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
})


export type RootState = ReturnType<typeof store.getState>