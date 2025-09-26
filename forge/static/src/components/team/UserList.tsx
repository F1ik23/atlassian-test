import { Skeleton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { HeadStyle } from '../common/Table/HeadCellStyled';
import React from 'react';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { Issues } from '../../types/task.types';
import { TeamRow } from './TeamRow';
import { useLazyGetAllTeamQuery } from '../../store/api/team';
import { UserTeam } from '../../types/user.types';


export const UserList = () => {

    const [getAllTeam, {data, isLoading, isFetching}] = useLazyGetAllTeamQuery();
    const selectedProject = useTypedSelector(state => state.selectedProject);

    React.useEffect(() => {
        getAllTeam({projectId: selectedProject}).unwrap().then(data => console.log(data));
    }, [selectedProject])

    return (
        <>
            <TableContainer>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <HeadStyle>Name</HeadStyle>
                            <HeadStyle>Assigned issues</HeadStyle>
                            <HeadStyle>Activity</HeadStyle>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {isLoading || isFetching ? ([...Array(5)].map((_, index) => (
                            <TableRow key={index}>
                                <TableCell colSpan={3}>
                                    <Skeleton variant='rectangular' animation='wave' height={40} />
                                </TableCell>
                            </TableRow>
                        ))) : data && data.length > 0 && data.map((item: UserTeam) => (
                            <TeamRow key={item.accountId} item={item} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}