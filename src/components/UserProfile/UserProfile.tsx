import React, { useState, useEffect } from 'react';
import UserProfileView from './UserProfileView';
import type { User } from '../../types';

interface UserProfileContainerProps {
  user: User | null;
  currentUser: User;
  onSave: (userId: string, updated: Partial<User>) => void;
}

const UserProfile: React.FC<UserProfileContainerProps> = ({
  user,
  currentUser,
  onSave,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<User>>({
    username: user?.username || '',
    email: user?.email || '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username,
        email: user.email,
      });
    } else {
      setFormData({ username: '', email: '' });
    }
    setIsEditing(false);
  }, [user]);

  const handleChange = (field: keyof User, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (user) {
      onSave(user.id, formData);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    if (user) {
      setFormData({
        username: user.username,
        email: user.email,
      });
    }
    setIsEditing(false);
  };

  const handleEditStart = () => {
    setIsEditing(true);
  };

  return (
    <UserProfileView
      user={user}
      currentUser={currentUser}
      isEditing={isEditing}
      formData={formData}
      onChange={handleChange}
      onSave={handleSave}
      onCancel={handleCancel}
      onEditStart={handleEditStart}
    />
  );
};

export default UserProfile;