import { AppBar, Grid} from "@mui/material";
import React from "react";
import { SelectProject } from "../../features/SelectProject";
import { ProjectStat } from "../../features/ProjectStat";
import { AutoAssignButton } from "../common/Button/AutoAssignButton";

export const ControlPanel = () => {

    return (
        <AppBar position="static" color="default" elevation={2} sx={{ p: 1 }}>
            <Grid container columns={3} alignItems="center" sx={{ justifyContent: 'space-between' }}>
                <SelectProject />

                <ProjectStat />

                <AutoAssignButton />
            </Grid>
        </AppBar>
    )
}