import { Skeleton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { HeadStyle } from '../common/Table/HeadCellStyled';
import React from 'react';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { Issues } from '../../types/task.types';
import { TaskRow } from './TaskRow';


export const TaskList = () => {

    const taskList = useTypedSelector(state => state.taskList);

    return (
        <>
            <TableContainer>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <HeadStyle>Key</HeadStyle>
                            <HeadStyle>Summary</HeadStyle>
                            <HeadStyle>Status</HeadStyle>
                            <HeadStyle>Assignee</HeadStyle>
                            <HeadStyle>Priority</HeadStyle>
                            <HeadStyle>Actions</HeadStyle>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {taskList.loading ? ([...Array(5)].map((_, index) => (
                            <TableRow key={index}>
                                <TableCell colSpan={6}>
                                    <Skeleton variant='rectangular' animation='wave' height={40} />
                                </TableCell>
                            </TableRow>
                        ))) : taskList && taskList.issues && taskList.issues.map((issue: Issues) => (
                            <TaskRow key={issue.id} issue={issue} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}