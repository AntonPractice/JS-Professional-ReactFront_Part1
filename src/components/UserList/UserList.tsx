import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Select,
  MenuItem,
  Chip,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import type { User, UserRole } from '../../types';
import styles from './UserList.module.scss';

interface UserListProps {
  users: User[];
  isAdmin: boolean;
  onUpdateUserRole: (userId: string, newRole: UserRole) => void;
  onDeleteUser: (userId: string) => void;
  onSelectUser: (user: User) => void;
}

const UserList: React.FC<UserListProps> = ({
  users,
  isAdmin,
  onUpdateUserRole,
  onDeleteUser,
  onSelectUser,
}) => {
  const [editingRole, setEditingRole] = useState<{ id: string; role: UserRole } | null>(null);

  const handleRoleChange = (userId: string, role: UserRole) => {
    setEditingRole({ id: userId, role });
  };

  const handleRoleBlur = (userId: string) => {
    if (editingRole && editingRole.id === userId) {
      onUpdateUserRole(userId, editingRole.role);
      setEditingRole(null);
    }
  };

  return (
    <div className={styles.userList}>
      <Typography variant="h5" gutterBottom>
        Управление пользователями
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Имя пользователя</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Роль</TableCell>
              <TableCell>Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow
                key={user.id}
                hover
                sx={{ cursor: 'pointer' }}
                onClick={() => onSelectUser(user)}
              >
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell onClick={(e) => e.stopPropagation()}>
                  {isAdmin ? (
                    <Select
                      value={editingRole?.id === user.id ? editingRole.role : user.role}
                      onChange={(e) => handleRoleChange(user.id, e.target.value as UserRole)}
                      onBlur={() => handleRoleBlur(user.id)}
                      size="small"
                      sx={{ minWidth: 100 }}
                    >
                      <MenuItem value="user">user</MenuItem>
                      <MenuItem value="admin">admin</MenuItem>
                    </Select>
                  ) : (
                    <Chip label={user.role} size="small" color={user.role === 'admin' ? 'secondary' : 'default'} />
                  )}
                </TableCell>
                <TableCell onClick={(e) => e.stopPropagation()}>
                  {isAdmin && user.role !== 'admin' && (
                    <IconButton
                      color="error"
                      onClick={() => onDeleteUser(user.id)}
                      size="small"
                    >
                      <DeleteIcon />
                    </IconButton>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default UserList;