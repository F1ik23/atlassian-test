import React from "react";
import { UserList } from "../components/team/UserList";
import { TeamControlPanel } from "../components/team/TeamControlPanel";



export default function Team() {

    return (
        <>
            <TeamControlPanel />
            <UserList />
        </>
    )

}