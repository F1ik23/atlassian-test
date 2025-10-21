import { Projects } from "../../types/project.types";
import { api } from "./api";


export const projectApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getProjects: builder.query<Projects, void>({
            query: () => ({ endpoint: 'project' }),
        })
    }),
})

export const {
    useGetProjectsQuery,
} = projectApi;