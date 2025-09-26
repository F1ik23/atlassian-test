import React from 'react';
import { TableRow, TableCell } from '@mui/material';
import { Issues } from '../../types/task.types';
import dayjs from 'dayjs';
import { FixButton } from './FixButton';

interface TaskRowProps {
    issue: Issues;
}

export const TaskRow = React.memo(({ issue }: TaskRowProps) => {

    const isLowOrUndefined = issue.fields.priority?.name === "Low"
        || issue.fields.priority?.name === "Lower"
        || issue.fields.priority?.name === undefined;

    const dueSoon = !!issue.fields.duedate &&
        dayjs(issue.fields.duedate).diff(dayjs(), "day") <= 4;

    return (
        <TableRow
            key={issue.id}
            className={`
                    row 
                    ${!issue.fields.assignee?.displayName ? "row--unassigned" : ""} 
                    ${isLowOrUndefined && dueSoon ? "row--priority-low" : ""}
            `}
        >
            <TableCell>{issue.key}</TableCell>
            <TableCell>{issue.fields.summary || ''}</TableCell>
            <TableCell>{issue.fields.status?.name || ''}</TableCell>
            <TableCell>{issue.fields.assignee?.displayName || ''}</TableCell>
            <TableCell>{issue.fields.priority?.name || ''}</TableCell>
            <TableCell sx={{ justifyContent: 'center' }}>
                <FixButton item={issue} />
            </TableCell>
        </TableRow>
    );
});
