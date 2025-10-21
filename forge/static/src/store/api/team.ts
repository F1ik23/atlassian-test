import { User, UserTeam } from "../../types/user.types";
import { api } from "./api";



export const userApi = api.injectEndpoints({
    endpoints: builder => ({
        getAssignable: builder.query<User[], {projectKey: string}>({
            query: ({projectKey}) => ({ endpoint: 'assignable', params: { projectKey } }),
            providesTags: ['User']
        }),

        getAllTeam: builder.query<UserTeam[], {projectId: string}>({
            query: ({projectId}) => ({ endpoint: 'project-users', params: { projectId } }),
        })
    })
})

export const {
    useLazyGetAssignableQuery,
    useLazyGetAllTeamQuery
} = userApi;