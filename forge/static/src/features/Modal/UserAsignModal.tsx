import React from "react"
import { useLazyGetTasksQuery, useManualAssignMutation } from "../../store/api/task"
import { Backdrop, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Skeleton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { useLazyGetAssignableQuery } from "../../store/api/team"
import { useTypedSelector } from "../../hooks/useTypedSelector"
import { UserRow } from "../../components/common/UserRow"
import { User } from "../../types/user.types"
import { toast } from "react-toastify"
import { useDispatch } from "react-redux"
import { actions } from "../../store/api/taskSlice/taskSlice"

interface UserAsignModalProps {
    open: boolean
    handleClose: () => void
    taskId: string
}


export const UserAsignModal: React.FC<UserAsignModalProps> = ({ open, handleClose, taskId }) => {

    const [manualAssign, { isLoading: manualLoading }] = useManualAssignMutation();
    const [getAssignable, { isLoading, isFetching }] = useLazyGetAssignableQuery();
    const [getTasks] = useLazyGetTasksQuery();
    const dispatch = useDispatch();
    const selectedProject = useTypedSelector(state => state.selectedProject)

    const [users, setUsers] = React.useState<User[]>([]);

    const handleClick = async (accountId: string) => {
        console.log('handleClick')
        if (accountId !== '') {
            await manualAssign({ taskId: taskId, userId: accountId }).unwrap().then(async () => {
                await getTasks({ projectKey: selectedProject }).unwrap().then((data) => {
                    dispatch(actions.setTaskList(data.issues));
                    toast.success('User was successfulty assigned!', { position: "bottom-right" })
                }).catch((error) => {
                    toast.error('Get task error', { position: "bottom-right" });
                });
            }).catch((error) => {
                toast.error('Assign user error!', { position: "bottom-right" });
            });
        }
        handleClose();
    }

    React.useEffect(() => {
        getAssignable({ projectKey: selectedProject }).unwrap().then(data => {
            setUsers(data);
        })
    }, [])

    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"User assign"}
                </DialogTitle>
                <DialogContent>
                    {(manualLoading || isFetching) && (
                        <Backdrop
                            open={true}
                            sx={{ position: 'absolute', zIndex: 2 }}
                        >
                            <CircularProgress />
                        </Backdrop>
                    )}
                    <TableContainer>
                        <Table size="medium">
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ width: '150px' }} />
                                    <TableCell sx={{ width: '200px' }} />
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {isLoading ? ([...Array(5)].map((_, index) => (
                                    <TableRow key={index}>
                                        <TableCell colSpan={2}>
                                            <Skeleton variant='rectangular' animation='wave' height={40} />
                                        </TableCell>
                                    </TableRow>
                                ))) : users && users.map(item => (
                                    <UserRow item={item} handleClick={handleClick} />
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </>
    )
}