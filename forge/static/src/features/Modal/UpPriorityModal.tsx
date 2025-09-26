import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material"
import React from "react"
import { useLazyGetTasksQuery, useUpPriorityMutation } from "../../store/api/task"
import { toast } from "react-toastify"
import { useTypedSelector } from "../../hooks/useTypedSelector"
import { useDispatch } from "react-redux"
import { actions } from "../../store/api/taskSlice/taskSlice"

interface UpPriorityModalProps {
    open: boolean
    handleClose: () => void
    id: string
}


export const UpPriorityModal: React.FC<UpPriorityModalProps> = ({ open, handleClose, id }) => {

    const [upPriority] = useUpPriorityMutation();
    const [getTasks] = useLazyGetTasksQuery();
    const selectedProject = useTypedSelector(state => state.selectedProject);
    const dispatch = useDispatch();

    const [loading, setLoading] = React.useState(false);

    const handleClick = async (value: string) => {
        setLoading(true);
        await upPriority({ priority: value, taskId: id }).unwrap().then(async () => {
            await getTasks({ projectKey: selectedProject }).unwrap().then((data) => {
                dispatch(actions.setTaskList(data.issues));
                toast.success('Users were successfulty assigned!', { position: "bottom-right" })
            }).catch((error) => {
                toast.error('Get task error', { position: "bottom-right" });
            });
        }).catch((error) => {
            toast.error('Priority increase error!', { position: "bottom-right" });
        });
        setLoading(false);
        handleClose();
    }

    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Up issue's priority"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        This task has a low priority and is due soon. Please increase its priority to medium or high.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button disabled={loading} onClick={handleClose}>Cancel</Button>
                    <Button loading={loading} variant="contained" onClick={(e) => handleClick("3")}>Medium</Button>
                    <Button loading={loading} variant="contained" onClick={(e) => handleClick("2")}>High</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}