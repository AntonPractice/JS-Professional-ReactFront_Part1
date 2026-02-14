import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  Grid,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import type { CreateProductDto, ProductCategory, ProductBrand, ProductPower } from '../../types';
import styles from './AddProductModal.module.scss';

interface AddProductModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (product: CreateProductDto) => void;
}

const categoryOptions: ProductCategory[] = ['split', 'window', 'mobile', 'cassette'];
const brandOptions: ProductBrand[] = ['daikin', 'mitsubishi', 'lg', 'samsung'];
const powerOptions: ProductPower[] = [7000, 9000, 12000, 18000];

const AddProductModal: React.FC<AddProductModalProps> = ({ open, onClose, onAdd }) => {
  const [formData, setFormData] = useState<CreateProductDto>({
    name: '',
    description: '',
    price: 0,
    category: 'split',
    brand: 'daikin',
    power: 7000,
    inStock: true,
    images: [],
  });

  const handleChange = (field: keyof CreateProductDto, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    onAdd(formData);
    onClose();
    // Сброс формы
    setFormData({
      name: '',
      description: '',
      price: 0,
      category: 'split',
      brand: 'daikin',
      power: 7000,
      inStock: true,
      images: [],
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Добавление нового товара</DialogTitle>
      <DialogContent className={styles.content}>
        <TextField
          label="Название"
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Описание"
          value={formData.description}
          onChange={(e) => handleChange('description', e.target.value)}
          fullWidth
          margin="normal"
          multiline
          rows={3}
        />
        <TextField
          label="Цена"
          type="number"
          value={formData.price}
          onChange={(e) => handleChange('price', Number(e.target.value))}
          fullWidth
          margin="normal"
          required
        />
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              select
              label="Категория"
              value={formData.category}
              onChange={(e) => handleChange('category', e.target.value)}
              fullWidth
              margin="normal"
            >
              {categoryOptions.map((opt) => (
                <MenuItem key={opt} value={opt}>
                  {opt}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField
              select
              label="Бренд"
              value={formData.brand}
              onChange={(e) => handleChange('brand', e.target.value)}
              fullWidth
              margin="normal"
            >
              {brandOptions.map((opt) => (
                <MenuItem key={opt} value={opt}>
                  {opt}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField
              select
              label="Мощность"
              value={formData.power}
              onChange={(e) => handleChange('power', Number(e.target.value))}
              fullWidth
              margin="normal"
            >
              {powerOptions.map((opt) => (
                <MenuItem key={opt} value={opt}>
                  {opt} BTU
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.inStock}
                  onChange={(e) => handleChange('inStock', e.target.checked)}
                />
              }
              label="В наличии"
              style={{ marginTop: 16 }}
            />
          </Grid>
        </Grid>
        <TextField
          label="Изображения (ссылки через запятую)"
          value={formData.images?.join(', ') || ''}
          onChange={(e) =>
            handleChange(
              'images',
              e.target.value.split(',').map((s) => s.trim()).filter(Boolean)
            )
          }
          fullWidth
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Отмена</Button>
        <Button onClick={handleSubmit} variant="contained">
          Добавить
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddProductModal;