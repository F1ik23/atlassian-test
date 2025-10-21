import { Grid, Paper, Typography } from "@mui/material"
import React from "react"
import { useTypedSelector } from "../hooks/useTypedSelector";



export const ProjectStat = () => {

    const taskList = useTypedSelector(state => state.taskList);

    return (
        <Grid container direction="row" spacing={2} sx={{ width: 'auto' }}>
            <Grid>
                <Paper sx={{ p: 1, minWidth: 100 }}>
                    <Typography variant="subtitle2">Total</Typography>
                    <Typography variant="h6">{taskList?.issues?.length || 0}</Typography>
                </Paper>
            </Grid>
            <Grid>
                <Paper sx={{ p: 1, minWidth: 100 }}>
                    <Typography variant="subtitle2">Unassigned</Typography>
                    <Typography variant="h6" color="error">{taskList.unassigned}</Typography>
                </Paper>
            </Grid>
            <Grid>
                <Paper sx={{ p: 1, minWidth: 100 }}>
                    <Typography variant="subtitle2">Due Soon</Typography>
                    <Typography variant="h6" color="warning.main">{taskList.lowFire}</Typography>
                </Paper>
            </Grid>
        </Grid>
    )
}