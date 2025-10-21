import { createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";
import { Issues } from "../../../types/task.types";

interface TaskState {
    issues: Issues[];
    unassigned: number;
    lowFire: number;
    loading: boolean;
}

const initialState: TaskState = {
    issues: [],
    unassigned: 0,
    lowFire: 0,
    loading: true
};

export const taskSlice = createSlice({
    name: 'taskList',
    initialState,
    reducers: {
        setLoading: (state, {payload: data}) => {
            state.loading = data;
        },
        setTaskList: (state, { payload: data }) => {
            let unassigned = 0;
            let lowFire = 0;
            if (data?.length > 0) {
                data.forEach((issue: any) => {
                    const assignee = issue.fields.assignee?.displayName;
                    const priority = issue.fields.priority?.name;
                    const dueDate = issue.fields.duedate;

                    if (!assignee) {
                        unassigned++;
                    }

                    if ((priority === "Low" || priority === "Lower" || priority === undefined ) && dueDate) {
                        const diffDays = dayjs(dueDate).diff(dayjs(), "day");
                        if (diffDays <= 4) {
                            lowFire++;
                        }
                    }
                });
            }
            state.issues = data;
            state.unassigned = unassigned;
            state.lowFire = lowFire;
        },
        clearTaskList: (state) => {
            state.issues = [];
            state.unassigned = 0;
            state.lowFire = 0;
        }
    }
})

export const { actions, reducer } = taskSlice;

export default taskSlice.reducer;