import React from "react";
import { ControlPanel } from "../components/task/ControlPanel";
import { TaskList } from "../components/task/TaskList";



export default function Task() {

    return (
        <>
            <ControlPanel />
            <TaskList />
        </>
    )
}