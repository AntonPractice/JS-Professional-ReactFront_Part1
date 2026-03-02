import React from 'react';
import {
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Avatar,
  Grid,
} from '@mui/material';
import type { User } from '../../types';
import styles from './UserProfile.module.scss';

interface UserProfileViewProps {
  user: User | null;
  currentUser: User;
  isEditing: boolean;
  formData: Partial<User>;
  onChange: (field: keyof User, value: string) => void;
  onSave: () => void;
  onCancel: () => void;
  onEditStart: () => void;
}

const UserProfileView: React.FC<UserProfileViewProps> = ({
  user,
  currentUser,
  isEditing,
  formData,
  onChange,
  onSave,
  onCancel,
  onEditStart,
}) => {
  if (!user) {
    return (
      <Paper className={styles.profile}>
        <Typography variant="body1">Выберите пользователя для просмотра</Typography>
      </Paper>
    );
  }

  const isOwnProfile = currentUser.id === user.id;
  const canEdit = currentUser.role === 'admin' || isOwnProfile;

  return (
    <Paper className={styles.profile}>
      <Box className={styles.header}>
        <Avatar className={styles.avatar}>
          {user.username[0].toUpperCase()}
        </Avatar>
        <Typography variant="h5">{user.username}</Typography>
        <Typography variant="body2" color="text.secondary">
          Роль: {user.role}
        </Typography>
      </Box>

      <Box className={styles.form}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Имя пользователя"
              value={isEditing ? formData.username : user.username}
              onChange={(e) => onChange('username', e.target.value)}
              disabled={!isEditing}
              fullWidth
              variant={isEditing ? 'outlined' : 'filled'}
              margin="normal"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              value={isEditing ? formData.email : user.email}
              onChange={(e) => onChange('email', e.target.value)}
              disabled={!isEditing}
              fullWidth
              variant={isEditing ? 'outlined' : 'filled'}
              margin="normal"
            />
          </Grid>
        </Grid>

        {canEdit && (
          <Box className={styles.actions}>
            {isEditing ? (
              <>
                <Button variant="contained" onClick={onSave}>
                  Сохранить
                </Button>
                <Button variant="outlined" onClick={onCancel}>
                  Отмена
                </Button>
              </>
            ) : (
              <Button variant="outlined" onClick={onEditStart}>
                Редактировать профиль
              </Button>
            )}
          </Box>
        )}
      </Box>
    </Paper>
  );
};

export default UserProfileView;