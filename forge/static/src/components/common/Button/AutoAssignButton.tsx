import { Button } from "@mui/material"
import React, { useCallback } from "react"
import { RandomAssignModal } from "../../../features/Modal/RandomAssignModal";
import { useTypedSelector } from "../../../hooks/useTypedSelector";



export const AutoAssignButton = () => {
    const [open, setOpen] = React.useState(false);
    const selectedProject = useTypedSelector(state => state.selectedProject);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Button disabled={selectedProject === ''} variant="contained" color="primary" onClick={handleClickOpen}>
                Auto-assign unassigned
            </Button>
            <RandomAssignModal open={open} handleClose={handleClose} />
        </>
    )
}