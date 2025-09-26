import { TaskResponce } from "../../types/task.types";
import { api } from "./api";


export const taskApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getTasks: builder.query<TaskResponce, { projectKey: string }>({
            query: ({projectKey}) => ({ endpoint: 'task', params: { projectKey } }),
            providesTags: ['Task']
        }),

        autoAssign: builder.mutation<void, { projectKey: string }>({
            query: ({projectKey}) => ({ endpoint: 'user', params: { projectKey } }),
            invalidatesTags: ['Task'],
        }),

        manualAssign: builder.mutation<void, { taskId: string, userId: string }>({
            query: (body) => ({ endpoint: 'manual', params: { taskId: body.taskId, userId: body.userId } }),
            invalidatesTags: ['Task'],
        }),

        upPriority: builder.mutation<void, { priority: string, taskId: string }>({
            query: (body) => ({ endpoint: 'priority', params: { riority: body.priority, taskId: body.taskId } }),
            invalidatesTags: ['Task'],
        })

    }),
})


export const {
    useLazyGetTasksQuery,
    useAutoAssignMutation,
    useManualAssignMutation,
    useUpPriorityMutation,
} = taskApi;