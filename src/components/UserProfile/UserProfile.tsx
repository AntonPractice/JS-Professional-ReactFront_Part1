import React, { useState, useEffect } from 'react';
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

interface UserProfileProps {
  user: User | null;
  currentUser: User;
  onSave: (userId: string, updated: Partial<User>) => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ user, currentUser, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<User>>({
    username: '',
    email: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username,
        email: user.email,
      });
    }
  }, [user]);

  if (!user) {
    return (
      <Paper className={styles.profile}>
        <Typography variant="body1">Выберите пользователя для просмотра</Typography>
      </Paper>
    );
  }

  const isOwnProfile = currentUser.id === user.id;
  const canEdit = currentUser.role === 'admin' || isOwnProfile;

  const handleChange = (field: keyof User, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    onSave(user.id, formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      username: user.username,
      email: user.email,
    });
    setIsEditing(false);
  };

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
              onChange={(e) => handleChange('username', e.target.value)}
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
              onChange={(e) => handleChange('email', e.target.value)}
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
                <Button variant="contained" onClick={handleSave}>
                  Сохранить
                </Button>
                <Button variant="outlined" onClick={handleCancel}>
                  Отмена
                </Button>
              </>
            ) : (
              <Button variant="outlined" onClick={() => setIsEditing(true)}>
                Редактировать профиль
              </Button>
            )}
          </Box>
        )}
      </Box>
    </Paper>
  );
};

export default UserProfile;