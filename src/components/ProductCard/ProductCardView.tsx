import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Chip,
  IconButton,
  TextField,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Button,
  Grid,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import type { Product, ProductCategory, ProductBrand, ProductPower } from '../../types';
import placeholder from '../../assets/placeholder.png';
import styles from './ProductCard.module.scss';

interface ProductCardViewProps {
  product: Product;
  isAdmin: boolean;
  onDelete?: (id: string) => void;
  isEditing: boolean;
  editedProduct: Partial<Product>;
  onEditChange: (field: keyof Product, value: any) => void;
  onEditSave: () => void;
  onEditCancel: () => void;
  onEditStart: () => void;
}

const categoryOptions: ProductCategory[] = ['split', 'window', 'mobile', 'cassette'];
const brandOptions: ProductBrand[] = ['daikin', 'mitsubishi', 'lg', 'samsung'];
const powerOptions: ProductPower[] = [7000, 9000, 12000, 18000];

const ProductCardView: React.FC<ProductCardViewProps> = ({
  product,
  isAdmin,
  onDelete,
  isEditing,
  editedProduct,
  onEditChange,
  onEditSave,
  onEditCancel,
  onEditStart,
}) => {
  const previewImage = product.images?.[0] || placeholder;

  return (
    <Card className={styles.card}>
      <CardMedia
        component="img"
        height="180"
        image={previewImage}
        alt={product.name}
        className={styles.media}
      />
      <CardContent className={styles.content}>
        {isEditing ? (
          <Box className={styles.editForm}>
            <TextField
              label="Название"
              value={editedProduct.name || ''}
              onChange={(e) => onEditChange('name', e.target.value)}
              size="small"
              fullWidth
              margin="dense"
            />
            <TextField
              label="Описание"
              value={editedProduct.description || ''}
              onChange={(e) => onEditChange('description', e.target.value)}
              size="small"
              fullWidth
              margin="dense"
              multiline
              rows={2}
            />
            <TextField
              label="Цена"
              type="number"
              value={editedProduct.price || ''}
              onChange={(e) => onEditChange('price', Number(e.target.value))}
              size="small"
              fullWidth
              margin="dense"
            />
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <TextField
                  select
                  label="Категория"
                  value={editedProduct.category || ''}
                  onChange={(e) => onEditChange('category', e.target.value)}
                  size="small"
                  fullWidth
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
                  value={editedProduct.brand || ''}
                  onChange={(e) => onEditChange('brand', e.target.value)}
                  size="small"
                  fullWidth
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
                  value={editedProduct.power || ''}
                  onChange={(e) => onEditChange('power', Number(e.target.value))}
                  size="small"
                  fullWidth
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
                      checked={editedProduct.inStock || false}
                      onChange={(e) => onEditChange('inStock', e.target.checked)}
                    />
                  }
                  label="В наличии"
                />
              </Grid>
            </Grid>
            <TextField
              label="Изображения (ссылки через запятую)"
              value={editedProduct.images?.join(', ') || ''}
              onChange={(e) =>
                onEditChange(
                  'images',
                  e.target.value.split(',').map((s) => s.trim()).filter(Boolean)
                )
              }
              size="small"
              fullWidth
              margin="dense"
            />
            <Box className={styles.actions}>
              <Button
                variant="contained"
                size="small"
                startIcon={<SaveIcon />}
                onClick={onEditSave}
              >
                Сохранить
              </Button>
              <Button
                variant="outlined"
                size="small"
                startIcon={<CloseIcon />}
                onClick={onEditCancel}
              >
                Отмена
              </Button>
            </Box>
          </Box>
        ) : (
          <>
            <Typography variant="h6" className={styles.title}>
              {product.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" className={styles.description}>
              {product.description}
            </Typography>
            <Box className={styles.details}>
              <Typography variant="body1" className={styles.price}>
                {product.price.toLocaleString()} ₽
              </Typography>
              <Box className={styles.chips}>
                <Chip label={product.category} size="small" />
                <Chip label={product.brand} size="small" />
                <Chip label={`${product.power} BTU`} size="small" />
                <Chip
                  label={product.inStock ? 'В наличии' : 'Нет в наличии'}
                  color={product.inStock ? 'success' : 'default'}
                  size="small"
                />
              </Box>
            </Box>
          </>
        )}
        {isAdmin && !isEditing && (
          <Box className={styles.adminActions}>
            <IconButton onClick={onEditStart} size="small">
              <EditIcon fontSize="small" />
            </IconButton>
            {onDelete && (
              <IconButton onClick={() => onDelete(product.id)} size="small" color="error">
                <CloseIcon fontSize="small" />
              </IconButton>
            )}
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductCardView;