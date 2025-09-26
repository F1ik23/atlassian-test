import { Tab, Tabs } from "@mui/material";
import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navigation() {

    const location = useLocation();

    const currentTab = location.pathname.startsWith("/tasks") ? 0 : 1;


    return (
        <div className="navigation">
            <Tabs value={currentTab} aria-label="Navigation Tabs">
                <Tab
                    className="nav-item"
                    label="Tasks"
                    component={Link}
                    to="/tasks"
                />
                <Tab
                    className="nav-item"
                    label="Team"
                    component={Link}
                    to="/team"
                />
            </Tabs>
        </div>
    )
}