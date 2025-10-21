import { MenuItem, Select } from "@mui/material"
import React, { useEffect } from "react"
import { useLazyGetTasksQuery } from "../store/api/task";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { actions } from "../store/api/taskSlice/taskSlice";
import { actions as actionSelect } from "../store/api/projectSlice/selectedProjectSlice";
import { useGetProjectsQuery } from "../store/api/project";


export const SelectProject = () => {

    const [project, setProject] = React.useState<string>('');
    const [getTasks] = useLazyGetTasksQuery();
    const { data: projects } = useGetProjectsQuery();
    const dispatch = useDispatch();

    const chooseProject = React.useCallback((key: string) => {
        setProject(key);
        dispatch(actions.clearTaskList());
        dispatch(actionSelect.setSelectedProject(key))
        dispatch(actions.setLoading(true))
        getTasks({ projectKey: key }).unwrap().then((data) => {
            dispatch(actions.setTaskList(data.issues));
            dispatch(actions.setLoading(false));
        }).catch((error) => {
            toast.error('Error getting tasks', { position: "bottom-right" });
        });
    }, [dispatch, getTasks]);

    useEffect(() => {
        if (projects && projects.values && projects.values.length > 0) {
            setProject(projects.values[0].id);
            dispatch(actionSelect.setSelectedProject(projects.values[0].id))
            dispatch(actions.setLoading(true))
            getTasks({ projectKey: projects.values[0].key }).unwrap().then((data) => {
                dispatch(actions.setTaskList(data.issues));
                dispatch(actions.setLoading(false));
            }).catch((error) => {
                toast.error('Error getting tasks', { position: "bottom-right" });
            });
        }
    }, [projects])

    return (
        <Select
            value={project}
            size="small"
            onChange={(e) => chooseProject(e.target.value)}
        >
            {projects && projects.values && projects.values.map((proj: any) => (
                <MenuItem key={proj.id} value={proj.id}>{proj.name}</MenuItem>
            ))}
        </Select>
    )
}
