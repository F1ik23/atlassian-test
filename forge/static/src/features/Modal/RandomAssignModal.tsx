import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import React from "react";
import { useAutoAssignMutation, useLazyGetTasksQuery } from "../../store/api/task";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useDispatch } from "react-redux";
import { actions } from "../../store/api/taskSlice/taskSlice";
import { toast } from "react-toastify";


interface RandomAssignModalProps {
    open: boolean,
    handleClose: () => void;
}

export const RandomAssignModal: React.FC<RandomAssignModalProps> = ({ open, handleClose }) => {

    const [autoAssign] = useAutoAssignMutation();
    const [getTasks] = useLazyGetTasksQuery();
    const dispatch = useDispatch();

    const selectedProject = useTypedSelector(state => state.selectedProject);
    
    const [loading, setLoading] = React.useState(false);

    const agreeClick = async () => {
        if (selectedProject !== '') {
            setLoading(true);
            await autoAssign({ projectKey: selectedProject }).unwrap().then(async (data) => {
                await getTasks({ projectKey: selectedProject }).unwrap().then((data) => {
                    dispatch(actions.setTaskList(data.issues));
                    toast.success('Users were successfulty assigned!', {position: "bottom-right"})
                }).catch((error) => {
                    toast.error('Get task error', { position: "bottom-right" });
                });
                
            }).catch((error) => {
                toast.error('Auto assigne error!', { position: "bottom-right" });
            });
        }
        setLoading(false);
        handleClose();
    }

    return (
        <Dialog
            open={open}
            onClose={() => {
                if (loading) return;
                handleClose()
            }}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {"Auto-assign"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Are you sure you want to automatically assign unassigned tasks to users?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button disabled={loading} onClick={handleClose}>Disagree</Button>
                <Button loading={loading} variant="contained" onClick={agreeClick} autoFocus>
                    Agree
                </Button>
            </DialogActions>
        </Dialog>
    )
}