import React from 'react';
import { TableRow, TableCell, Avatar, Typography, Stack } from '@mui/material';
import { UserTeam } from '../../types/user.types';

interface TeamRowProps {
    item: UserTeam,
}

export const TeamRow = React.memo(({ item }: TeamRowProps) => {

    return (
        <TableRow
            key={item.accountId}
            hover
            sx={{
                '&:hover': { cursor: 'pointer' },
            }}
        >
            <TableCell>
                <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar
                        alt={item.displayName}
                        src={item.avatarUrls["32x32"]}
                        sx={{ width: 24, height: 24 }}
                    />
                    <Typography variant="h6">{item.displayName}</Typography>
                </Stack>
            </TableCell>
            <TableCell sx={{textAlign: "center"}}><Typography variant="h6">{item.assignedTasks}</Typography></TableCell>
            <TableCell sx={{textAlign: "center"}}><Typography variant="h6">{item.updatedTasksLastWeek}</Typography></TableCell>
        </TableRow>
    );
});