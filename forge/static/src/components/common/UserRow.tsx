import React from 'react';
import { TableRow, TableCell, Avatar } from '@mui/material';
import { User } from '../../types/user.types';

interface UserRowProps {
    item: User,
    handleClick: (accountId: string) => void
}

export const UserRow = React.memo(({ item, handleClick }: UserRowProps) => {

    return (
        <TableRow
            key={item.accountId}
            onClick={() => handleClick(item.accountId)}
            hover
            sx={{
                '&:hover': {cursor: 'pointer'},
            }}
        >
            <TableCell>
                <Avatar
                    alt={item.displayName}
                    src={item.avatarUrls["48x48"]}
                    sx={{ width: 48, height: 48 }}
                />
            </TableCell>
            <TableCell>{item.displayName}</TableCell>
        </TableRow>
    );
});